from django.contrib import admin
from .models import (
    Brand,
    Category,
    Discount,
    Product,
    ProductComment,
    ProductImage,
    ProductInformation,
    ProductTag,
    ProductColor,
    ProductSize
)

### Product ###

class ProductImageBlockInline(admin.TabularInline):
    model = ProductImage
    extra = 3
    
class ProductInformationBlockInline(admin.TabularInline):
    model = ProductInformation
    extra = 3
    
@admin.register(ProductTag)
class ProductTagAdmin(admin.ModelAdmin):
    list_display = ('tag', )
    list_filter = ('tag', )
    search_fields = ('tag', )
    
@admin.register(ProductColor)
class ProductColorAdmin(admin.ModelAdmin):
    list_display = ('color_name', 'color_code')
    list_filter = ('color_name', 'color_code')
    search_fields = ('color_name', 'color_code')

@admin.register(ProductSize)
class ProductSizeAdmin(admin.ModelAdmin):
    list_display = ('size', )
    list_filter = ('size', )
    search_fields = ('size', )
    
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category', 'brand', 'gender', 'stars', 'inventory', 'is_active')
    list_filter = ('name', 'price', 'category', 'brand', 'gender', 'stars', 'inventory', 'is_active', 'tags', 'colors', 'sizes')
    search_fields = ('name', 'price', 'category', 'brand', 'gender', 'stars', 'inventory', 'is_active', 'tags', 'colors', 'sizes')
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