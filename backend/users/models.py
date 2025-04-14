from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.crypto import get_random_string
from django.core.exceptions import ValidationError
from django.utils import timezone

class User(AbstractUser):
    auth_token = models.CharField(blank=True, null=True, max_length=80, unique=True, verbose_name='Auth Token')
    email = models.EmailField(max_length=250, unique=True, verbose_name='Email')
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username
    
    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        
class EmailChangeRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='User')
    token = models.CharField(max_length=100, unique=True, verbose_name='Token')
    new_email = models.EmailField(verbose_name='New email')
    confirmed = models.BooleanField(default=False, verbose_name='Confirmed')
    
    def save(self, *args, **kwargs):
        if not self.token:
            self.token = get_random_string(length=72)
        super().save(*args, **kwargs) 
    
    def clean(self):
        if User.objects.filter(email=self.new_email).exists():
            raise ValidationError('This email address is already registered with another user.')

    def __str__(self):
        return f'Email Change Request for {self.user.username} to {self.new_email}'
    
class OTP(models.Model):
    email = models.CharField(max_length=250)
    code = models.CharField(max_length=6)
    is_used = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_valid(self):
        return self.created_at >= timezone.now() - timezone.timedelta(minutes=2)

    def generate_otp(self):
        return get_random_string(5)
    
    def save(self, *args, **kwargs):
        if not self.code:
            self.code = self.generate_otp()
        super().save(*args, **kwargs) 
    
    def __str__(self):
        return f"{self.email} - {self.code}"
    
    class Meta:
        verbose_name = 'OTP'
        verbose_name_plural = 'OTPs'