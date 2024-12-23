from django.contrib.auth.models import AbstractUser
from django.db import models
from .tasks import send_email_task
from django.utils.crypto import get_random_string
from django.core.exceptions import ValidationError

class User(AbstractUser):
    auth_token = models.CharField(blank=True, null=True, max_length=300, unique=True, verbose_name='Auth Token')
    email = models.EmailField(unique=True, verbose_name='Email')
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f'User {self.username} Eamil : {self.email} {'Active' if self.is_active else 'Inactive'}'
    
    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        
class EmailChangeRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='User')
    token = models.CharField(max_length=100, unique=True, verbose_name='Token')
    new_email = models.EmailField(verbose_name='New email')
    confirmed = models.BooleanField(default=False, verbose_name='Confirmed')
    
    def clean(self):
        if User.objects.filter(email=self.new_email).exists():
            raise ValidationError('This email address is already registered with another user.')
    
    def generate_token(self):
        self.token = get_random_string(length=72)
        self.save()

    def send_confirmation_email(self, email_context):
        send_email_task.delay(
            subject='Confirm your email change',
            to= self.new_email,
            context=email_context,
            template_name='email/email_change.html'
        )
    
    def apply_email_change(self):
        self.user.email = self.new_email
        self.user.save()

    def __str__(self):
        return f'Email Change Request for {self.user.username} to {self.new_email}'