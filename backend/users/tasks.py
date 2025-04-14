from celery import shared_task
from utils.email_service import send_email

@shared_task(queue='send_otp_email')
def send_otp_email(subject, to, context, template_name):
    send_email(subject, to, context, template_name)
    return f'OTP email sent to {to}'


@shared_task(queue='send_confirmation_email')
def send_confirmation_email(subject, to, context, template_name):
    send_email(subject, to, context, template_name)
    return f'confirmation email sent to {to}'

@shared_task(queue='send_welcome_email')
def send_welcome_email(subject, to, context, template_name):
    send_email(subject, to, context, template_name)
    return f'welcome email sent to {to}'