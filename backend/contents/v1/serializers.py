from rest_framework import serializers
from contents.models import SiteSetting, ElectronicSymbol, ContactUs, FAQ, Slider

class SiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSetting
        fields = [
            'id', 'domain', 'site_name',
            'site_logo', 'site_icon', 'site_description',
            'rules', 'twitter', 'telegram',
            'linkedin', 'instagram', 'email',
            'copyright', 'site_main_title'
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