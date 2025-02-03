from rest_framework.generics import RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Cart, UserAddress, Order
from .serializers import CartSerializer
from products.models import Product
from django.shortcuts import get_object_or_404

### Cart ###

class CartView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CartSerializer

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user, is_paid=False)\
            .select_related('offer_code', 'address')\
            .prefetch_related('orders', 'orders__product', 'orders__size', 'orders__color')

    def get(self, request, *args, **kwargs):
        user_cart = self.get_queryset().first()

        if not user_cart:
            user_cart = Cart.objects.create(user=request.user, is_paid=False)

        serializer = self.get_serializer(user_cart)
        return Response(serializer.data)

class AddOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = request.data.get('product_id')
        count = request.data.get('count')

        if not product_id or not count:
            return Response({'message': 'Not found product_id & count'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product_id = int(product_id)
            count = int(count)
        except (TypeError, ValueError):
            return Response({'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

        product = get_object_or_404(Product, is_active=True, id=product_id)

        if count <= 0:
            return Response({'message': 'Invalid quantity'}, status=status.HTTP_400_BAD_REQUEST)

        current_cart, _ = Cart.objects.get_or_create(is_paid=False, user=request.user)
        current_order, order_created = Order.objects.get_or_create(cart=current_cart, product=product)

        new_count = current_order.count + count
        if new_count > product.inventory:
            return Response({'message': 'You have added more to your basket than allowed'}, status=status.HTTP_400_BAD_REQUEST)

        current_order.count = new_count
        current_order.save()

        return Response({'message': 'Order added to your cart successfully'}, status=status.HTTP_200_OK)

class RemoveOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        order_id = request.data.get('order_id')

        if not order_id:
            return Response({'message': 'Not found order_id'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            order_id = int(order_id)
        except (TypeError, ValueError):
            return Response({'message': 'Invalid order_id'}, status=status.HTTP_400_BAD_REQUEST)

        current_cart = Cart.objects.filter(is_paid=False, user=request.user).first()
        if not current_cart:
            return Response({'message': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)

        current_order = Order.objects.filter(cart=current_cart, id=order_id).first()
        if not current_order:
            return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

        current_order.delete()
        return Response({'message': 'Order removed successfully'}, status=status.HTTP_200_OK)

class ChangeOrderCountView(APIView):
    def post(self, request):
        state = request.data.get('state')
        order_id = request.data.get('order_id')
        
        if not state or not order_id:
            return Response({'message': 'Not found order_id & state'}, status=status.HTTP_400_BAD_REQUEST)
        
        current_cart = Cart.objects.filter(is_paid=False, user=request.user).first()
        if not current_cart:
            return Response({'message': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)

        current_order = Order.objects.filter(cart=current_cart, id=order_id).first()
        if not current_order:
            return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if state == 'increase':
            if current_order.count < current_order.product.inventory:
                current_order.count += 1
                current_order.save()
                return Response({'message': 'Order count increased successfully.'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'You have added more to your basket than allowed'}, status=status.HTTP_400_BAD_REQUEST)
        elif state == 'decrease':
            if current_order.count == 1:
                current_order.delete()
                return Response({'message': 'Order removed from your cart.'}, status=status.HTTP_200_OK)
            else:
                current_order.count -= 1
                current_order.save()
                return Response({'message': 'Order count decreased successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid state'}, status=status.HTTP_400_BAD_REQUEST)

class AddressSelectionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        pk = self.kwargs.get("pk")
        
        current_cart, created = Cart.objects.get_or_create(is_paid=False, user=request.user)
            
        try:
            user_address = UserAddress.objects.get(id=pk, user=request.user)
        except UserAddress.DoesNotExist:
            return Response({'message': 'Address not found.'}, status=status.HTTP_404_NOT_FOUND)

        current_cart.address = user_address
        current_cart.save()

        return Response({'message': 'Address successfully assigned to the cart.'}, status=status.HTTP_200_OK)