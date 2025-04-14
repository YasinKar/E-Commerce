from rest_framework import status
from rest_framework.generics import CreateAPIView, GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from django.utils.crypto import get_random_string
from django.utils.decorators import method_decorator

from django_ratelimit.decorators import ratelimit
from django_ratelimit.core import is_ratelimited

from users.models import User, OTP
from .serializers import (
    RegisterSerializer,
    EmailSerializer,
    ResetPasswordSerializer,
    OTPVerifySerializer
)
from users.tasks import send_otp_email, send_confirmation_email, send_welcome_email

#### Authentication ####

class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
        
class ForgotPasswordAPIView(GenericAPIView):
    serializer_class = EmailSerializer
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        user = User.objects.filter(email__iexact=email).first()
        if user is not None:
            
            send_confirmation_email.delay(
                subject='Password Recovery',
                to= user.email,
                context={'email' : user.email, 'auth_token' : user.auth_token},
                template_name='email/reset_password.html'
            )
            return Response({'message': 'An email with a password reset link has been sent to you.', 'email': email}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'No account found with this email address.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ResetPasswordAPIView(GenericAPIView):    
    serializer_class = ResetPasswordSerializer
    permission_classes = [AllowAny]
    
    def post(self, request, auth_token):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = User.objects.filter(auth_token=auth_token).first()
        
        if user is not None:
            user_new_pass = serializer.validated_data.get('password')
            user.set_password(user_new_pass)
            user.auth_token = get_random_string(72)
            user.is_active = True
            user.save()
            
            return Response({"message": "Your new password has been successfully set."}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid authentication code."}, status=status.HTTP_404_NOT_FOUND)
        
class OTPRequestView(GenericAPIView):
    serializer_class = EmailSerializer
    permission_classes = [AllowAny]
    
    def post(self, request):
        was_limited = is_ratelimited(
                request=request,
                group='otp-request',
                key='ip',
                rate='1/m',
                method='POST',
                increment=True
            )
        if was_limited:
            return Response({
                'message': 'You can only request a new OTP once every minute. Please wait before trying again.'
            }, status=status.HTTP_429_TOO_MANY_REQUESTS)
            
            
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
            
        try:
            email = serializer.validated_data['email']

            User.objects.get(email=email)
    
        except User.DoesNotExist:
            return Response({
                'message': 'User with this email does not exist.',
            }, status=status.HTTP_404_NOT_FOUND)
        
        otp = OTP.objects.create(email=email)
        
        send_otp_email.delay(
            subject='Verify Code',
            to=email,
            context={'email' : otp.email},
            template_name='email/otp.html'
        )
        
        return Response({
            'message': 'OTP code has been sent.',
            'email': email
        }, status=status.HTTP_200_OK)
         
class OTPVerifyView(GenericAPIView):
    serializer_class = OTPVerifySerializer
    permission_classes = [AllowAny]
    
    @method_decorator(ratelimit(key='ip', rate='3/m', method='POST', block=True))
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.validated_data['email']
        code = serializer.validated_data['code']
        
        try:
            otp = OTP.objects.filter(email=email, code=code).latest('created_at')
            
            if not otp.is_valid() or otp.is_used == True:
                return Response({
                    'message' : 'OTP code has expired.',
                }, status=status.HTTP_400_BAD_REQUEST)
                
        except OTP.DoesNotExist:
            return Response({
                'message' : 'Invalid OTP code.',
                }, status=status.HTTP_400_BAD_REQUEST)
            
        otp.is_used = True
        
        otp.save()
            
        OTP.objects.filter(email=email, is_used=False).delete()
        
        user = User.objects.get(email=email)
        
        user.is_active = True
        user.save()
        
        send_welcome_email.delay(
            subject='Welcome',
            to=email,
            context={'email' : otp.email},
            template_name='email/welcome.html'
        )
        
        return Response({
            'message': 'Email has been successfully verified.',
            'email': email
        }, status=status.HTTP_200_OK)