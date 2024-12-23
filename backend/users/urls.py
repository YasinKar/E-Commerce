from django.urls import path
from .views import (
    RegisterView,
    ActivateAccountView,
    ForgotPasswordAPIView,
    ResetPasswordAPIView,
    # DashboardAPIView,
    ChangeEmailAPIView
)

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('activate/<str:auth_code>', ActivateAccountView.as_view(), name='activate-account'),
    path('forgot-password/', ForgotPasswordAPIView.as_view(), name='forgot-password'),
    path('reset-password/<str:auth_code>', ResetPasswordAPIView.as_view(), name='rest-password'),
    # path('dashboard/', DashboardAPIView.as_view(), name='dashboard'),
    path('change-email/<str:token>', ChangeEmailAPIView.as_view(), name='change-email'),
]