from django.urls import path
from .views import ElectronicSymbolsView, ContactUsView, SiteBannersView, SiteSettingsView, FAQView

urlpatterns = [
    path('contact-us/', ContactUsView.as_view(), name='contact-us'),
    path('settings/', SiteSettingsView.as_view(), name='site-settings'),
    path('electronic-symbols/', ElectronicSymbolsView.as_view(), name='electronic-symbols'),
    path('FAQ/', FAQView.as_view(), name='FAQ'),
    path('banners/', SiteBannersView.as_view(), name='site-banners'),
]