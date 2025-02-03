from django.urls import path
from .views import (
    CartView,
    AddOrderView,
    RemoveOrderView,
    ChangeOrderCountView,
    AddressSelectionView
)

urlpatterns = [
    path('checkout/', CartView.as_view()),
    path('add-order/', AddOrderView.as_view()),
    path('remove-order/', RemoveOrderView.as_view()),
    path('change-order-count/', ChangeOrderCountView.as_view()),
    path('select-address/<int:pk>/', AddressSelectionView.as_view()),
]