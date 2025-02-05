from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Prefetch
from .models import (
    Category,
    Product,
    Brand,
    ProductComment,
    ProductColor,
    ProductSize
)
from .serializers import (
    ProductSerializer,
    CategorySerializer,
    BrandSerializer,
    SimpleProductSerializer,
    ProductColorSerializer,
    ProductSizeSerializer,
)
from .filters import ProductFilter
from django.utils import timezone

### Product ###

class ProductListPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 50
    
class ProductListView(ListAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = SimpleProductSerializer
    permission_classes = [AllowAny]
    pagination_class = ProductListPagination   
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter

class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.select_related('category', 'brand')\
        .prefetch_related(
            'tags', 'colors', 'sizes',
            'images',
            'information',
            Prefetch(
                'comments',
                queryset=ProductComment.objects.filter(is_active=True).select_related('user').prefetch_related(
                    Prefetch(
                        'replies',
                        queryset=ProductComment.objects.filter(is_active=True).select_related('user')
                    )
                )
            )
        ).filter(is_active=True)
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    
    lookup_field = 'slug' 
    
### Category ###
    
class CategoryListView(ListAPIView):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]    
    
### Brand ###

class BrandListView(ListAPIView):
    queryset = Brand.objects.filter(is_active=True)
    serializer_class = BrandSerializer
    permission_classes = [AllowAny]     
    
### ProductColor ###

class ProductColorListView(ListAPIView):
    queryset = ProductColor.objects.all()
    serializer_class = ProductColorSerializer
    permission_classes = [AllowAny]        
    
### ProductSize ###

class ProductSizeListView(ListAPIView):
    queryset = ProductSize.objects.all()
    serializer_class = ProductSizeSerializer
    permission_classes = [AllowAny]     

### Search ###

class SearchApiView(ListAPIView):
    serializer_class = SimpleProductSerializer
    pagination_class = ProductListPagination

    def get_queryset(self):
        searched = self.request.query_params.get('value', '').strip()
        if not searched:
            return Product.objects.none()

        return Product.objects.filter(
            Q(name__icontains=searched) |
            Q(tags__tag__icontains=searched) |
            Q(category__name__icontains=searched) |
            Q(brand__name__icontains=searched)
        ).distinct()

    def list(self, request, *args, **kwargs):
        if not request.query_params.get('value', '').strip():
            return Response({"error": "Search value is required"}, status=status.HTTP_400_BAD_REQUEST)
        return super().list(request, *args, **kwargs)