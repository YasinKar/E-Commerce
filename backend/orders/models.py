from django.db import models
from django.db.models import Case, When, F, DecimalField, Sum
from django.core.validators import MaxValueValidator, MinValueValidator
from django.core.exceptions import ValidationError
import re
from django.utils import timezone
from users.models import User
from products.models import Product, ProductColor, ProductSize

class OfferCode(models.Model):
    code = models.CharField(max_length=150, verbose_name='Code')
    discount_percentage = models.IntegerField(        
        verbose_name='Discount percentage',
        validators=[
            MaxValueValidator(100),
            MinValueValidator(1)
    ])
    inventory = models.IntegerField(
        verbose_name='inventory',
        default=10,
        validators=[
            MinValueValidator(1)
        ]
    )
    expiration_date = models.DateTimeField(verbose_name='Expiration Date')

    def is_valid(self):
        if self.inventory is not None and self.inventory <= 0:
            return False
        if self.expiration_date and self.expiration_date < timezone.now():
            return False
        return True

    class Meta:
        verbose_name = 'Offer Code'
        verbose_name_plural = 'Offer Codes'
    
    def __str__(self):
        return self.code

class UserAddress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name= 'User', related_name='addresses')
    receiver_first_name = models.CharField(max_length=200, verbose_name='Receiver first name')
    receiver_last_name = models.CharField(max_length=200, verbose_name='Receiver last name')
    receiver_phone = models.CharField(max_length=15, verbose_name='Receiver phone')
    receiver_national_code = models.CharField(max_length=10, verbose_name='Receiver National code')
    receiver_post_code = models.CharField(max_length=10, verbose_name='Receiver Post code')
    receiver_address = models.TextField(verbose_name='Receiver address')
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    
    def __str__(self):
        return f'{self.receiver_first_name} {self.receiver_last_name}'
    
    def clean(self):
        phone_regex = re.compile(r'^(?:\+98|0098|98|0)?9\d{9}$')
        if self.receiver_phone and not re.match(phone_regex, self.receiver_phone):
            raise ValidationError({'receiver_phone': 'receiver phone is not valid.'})
        
    class Meta:
        verbose_name = 'User Address'
        verbose_name_plural = 'Users Addresses'
    
class Cart(models.Model):
    STATUS_CHOICES = (
        ('processing', 'Processing'),               
        ('out_for_delivery', 'Out for Delivery'),
        ('delivered', 'Delivered'),
        ('pending_payment', 'Pending Payment'),
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name= 'User', related_name='carts')
    address = models.ForeignKey(UserAddress, null=True, blank=True, on_delete=models.SET_NULL, verbose_name='Receiver address')
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, verbose_name='Status', default='pending_payment')
    offer_code = models.ForeignKey(OfferCode, null=True, blank=True, on_delete=models.SET_NULL, verbose_name='Offer Code')
    is_paid = models.BooleanField(default=False, verbose_name = 'Is paid')
    paid = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, verbose_name='Paid')
    paid_date = models.DateField(null=True, blank=True, verbose_name='Paid date')
    
    def __str__(self):
        return f'User : {self.user} Status: {self.status}'      
    
    def get_total_amount(self):
        total_amount = Order.objects.filter(cart=self).annotate(
            order_price=Case(
                When(product__is_active=True, then=F('product__price') * F('count')),
                default=F('product__price') * F('count'),
                output_field=DecimalField()
            )
        ).aggregate(total_amount=Sum('order_price'))['total_amount'] or 0

        category_discounts = self.get_category_discounts()

        if self.offer_code and self.offer_code.is_valid():
            discount_amount = (total_amount * self.offer_code.discount_percentage) / 100
            total_amount -= discount_amount

        if category_discounts:
            discount_amount = (total_amount * category_discounts) / 100
            total_amount -= discount_amount

        return total_amount

    def get_category_discounts(self):
        category_discounts = []
        for order in Order.objects.filter(cart=self):
            active_discount = order.product.category.discounts.filter(
                is_active=True,
                start_date__lte=timezone.now(),
                end_date__gte=timezone.now()
            ).first()
            if active_discount:
                category_discounts.append(active_discount.discount_percentage)

        if category_discounts:
            return max(category_discounts)
        return 0

    class Meta:
        verbose_name = 'Cart'
        verbose_name_plural = 'Carts'
 
class ProcessingOrder(Cart):
    class Meta:
        proxy = True
        verbose_name = 'Processing Order'
        verbose_name_plural = 'Processing Orders'

class OutForDeliveryOrder(Cart):
    class Meta:
        proxy = True
        verbose_name = 'Out For Delivery Order'
        verbose_name_plural = 'Out For Delivery Orders'
        
class DeliveredOrder(Cart):
    class Meta:
        proxy = True
        verbose_name = 'Delivered Order'
        verbose_name_plural = 'Delivered Orders'
        
class PendingPaymentOrder(Cart):
    class Meta:
        proxy = True
        verbose_name = 'Pending Payment Order'
        verbose_name_plural = 'Pending Payment Orders'
       
class Order(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, verbose_name = 'Cart', related_name='orders')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name = 'Product')
    color = models.ForeignKey(ProductColor, on_delete=models.CASCADE, null=True, blank=True, verbose_name='Color')
    size = models.ForeignKey(ProductSize, on_delete=models.CASCADE, null=True, blank=True, verbose_name='Size')
    count = models.IntegerField(default=0, verbose_name= 'Count')
    
    def clean(self):
        if self.color and self.color not in self.product.colors.all():
            raise ValidationError({'color': 'Selected color is not available for this product.'})
        
        if self.size and self.size not in self.product.sizes.all():
            raise ValidationError({'size': 'Selected size is not available for this product.'})

        if self.count > self.product.inventory:
            raise ValidationError({'count': 'Not enough stock for the selected product.'})
    
    def __str__(self):
        return f'Product : {self.product} Count : {self.count} Cart : {self.cart}'