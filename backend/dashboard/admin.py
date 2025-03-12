from django.contrib import admin
from .models import Message
    
@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'date')
    list_filter = ('user', 'date')