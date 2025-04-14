from django.contrib import admin
from .models import User, EmailChangeRequest, OTP

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'username', 'email', 'is_active')
    list_filter = ('is_active', )
    list_editable = ('is_active',)
    list_display_links = ('first_name', 'last_name', 'username', 'email')
    search_fields = ('first_name', 'last_name', 'username', 'email')
    
@admin.register(EmailChangeRequest)
class EmailChangeRequestAdmin(admin.ModelAdmin):
    list_display = ('user', 'new_email', 'confirmed')
    list_filter = ('confirmed', )
    search_fields = ('user', 'new_email')
    
admin.site.register(OTP)