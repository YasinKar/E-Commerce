import django_filters
from .models import Product
from django.utils import timezone

class ProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr="gte")
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr="lte")
    on_sale = django_filters.BooleanFilter(method="filter_on_sale", label="On Sale")
    category = django_filters.CharFilter(field_name="category__slug", lookup_expr="iexact")
    brand = django_filters.CharFilter(field_name="brand__slug", lookup_expr="iexact")
    gender = django_filters.ChoiceFilter(field_name="gender", choices=Product.GENDER_CHOICES)

    class Meta:
        model = Product
        fields = ["min_price", "max_price", "on_sale", "category", "brand", "gender"]

    def filter_on_sale(self, queryset, name, value):
        if value:
            return queryset.filter(
                category__discounts__is_active=True,
                category__discounts__start_date__lte=timezone.now(),
                category__discounts__end_date__gte=timezone.now(),
            ).distinct()
        return queryset
