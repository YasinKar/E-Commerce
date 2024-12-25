from rest_framework.generics import RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Cart, UserAddress
from .serializers import CartSerializer

### Cart ###

class CartView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CartSerializer

    def get_queryset(self):
        user_cart = Cart.objects.filter(user=self.request.user, is_paid=False)\
            .select_related('off_code', 'address')\
                .prefetch_related('orders', 'orders__product', 'orders__size', 'orders__color').first()
        if not user_cart:
            user_cart = Cart.objects.create(user=self.request.user, is_paid=False)

        response_data = CartSerializer(user_cart).data

        return Response(response_data)

class AddressSelectionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, pk, request, *args, **kwargs):
        user_cart = Cart.objects.filter(user=request.user, is_paid=False).values_list('id', flat=True).first()
        if not user_cart:
            user_cart = Cart.objects.create(user=request.user, is_paid=False)
            
        try:
            user_address = UserAddress.objects.get(id=pk, user=request.user)
        except UserAddress.DoesNotExist:
            return Response({'detail': 'Address not found.'}, status=status.HTTP_404_NOT_FOUND)

        user_cart.address = user_address
        user_cart.save()

        return Response({'detail': 'Address successfully assigned to the cart.'}, status=status.HTTP_200_OK)