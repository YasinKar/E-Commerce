from rest_framework import serializers
from .models import Cart, Order, UserAddress, OfferCode

class OfferCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfferCode
        fields = '__all__'

class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    color_name = serializers.CharField(source='color.name', read_only=True, allow_null=True)
    size_name = serializers.CharField(source='size.name', read_only=True, allow_null=True)

    class Meta:
        model = Order
        fields = ['id', 'cart', 'product', 'product_name', 'color', 'color_name', 'size', 'size_name', 'count']

class CartSerializer(serializers.ModelSerializer):
    address = UserAddressSerializer(read_only=True)
    orders = OrderSerializer(many=True, read_only=True)
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True, source='get_total_amount')

    class Meta:
        model = Cart
        fields = [
            'id', 'user', 'address', 'status', 'offer_code', 'is_paid', 'paid', 'paid_date', 'orders', 'total_amount'
        ]