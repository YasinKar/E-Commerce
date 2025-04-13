from rest_framework import serializers

from orders.models import Cart, Order, UserAddress, OfferCode
from products.v1.serializers import ProductSerializer

class OfferCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfferCode
        fields = '__all__'

class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = ['id', 'receiver_first_name', 'receiver_last_name', 'receiver_phone', 'receiver_national_code', 'receiver_post_code', 'receiver_address', 'latitude', 'longitude']

class OrderSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'cart', 'product', 'color', 'size', 'count']

class CartSerializer(serializers.ModelSerializer):
    address = UserAddressSerializer(read_only=True)
    orders = OrderSerializer(many=True, read_only=True)
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True, source='get_total_amount')

    class Meta:
        model = Cart
        fields = [
            'id', 'user', 'address', 'status', 'offer_code', 'is_paid', 'paid', 'paid_date', 'orders', 'total_amount'
        ]