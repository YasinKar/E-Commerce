from django.urls import path

from .views import (
    RegisterView,
    ForgotPasswordAPIView,
    ResetPasswordAPIView,
    OTPRequestView,
    OTPVerifyView
)

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('forgot-password/', ForgotPasswordAPIView.as_view(), name='forgot_password'),
    path('reset-password/<str:auth_code>', ResetPasswordAPIView.as_view(), name='rest_password'),
    path('request-otp/', OTPRequestView.as_view(), name='request_otp'),
    path('verify-otp/', OTPVerifyView.as_view(), name='verify_otp'),
]