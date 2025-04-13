from django.urls import path, include

urlpatterns = [
    path('api/v1/', include('orders.v1.urls')),
]