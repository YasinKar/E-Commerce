from django.urls import path
from .views import (
    CartView,
    AddressSelectionView
)

urlpatterns = [
    path('checkout/', CartView.as_view()),
    path('select-address/<int:pk>/', AddressSelectionView.as_view()),
]