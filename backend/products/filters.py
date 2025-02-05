import django_filters
from .models import Product

class ProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr="gte")
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr="lte")
    on_sale = django_filters.BooleanFilter(method="filter_on_sale", label="On Sale")
    category = django_filters.CharFilter(field_name="category__slug", lookup_expr="iexact")
    brand = django_filters.CharFilter(field_name="brand__slug", lookup_expr="iexact")
    gender = django_filters.ChoiceFilter(field_name="gender", choices=Product.GENDER_CHOICES)
    color = django_filters.CharFilter(field_name="colors__color_name", lookup_expr="icontains", label="Color")
    size = django_filters.CharFilter(field_name="sizes__size", lookup_expr="icontains", label="Size")

    class Meta:
        model = Product
        fields = ["min_price", "max_price", "on_sale", "category", "brand", "gender", "color", "size"]