from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.core.exceptions import ValidationError
from users.models import User
from django.utils import timezone
from colorfield.fields import ColorField

class Category(models.Model):
    name = models.CharField(max_length=200, verbose_name='Category')
    slug = models.SlugField(unique=True, verbose_name='Slug')
    parent = models.ForeignKey('self', on_delete=models.CASCADE, related_name='children', null=True, blank=True, verbose_name='Parent')
    image = models.ImageField(upload_to='categories', verbose_name='Image')
    is_active = models.BooleanField(verbose_name='Active', default=True)
    
    def clean(self):
        if self.parent and self.parent.parent:
            raise ValidationError('A category cannot have more than one level of subcategory.')
        
        if self.parent is None and not self.image:
            raise ValidationError('Uploading an image is mandatory for main categories.')
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.pk:
            super().save(*args, **kwargs)
        self.slug = f"{self.name.replace(' ', '-')}_{self.pk}"
        super().save(*args, **kwargs)
    
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        
class ProductTag(models.Model):
    tag = models.CharField(max_length=200, verbose_name='Tag')
    
    class Meta:
        verbose_name = 'Tag'
        verbose_name_plural = 'Tags'
        
    def __str__(self):
        return self.tag

class Brand(models.Model):
    name = models.CharField(max_length=200, verbose_name='Name')
    logo = models.ImageField(upload_to='brands', verbose_name='Logo')
    slug = models.SlugField(unique=True, verbose_name='Slug')
    is_active = models.BooleanField(verbose_name='Active', default=True)
    
    def save(self, *args, **kwargs):
        if not self.pk:
            super().save(*args, **kwargs)
        self.slug = f"{self.name.replace(' ', '-')}_{self.pk}"
        super().save(*args, **kwargs)
        
    class Meta:
        verbose_name = 'Brand'
        verbose_name_plural = 'Brands'
        
    def __str__(self):
        return self.name 

class ProductColor(models.Model):
    color_name = models.CharField(max_length=100, verbose_name='Color name', unique=True)
    color_code = ColorField(format="hexa", default='#fff', verbose_name='Color code')
    
    def __str__(self):
        return self.color_name

    class Meta:
        verbose_name = 'Product Color'
        verbose_name_plural = 'Products Colors'
        
class ProductSize(models.Model):
    size = models.CharField(max_length=100, verbose_name='Size', unique=True)
    
    def __str__(self):
        return self.size

    class Meta:
        verbose_name = 'Product Size'
        verbose_name_plural = 'Products Sizes'

class Product(models.Model):
    GENDER_CHOICES = (
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('None', 'None')
    )
    
    name = models.CharField(max_length=300, verbose_name='Name')
    price = models.IntegerField(verbose_name='Price', validators=[MaxValueValidator(10000000),MinValueValidator(0)])
    image = models.ImageField(upload_to='products', verbose_name='Image')
    description = models.TextField(max_length=800, verbose_name='Description')  
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null = True, blank=True, verbose_name='Category')
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, null = True, blank=True, verbose_name='Brand')
    tags = models.ManyToManyField(ProductTag, blank=True, verbose_name='Tags')
    gender = models.CharField(max_length=100, choices=GENDER_CHOICES ,verbose_name='Gender', default='None')
    colors = models.ManyToManyField(ProductColor, blank=True, verbose_name='Product colors')
    sizes = models.ManyToManyField(ProductSize, blank=True, verbose_name='Product sizes')
    slug = models.SlugField(unique=True, verbose_name='Slug')
    stars = models.IntegerField(
        default=1,
        verbose_name='Stars',
        validators=[
            MaxValueValidator(5),
            MinValueValidator(1)
        ]
    )
    inventory = models.IntegerField(
        default=1,
        verbose_name='Inventory',
        validators=[
            MaxValueValidator(10000),
            MinValueValidator(1)
        ]
    )
    is_active = models.BooleanField(verbose_name='Active', default=True)
    
    def save(self, *args, **kwargs):
        if not self.pk:
            super().save(*args, **kwargs)
        self.slug = f"{self.name.replace(' ', '-')}_{self.pk}"
        super().save(*args, **kwargs)
        
    def get_discounted_price(self):
        active_discount = self.category.discounts.filter(is_active=True, start_date__lte=timezone.now(), end_date__gte=timezone.now()).first()
        if active_discount:
            return self.price - (self.price * active_discount.discount_percentage / 100)
        return self.price
    
    def __str__(self):
        return self.name 
    
    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
        
class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='Product', related_name='images')
    image = models.ImageField(upload_to='products-gallery', verbose_name='Image')
    
    def __str__(self):
        return str(self.image)
    
    class Meta:
        verbose_name = 'Product Image'
        verbose_name_plural = 'Products Images'
        
class ProductInformation(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='Product', related_name='information')
    key = models.CharField(max_length=100, verbose_name='Key')
    value = models.CharField(max_length=100, verbose_name='Value')
    
    def __str__(self):
        return f'{self.key} : {self.value}'
    
    class Meta:
        verbose_name = 'Product Information'
        verbose_name_plural = 'Products Informations'
        
class ProductComment(models.Model):
    title = models.CharField(max_length=200, verbose_name='Title')
    message = models.TextField(verbose_name='Message')
    reply = models.ForeignKey(
    'self',
    on_delete=models.CASCADE,
    null=True,
    blank=True,
    verbose_name='Reply',
    related_name='replies'
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='Product', related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='User')
    recommend = models.BooleanField(default=True, verbose_name='Recommend')
    date = models.DateTimeField(auto_now_add=True, verbose_name='Date')
    likes = models.IntegerField(default=0, validators=[MinValueValidator(0)], verbose_name='Likes')
    dislikes = models.IntegerField(default=0, validators=[MinValueValidator(0)], verbose_name='Dislikes')
    is_active = models.BooleanField(verbose_name='Active', default=True)
    
        
    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Product Comment'
        verbose_name_plural = 'Products Comments'
        
class Discount(models.Model):
    category = models.ForeignKey(Category, related_name='discounts', on_delete=models.CASCADE, verbose_name='Category')
    discount_percentage = models.IntegerField(
        validators=[
            MaxValueValidator(100),
            MinValueValidator(1)
        ],
        verbose_name='Discount Percentage'
    )
    start_date = models.DateTimeField(verbose_name='Start Date')
    end_date = models.DateTimeField(verbose_name='End Date')
    is_active = models.BooleanField(default=True, verbose_name='Active')

    def __str__(self):
        return f"{self.discount_percentage}% off for {self.category.name}"

    def clean(self):
        if self.start_date >= self.end_date:
            raise ValidationError('The start date must be earlier than the end date.')
        if self.start_date < timezone.now() and self.end_date > timezone.now():
            self.is_active = True
        else:
            self.is_active = False
    
    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)