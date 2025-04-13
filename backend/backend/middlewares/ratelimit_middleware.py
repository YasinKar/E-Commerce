from django_ratelimit.core import is_ratelimited

class RateLimitMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_view(self, request, view_func, view_args, view_kwargs):
        rate = '20/m'
        group = None
        key = 'ip'
        
        if hasattr(view_func, '_ratelimit'):
            return None
            
        ratelimited = is_ratelimited(
            request=request,
            group=group,
            fn=view_func,
            key=key,
            rate=rate,
            increment=True
        )
        
        if ratelimited:
            from django_ratelimit.exceptions import Ratelimited
            raise Ratelimited()
            
        return None