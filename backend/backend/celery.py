import os
from celery import Celery
from kombu import Exchange, Queue

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
app = Celery('backend')
app.config_from_object('django.conf:settings', namespace='CELERY')

# rabbitmq config
app.conf.task_queues = [
    Queue('send_otp_email', Exchange('send_otp_email'), routing_key='send_otp_email',
          queue_arguments={'x-max-priority': 10}),
    Queue('send_confirmation_email', Exchange('send_confirmation_email'), routing_key='send_confirmation_email',
          queue_arguments={'x-max-priority': 9}),
    Queue('send_welcome_email', Exchange('send_welcome_email'), routing_key='send_welcome_email',
          queue_arguments={'x-max-priority': 8}),
    Queue('send_notification', Exchange('send_notification'), routing_key='send_notification',
          queue_arguments={'x-max-priority': 7}),
]

app.autodiscover_tasks()