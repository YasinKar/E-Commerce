from django.urls import path, include

urlpatterns = [
    path('api/v1/', include('users.v1.urls'))
]