from django.urls import path, include

urlpatterns = [
    path('v1/', include('dashboard.v1.urls')),
]