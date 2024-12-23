from django.contrib import admin
from .models import (
    Brand,
    Category,
    Discount,
    Product,
    ProductComment,
    ProductImage,
    ProductInformation
)

### Product ###

class ProductImageBlockInline(admin.TabularInline):
    model = ProductImage
    extra = 3
    
class ProductInformationBlockInline(admin.TabularInline):
    model = ProductInformation
    extra = 3

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category', 'brand', 'gender', 'stars', 'inventory', 'is_active')
    list_filter = ('name', 'price', 'category', 'brand', 'gender', 'stars', 'inventory', 'is_active', 'tags')
    search_fields = ('name', 'price', 'category', 'brand', 'gender', 'stars', 'inventory', 'is_active', 'tags')
    list_editable = ('is_active', 'stars')
    exclude = ('slug', )
    
    inlines = [ProductImageBlockInline, ProductInformationBlockInline]
    
### Category ###    

class DiscountBlockInline(admin.TabularInline):
    model = Discount
    extra = 1

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent', 'is_active')
    list_filter = ('name', 'parent', 'is_active')
    search_fields = ('name', 'parent', 'is_active')
    list_editable = ('is_active', )
    exclude = ('slug', )
    
    inlines = [DiscountBlockInline]

### Brand ###    

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active')
    list_filter = ('name', 'is_active')
    search_fields = ('name', 'is_active')
    list_editable = ('is_active', )
    exclude = ('slug', )
    
### ProductComment ###    

@admin.register(ProductComment)
class ProductCommentAdmin(admin.ModelAdmin):
    list_display = ('title', 'reply', 'product', 'user', 'date', 'likes', 'dislikes', 'is_active')
    list_filter = ('title', 'reply', 'product', 'user', 'date', 'likes', 'dislikes', 'is_active')
    search_fields = ('title', 'reply', 'product', 'user', 'date', 'likes', 'dislikes', 'is_active')
    list_editable = ('is_active', )