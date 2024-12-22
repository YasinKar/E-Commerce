from django.contrib import admin
from .models import ContactUs, ElectronicSymbol, SiteSetting, FAQ

admin.site.register(SiteSetting)
admin.site.register(ContactUs)
admin.site.register(ElectronicSymbol)
admin.site.register(FAQ)