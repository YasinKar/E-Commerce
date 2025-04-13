from django.http import JsonResponse
from rest_framework import status
from contents.models import SiteSetting

class MaintenanceModeMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        site_status = SiteSetting.objects.filter(is_main_setting=True).first()

        if site_status and site_status.maintenance_mode:
            if not request.path.startswith('/admin/'):
                response = JsonResponse(
                    {'message' : 'The service is temporarily unavailable due to maintenance. Please try again later.'},
                    status=status.HTTP_503_SERVICE_UNAVAILABLE
                )
                response.reason_phrase = 'The service is temporarily unavailable due to maintenance. Please try again later.'
                return response

        response = self.get_response(request)
        return response
