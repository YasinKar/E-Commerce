from rest_framework import serializers
from products.models import (
    Category,
    ProductTag,
    Brand,
    Product,
    ProductImage,
    ProductInformation,
    ProductComment,
    Discount,
    ProductColor,
    ProductSize
)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'parent', 'image']

class ProductTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductTag
        fields = '__all__'
        
class ProductColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductColor
        fields = '__all__'

class ProductSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSize
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name', 'logo', 'slug']

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

class ProductInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductInformation
        fields = ['id', 'key', 'value']

class ProductCommentReplySerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = ProductComment
        fields = ['id', 'title', 'message', 'user', 'recommend', 'date', 'likes', 'dislikes']

class ProductCommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    replies = ProductCommentReplySerializer(many=True)

    class Meta:
        model = ProductComment
        fields = ['id', 'title', 'message', 'user', 'replies', 'recommend', 'date', 'likes', 'dislikes']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    brand = BrandSerializer()
    tags = ProductTagSerializer(many=True)
    colors = ProductColorSerializer(many=True)
    sizes = ProductSizeSerializer(many=True)
    images = ProductImageSerializer(many=True, read_only=True)
    information = ProductInformationSerializer(many=True, read_only=True)
    comments = ProductCommentSerializer(many=True, read_only=True)

    discounted_price = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'price', 'image', 'description', 'discounted_price',
            'category', 'brand', 'tags', 'gender', 'slug', 'stars', 
            'inventory', 'images', 'information', 'comments', 'sizes', 'colors'
        ]

    def get_discounted_price(self, obj):
        return obj.get_discounted_price()

class SimpleProductSerializer(serializers.ModelSerializer):
    discounted_price = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'price', 'image', 'slug', 'stars', 'discounted_price'
        ]
        
    def get_discounted_price(self, obj):
        return obj.get_discounted_price()

class DiscountSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Discount
        fields = ['id', 'category', 'discount_percentage', 'start_date', 'end_date']