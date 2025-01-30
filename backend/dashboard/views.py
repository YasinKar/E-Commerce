from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from orders.models import UserAddress, Cart
from orders.serializers import UserAddressSerializer, CartSerializer
from users.models import EmailChangeRequest
from users.serializers import UserSerializer

#### Dashboard ####

class DashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user_orders = Cart.objects.filter(user=user, is_paid=True)\
            .select_related('offer_code', 'address')\
                .prefetch_related('orders', 'orders__product', 'orders__size', 'orders__color')
        user_addresses = UserAddress.objects.filter(user=user)
                
        data = {
            "user" : UserSerializer(user).data,
            "user_orders" : CartSerializer(user_orders, many=True).data,
            "user_addresses" : UserAddressSerializer(user_addresses, many=True).data
        }
        
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
            user = request.user
            serializer = UserSerializer(user, data=request.data, partial=True)

            if serializer.is_valid():
                email = serializer.validated_data.get("email")
                if email and email != user.email:                    
                    email_change_request = EmailChangeRequest.objects.create(
                    user=user,
                    new_email=email,
                    )
                    email_change_request.generate_token()
                    email_context ={
                        'email_change_request' : email_change_request,
                    }
                    email_change_request.send_confirmation_email(email_context)
                    
                    del serializer.validated_data['email'] # save other changes but email
                    serializer.save()
                    return Response({"detail": "Confirmation email sent. Please confirm to change your email."}, status=status.HTTP_200_OK)
                serializer.save()
                return Response({"detail": "Profile updated successfully."}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateAddressView(CreateAPIView):
    queryset = UserAddress.objects.all()
    serializer_class = UserAddressSerializer
    permission_classes = [IsAuthenticated]
   
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
class AddressDetailView(RetrieveUpdateDestroyAPIView):
    queryset = UserAddress.objects.all()
    serializer_class = UserAddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserAddress.objects.filter(user=self.request.user)   
     
class ChangeEmailAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, token):
        email_change_request = EmailChangeRequest.objects.filter(token=token)
        if not email_change_request:
            Response({"error": "The EmailChangeRequest was not found"}, status=status.HTTP_404_NOT_FOUND)

        if email_change_request.confirmed:
            return Response({"detail": "Email has already been confirmed."}, status=status.HTTP_200_OK)

        email_change_request.confirmed = True
        email_change_request.apply_email_change()
        email_change_request.save()
        
        return Response({"detail": "Email has been successfully updated!"}, status=status.HTTP_200_OK)