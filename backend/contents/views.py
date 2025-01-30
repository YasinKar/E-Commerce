from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from .models import SiteSetting, ElectronicSymbol, ContactUs, FAQ, Slider
from .serializers import SiteSettingSerializer, ElectronicSymbolSerializer, ContactUsSerializer, FAQSerializer, SliderSerializer
        
class SiteSettingsView(RetrieveAPIView):
    serializer_class = SiteSettingSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        return SiteSetting.objects.filter(is_main_setting=True).first()
  
class ElectronicSymbolsView(ListAPIView):
    queryset = ElectronicSymbol.objects.filter(is_active=True)
    serializer_class = ElectronicSymbolSerializer
    permission_classes = [AllowAny]  

class FAQView(ListAPIView):
    queryset = FAQ.objects.filter(is_active=True)
    serializer_class = FAQSerializer
    permission_classes = [AllowAny]
  
class SiteBannersView(ListAPIView):
    queryset = Slider.objects.filter(is_active=True)
    serializer_class = SliderSerializer
    permission_classes = [AllowAny]
        
class ContactUsView(CreateAPIView):
    """
    API view to submit a contact message.
    """
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer
    permission_classes = [AllowAny]
    
def site_setting(request):
    site_setting = SiteSetting.objects.filter(is_main_setting=True).first()
    return {
        'site_setting': site_setting,
    }