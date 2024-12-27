from rest_framework import serializers
from .models import Category, ProductTag, Brand, Product, ProductImage, ProductInformation, ProductComment, Discount

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductTag
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

class ProductInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductInformation
        fields = ['id', 'key', 'value']

class ProductCommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    replies = serializers.SerializerMethodField()

    class Meta:
        model = ProductComment
        fields = ['id', 'title', 'message', 'reply', 'replies', 'user', 'recommend', 'date', 'likes', 'dislikes', 'is_active']

    def get_replies(self, obj):
        replies = obj.replies.filter(is_active=True)
        return ProductCommentSerializer(replies, many=True).data

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    brand = BrandSerializer()
    tags = ProductTagSerializer(many=True)
    images = ProductImageSerializer(many=True, read_only=True, source='images')
    information = ProductInformationSerializer(many=True, read_only=True, source='information')
    comments = ProductCommentSerializer(many=True, read_only=True, source='comments')

    discounted_price = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'price', 'discounted_price', 'image', 'description', 
            'category', 'brand', 'tags', 'gender', 'slug', 'stars', 
            'inventory', 'is_active', 'images', 'information', 'comments'
        ]

    def get_discounted_price(self, obj):
        return obj.get_discounted_price()

class DiscountSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Discount
        fields = ['id', 'category', 'discount_percentage', 'start_date', 'end_date', 'is_active']