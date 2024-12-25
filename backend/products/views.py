from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from django.utils import timezone
from .models import Category, Product, Brand, Discount
from .serializers import ProductSerializer, CategorySerializer, BrandSerializer
from .filters import ProductFilter

### Product ###

class ProductListPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 50
    
class ProductListView(ListAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    pagination_class = ProductListPagination   
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter

class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.filter(is_active=True)
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
    
### Special sale ###
    
class SpecialSaleListView(ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    pagination_class = ProductListPagination
    
    def get_queryset(self):
        active_discounts = Discount.objects.filter(
            is_active=True,
            start_date__lte=timezone.now(),
            end_date__gte=timezone.now()
        ).values_list('category', flat=True)

        return Product.objects.filter(
            category__in=active_discounts,
            is_active=True
        )

### Search ###

class SearchApiView(APIView):
    def post(self, request):
        searched = request.data.get('search_value')
        if searched:
            results = Product.objects.filter(
                Q(name__icontains=searched) |
                Q(tags__tag__icontains=searched) |
                Q(category__name__icontains=searched) |
                Q(brand__name__icontains=searched)
            ).distinct()
            serializer = ProductSerializer(results, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"error": "Search value is required"}, status=status.HTTP_400_BAD_REQUEST)