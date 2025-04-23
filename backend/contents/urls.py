from django.urls import path, include

urlpatterns = [
    path('v1/', include('contents.v1.urls')),
]