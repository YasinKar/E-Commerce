from django.contrib import admin
from .models import ContactUs, ElectronicSymbol, SiteSetting, FAQ, Slider

@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ('domain', 'site_name', 'maintenance_mode', 'is_main_setting')
    list_filter = ('domain', 'site_name', 'maintenance_mode', 'is_main_setting')
    search_fields = ('domain', 'site_name', 'maintenance_mode', 'is_main_setting')
    
admin.site.register(ContactUs)
admin.site.register(ElectronicSymbol)
admin.site.register(FAQ)
admin.site.register(Slider)