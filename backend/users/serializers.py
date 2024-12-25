from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.core.validators import EmailValidator
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.utils.crypto import get_random_string
from .tasks import send_email_task
from .models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, error_messages={
        'required': 'Please enter your password.',
    })
    confirm_password = serializers.CharField(write_only=True, required=True, error_messages={
        'required': 'Please confirm your password.',
    })
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'confirm_password']
        
        extra_kwargs = {
            'username': {
                'validators': [
                    UniqueValidator(queryset=User.objects.all(),
                    message="An account with this username already exists."),
                ],
                'error_messages': {
                    'max_length': 'Username cannot exceed 150 characters.',
                    'required': 'Please enter your username.',
                }
            },
            'email': {
                'validators': [
                    UniqueValidator(queryset=User.objects.all(), message="An account with this email already exists."),
                    EmailValidator(message="The entered email format is not valid. Please provide a valid email address.")
                ],
                'error_messages': {
                    'required': 'Please enter your email.',
                }
            }
        }
        
    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Password confirmation does not match."})
        
        try:
            validate_password(attrs['password'])
        except ValidationError as e:
            raise serializers.ValidationError({'password': 'Please choose a secure password with at least 8 characters.'})

        return attrs
    
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            auth_token=get_random_string(72),
            is_active=False
        )
        user.set_password(validated_data['password'])
        
        # send confirmation email
        email_context = {
            'user': user,
        }
        
        send_email_task.delay(
            subject='Account Activation',
            to=validated_data['email'],
            context=email_context,
            template_name='email/activate_account.html',
        )
            
        user.save()

        return user

class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField(
        error_messages={
            "required": "Please enter your email.",
            "invalid": "The entered email format is not valid. Please provide a valid email address.",
        }
    )

class ResetPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True, required=True, error_messages={
        'required': 'Please enter your password.',
    })
    confirm_password = serializers.CharField(write_only=True, required=True, error_messages={
        'required': 'Please confirm your password.',
    })

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Password confirmation does not match."})
        
        try:
            validate_password(attrs['password'])
        except ValidationError as e:
            raise serializers.ValidationError({'password': 'Please choose a secure password with at least 8 characters.'})

        return attrs
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'