from django.urls import path
from .views import SiteContentsView, ContactUsView, SiteBannersView

urlpatterns = [
    path('contact-us/', ContactUsView.as_view(), name='contact-us'),
    path('contents/', SiteContentsView.as_view(), name='site-contents'),
    path('banners/', SiteBannersView.as_view(), name='site-banners'),
]