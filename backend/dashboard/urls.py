from django.urls import path
from .views import (
    UserAccountAPIView,
    AddressDetailView,
    ChangeEmailAPIView,
    CreateAddressView,
    UserAddressListView,
    UserMessageListView,
    UserOrderListView,
)

urlpatterns = [
    path('', UserAccountAPIView.as_view()),
    path('messages/', UserMessageListView.as_view()),
    path('orders/', UserOrderListView.as_view()),
    path('addresses/', UserAddressListView.as_view()),
    path('add-address/', CreateAddressView.as_view()),
    path('address/<int:pk>/', AddressDetailView.as_view()),
    path('change-email/<str:token>', ChangeEmailAPIView.as_view()),
]