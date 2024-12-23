from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.crypto import get_random_string
from django.db.models import Count
from django.shortcuts import get_object_or_404
# from projects.models import Project
from .models import User, EmailChangeRequest
from .serializers import RegisterSerializer, EmailSerializer, ResetPasswordSerializer, UserSerializer
from .tasks import send_email_task
from contents.models import SiteSetting

########### Authentication ###########

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class ActivateAccountView(APIView):
    def get(self, request, auth_token):
        user = User.objects.filter(auth_token__iexact=auth_token).first()
        if user is not None:
            if not user.is_active:
                user.is_active = True
                user.auth_token = get_random_string(72)
                user.save()
                
                return Response({'message': 'Your account has been successfully activated.'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Your account is already active.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': 'Invalid authentication code.'}, status=status.HTTP_404_NOT_FOUND)
        
class ForgotPasswordAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = EmailSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.filter(email__iexact=email).first()
            if user is not None:
                
                # send email
                email_context ={
                    'user' : user,
                }
                
                send_email_task.delay(
                    subject='Password Recovery',
                    to= user.email,
                    context=email_context,
                    template_name='email/reset_pass.html'
                )
                
                return Response({'message': 'An email with a password reset link has been sent to you.', 'email': email}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'No account found with this email address.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ResetPasswordAPIView(APIView):
    def post(self, request, auth_token):
        user = User.objects.filter(auth_token=auth_token).first()
        
        if user is not None:
            reset_pass_form = ResetPasswordSerializer(data=request.data)
            if reset_pass_form.is_valid():
                user_new_pass = reset_pass_form.validated_data.get('password')
                user.set_password(user_new_pass)
                user.auth_token = get_random_string(72)
                user.is_active = True
                user.save()
            
                return Response({"message": "Your new password has been successfully set."}, status=status.HTTP_200_OK)
            
            return Response(reset_pass_form.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "Invalid authentication code."}, status=status.HTTP_404_NOT_FOUND)
        
########### Dashboard ###########

# class DashboardAPIView(APIView):
#     """View for users to see and edit their information, with email confirmation for changes."""
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         user = request.user
#         projects = Project.objects.filter(user=user)\
#             .prefetch_related('pages')\
#             .annotate(pages_count=Count('pages'))
#         data = UserSerializer(user, context={"projects": projects}).data
#         return Response(data, status=status.HTTP_200_OK)

#     def post(self, request):
#             user = request.user
#             serializer = UserSerializer(user, data=request.data, partial=True)

#             if serializer.is_valid():
#                 email = serializer.validated_data.get("email")
#                 if email and email != user.email:                    
#                     email_change_request = EmailChangeRequest.objects.create(
#                     user=self.request.user,
#                     new_email=email,
#                     )
#                     email_change_request.generate_token()
#                     email_context ={
#                         'email_change_request' : email_change_request,
#                     }
#                     email_change_request.send_confirmation_email(email_context)
                    
#                     del serializer.validated_data['email']
#                     serializer.save()
#                     return Response({"detail": "Confirmation email sent. Please confirm to change your email."}, status=status.HTTP_200_OK)
#                 serializer.save()
#                 return Response({"detail": "Profile updated successfully."}, status=status.HTTP_200_OK)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class ChangeEmailAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, token):
        email_change_request = get_object_or_404(EmailChangeRequest, token=token)

        if email_change_request.confirmed:
            return Response({"detail": "Email has already been confirmed."}, status=status.HTTP_200_OK)

        email_change_request.confirmed = True
        email_change_request.apply_email_change()
        email_change_request.save()
        
        return Response({"detail": "Email has been successfully updated!"}, status=status.HTTP_200_OK)