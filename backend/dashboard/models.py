from django.db import models
from users.models import User

class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='User', related_name='messages')
    title = models.CharField(max_length=300, verbose_name='Title')
    message = models.TextField(verbose_name='Message')
    date = models.DateField(auto_now_add=True, verbose_name='Date')
    
    class Meta:
        verbose_name = 'Message'
        verbose_name_plural = 'Messages'
    
    def __str__(self):
        return self.user.username