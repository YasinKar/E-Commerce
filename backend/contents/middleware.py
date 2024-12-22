from django.shortcuts import render
from .models import SiteSetting

class MaintenanceModeMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        site_status = SiteSetting.objects.filter(is_main_setting=True).first()

        if site_status and site_status.maintenance_mode:
            if not request.path.startswith('/admin/'):
                return render(request, 'maintenance.html')

        response = self.get_response(request)
        return response
