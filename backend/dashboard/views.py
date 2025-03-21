from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, DestroyAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Message
from .serializers import MessageSerializer
from orders.models import UserAddress, Cart
from orders.serializers import UserAddressSerializer, CartSerializer
from users.models import EmailChangeRequest
from users.serializers import UserSerializer
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import NotFound

#### Dashboard ####

class UserAccountAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
 
        data = {
            "user" : UserSerializer(user).data,
        }
        
        return Response(data, status=status.HTTP_200_OK)

    def put(self, request):
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
                    # email_change_request.send_confirmation_email(email_context)
                    
                    del serializer.validated_data['email'] # save other changes but email
                    serializer.save()
                    return Response({"message": "Confirmation email sent. Please confirm to change your email."}, status=status.HTTP_200_OK)
                serializer.save()
                return Response({"message": "Profile updated successfully."}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserMessageListView(ListAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]    

    def get_queryset(self):
        messages = Message.objects.filter(user=self.request.user)
        return messages
    
class DeleteUserMessagesView(DestroyAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]    

    def get_queryset(self):
        return Message.objects.filter(user=self.request.user)
    
    def delete(self, request, *args, **kwargs):
        user_messages = self.get_queryset()
        deleted_count, _ = user_messages.delete()

        return Response(
            {"message": f"{deleted_count} message deleted."},
            status=status.HTTP_204_NO_CONTENT
        )
        
class UserOrderListPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 20

class UserOrderListView(ListAPIView):
    serializer_class = CartSerializer
    pagination_class = UserOrderListPagination
    permission_classes = [IsAuthenticated]    
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status']

    def get_queryset(self):
        user_orders = Cart.objects.filter(user=self.request.user)\
            .select_related('offer_code', 'address')\
                .prefetch_related('orders', 'orders__product', 'orders__size', 'orders__color')
        return user_orders
    
class UserAddressListView(ListAPIView):
    serializer_class = UserAddressSerializer
    permission_classes = [IsAuthenticated]    

    def get_queryset(self):
        user_addresses = UserAddress.objects.filter(user=self.request.user)
        return user_addresses

class CreateAddressView(CreateAPIView):
    queryset = UserAddress.objects.all()
    serializer_class = UserAddressSerializer
    permission_classes = [IsAuthenticated]
   
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
class AddressDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserAddressSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return UserAddress.objects.filter(user=self.request.user)

    def get_object(self):
        obj = get_object_or_404(UserAddress, id=self.kwargs["pk"], user=self.request.user)
        return obj
     
class ChangeEmailAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, token):
        email_change_request = EmailChangeRequest.objects.filter(token=token)
        if not email_change_request:
            Response({"error": "The EmailChangeRequest was not found"}, status=status.HTTP_404_NOT_FOUND)

        if email_change_request.confirmed:
            return Response({"message": "Email has already been confirmed."}, status=status.HTTP_200_OK)

        email_change_request.confirmed = True
        email_change_request.apply_email_change()
        email_change_request.save()
        
        return Response({"message": "Email has been successfully updated!"}, status=status.HTTP_200_OK)