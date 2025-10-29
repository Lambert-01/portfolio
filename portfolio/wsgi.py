"""
WSGI config for portfolio project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

# Force settings module to avoid environment variable issues
os.environ['DJANGO_SETTINGS_MODULE'] = 'portfolio.settings'

application = get_wsgi_application()
