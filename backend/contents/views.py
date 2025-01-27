from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from .models import SiteSetting, ElectronicSymbol, ContactUs, FAQ, Slider
from .serializers import SiteSettingSerializer, ElectronicSymbolSerializer, ContactUsSerializer, FAQSerializer, SliderSerializer

class SiteContentsView(APIView):
    """
    API View to get both site settings and electronic symbols.
    """
    def get(self, request, format=None):
        try:
            site_setting = SiteSetting.objects.get(is_main_setting=True)
        except SiteSetting.DoesNotExist:
            return Response({"detail": "Site settings not found."}, status=status.HTTP_404_NOT_FOUND)

        symbols = ElectronicSymbol.objects.filter(is_active=True)
        faq = FAQ.objects.filter(is_active=True)

        site_setting_serializer = SiteSettingSerializer(site_setting)
        symbols_serializer = ElectronicSymbolSerializer(symbols, many=True)
        faq_serializer = FAQSerializer(faq, many=True)

        return Response({
            "site_settings": site_setting_serializer.data,
            "electronic_symbols": symbols_serializer.data,
            "faq": faq_serializer.data
        }, status=status.HTTP_200_OK)
  
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