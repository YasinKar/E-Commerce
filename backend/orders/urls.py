from django.urls import path, include

urlpatterns = [
    path('v1/', include('orders.v1.urls')),
]