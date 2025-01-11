from rest_framework import serializers
from .models import SiteSetting, ElectronicSymbol, ContactUs, FAQ, Slider

class SiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSetting
        fields = [
            'id', 'domain', 'site_name',
            'site_logo', 'site_icon', 'site_about',
            'rules', 'github', 'twitter',
            'linkedin', 'instagram', 'email',
            'copyright',
        ]

class ElectronicSymbolSerializer(serializers.ModelSerializer):
    class Meta:
        model = ElectronicSymbol
        fields = [
            'id',
            'url',
            'image',
        ]

class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = '__all__'
        
class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'
        
class SliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slider
        fields = ['id', 'image', 'url']