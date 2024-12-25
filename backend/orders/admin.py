from django.contrib import admin
from .models import (
    Order,
    Cart,
    OfferCode,
    UserAddress
)

class OrderBlockInline(admin.TabularInline):
    model = Order
    
@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'address', 'status', 'offer_code', 'is_paid', 'paid', 'paid_date')
    list_filter = ('user', 'address', 'status', 'offer_code', 'is_paid', 'paid', 'paid_date')
    search_fields = ('user', 'address', 'status', 'offer_code', 'is_paid', 'paid', 'paid_date')
    
    inlines = [OrderBlockInline]
    
@admin.register(OfferCode)
class OfferCodeAdmin(admin.ModelAdmin):
    list_display = ('code', 'discount_percentage', 'inventory', 'expiration_date')
    list_filter = ('code', 'discount_percentage', 'inventory', 'expiration_date')
    search_fields = ('code', 'discount_percentage', 'inventory', 'expiration_date')
    
@admin.register(UserAddress)
class UserAddressAdmin(admin.ModelAdmin):
    list_display = ('user', 'receiver_phone', 'receiver_national_code', 'receiver_post_code')
    list_filter = ('user', 'receiver_phone', 'receiver_national_code', 'receiver_post_code')
    search_fields = ('user', 'receiver_phone', 'receiver_national_code', 'receiver_post_code')