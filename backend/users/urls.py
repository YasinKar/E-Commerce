from django.urls import path, include

urlpatterns = [
    path('v1/', include('users.v1.urls'))
]