from django.contrib import admin
from django.utils.html import format_html
from .models import ContactUs, ElectronicSymbol, SiteSetting, FAQ, Slider

@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ('domain', 'site_name', 'maintenance_mode', 'is_main_setting')
    list_filter = ('domain', 'site_name', 'maintenance_mode', 'is_main_setting')
    search_fields = ('domain', 'site_name', 'maintenance_mode', 'is_main_setting')
    
@admin.register(Slider)
class SliderAdmin(admin.ModelAdmin):
    list_display = ('image_tag', 'url', 'is_active')
    
    def image_tag(self, obj):
        return format_html('<img src="{}" width="300" height="100" />'.format(obj.image.url))
    
    image_tag.short_description = 'Image'
    
@admin.register(ElectronicSymbol)
class ElectronicSymbolAdmin(admin.ModelAdmin):
    list_display = ('image_tag', 'url', 'is_active')
    
    def image_tag(self, obj):
        return format_html('<img src="{}" width="100" height="100" />'.format(obj.image.url))
    
    image_tag.short_description = 'Image'
    
admin.site.register(ContactUs)
admin.site.register(FAQ)

