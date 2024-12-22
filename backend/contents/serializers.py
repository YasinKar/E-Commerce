from rest_framework import serializers
from .models import SiteSetting, ElectronicSymbol, ContactUs, FAQ

class SiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSetting
        fields = '__all__'

class ElectronicSymbolSerializer(serializers.ModelSerializer):
    class Meta:
        model = ElectronicSymbol
        fields = '__all__'

class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = '__all__'
        
class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'

