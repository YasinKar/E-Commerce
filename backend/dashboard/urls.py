from django.urls import path
from .views import (
    DashboardAPIView,
    ChangeEmailAPIView,
    AddressDetailView,
    CreateAddressView,
)

urlpatterns = [
    path('', DashboardAPIView.as_view()),
    path('add-address/', CreateAddressView.as_view()),
    path('address/<int:pk>/', AddressDetailView.as_view()),
    path('change-email/', ChangeEmailAPIView.as_view()),
]