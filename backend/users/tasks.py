from celery import shared_task
from utils.email_service import send_email

@shared_task(queue='tasks')
def send_email_task(subject, to, context, template_name):
    send_email(subject, to, context, template_name)
    return f'email sent to {to}'