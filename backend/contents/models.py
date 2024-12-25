from django.db import models
from django.core.validators import RegexValidator
from django.conf import settings

class SiteSetting(models.Model):
    domain = models.CharField(max_length=300, verbose_name='Domain')
    site_name = models.CharField(max_length=100, verbose_name='Site name')
    site_logo = models.ImageField(upload_to='site_logo', verbose_name='Site logo')
    site_icon = models.ImageField(upload_to='site_icon',null=True, blank=True, verbose_name='Site icon')
    site_about = models.TextField(verbose_name='About us')
    rules = models.TextField(verbose_name='Rules')
    github = models.URLField(
        max_length=400,
        verbose_name='Github',
        null=True,
        blank=True,
        validators=[RegexValidator(
            regex=r'^https://github\.com/.*$',
            message='Please enter a valid Github URL starting with https://github.com/'
        )]
    )
    twitter = models.URLField(
        max_length=400,
        verbose_name='Twitter',
        null=True,
        blank=True,
        validators=[RegexValidator(
            regex=r'^https://twitter\.com/.*$',
            message='Please enter a valid Twitter URL starting with https://twitter.com/'
        )]
    )
    linkedin = models.URLField(
        max_length=400,
        verbose_name='Linkedin',
        null=True,
        blank=True,
        validators=[RegexValidator(
            regex=r'^https://www\.linkedin\.com/.*$',
            message='Please enter a valid Linkedin URL starting with https://www.linkedin.com/'
        )]
    )
    instagram = models.URLField(
        max_length=400,
        verbose_name='Instagram',
        null=True,
        blank=True,
        validators=[RegexValidator(
            regex=r'^https://www\.instagram\.com/.*$',
            message='Please enter a valid Instagram URL starting with https://www.instagram.com/'
        )]
    )
    email = models.EmailField(max_length=200, verbose_name='Email', null=True, blank=True)
    copyright = models.CharField(max_length=200, verbose_name='Copyright', null=True, default='&#169;کلیه حقوق محفوظ است')
    maintenance_mode = models.BooleanField(default=False, verbose_name='Maintenance mode')
    is_main_setting = models.BooleanField(default=False, verbose_name='Main setting')
     
    class Meta:
        verbose_name = 'Site Setting'
        verbose_name_plural = 'Site Settings'
    
    def __str__(self) :
        return f'{self.site_name} {'Active' if self.is_main_setting else 'Inactive'}'
    
class ElectronicSymbol(models.Model):
    url = models.URLField(max_length=200, verbose_name='URL')
    image = models.ImageField(upload_to='e_symbols', verbose_name='Image')
    is_active = models.BooleanField(verbose_name='Active', default=True, db_index=True)
     
    class Meta:
        verbose_name = 'Electronic Symbol'
        verbose_name_plural = 'Electronic Symbols'

class FAQ(models.Model):
    question = models.TextField(verbose_name='Question')
    answer = models.TextField(verbose_name='Answer')
    is_active = models.BooleanField(verbose_name='Active', default=True, db_index=True)
    
    class Meta:
        verbose_name = 'FAQ'
        verbose_name_plural = 'FAQ'
    
    def __str__(self) :
        return self.question
   
class ContactUs(models.Model):
    email = models.EmailField(max_length=200, verbose_name='Email')
    title = models.CharField(max_length=100, verbose_name='Title')
    message = models.TextField(verbose_name='Message')
    date = models.DateField(auto_now_add=True, verbose_name='Date')
    
    class Meta:
        verbose_name = 'Contact'
        verbose_name_plural = 'Contacts'
    
    def __str__(self):
        return f'Contact from {self.email}, Title : {self.title}'