"""
Django settings for src project.
Generated by 'django-admin startproject' using Django 3.1.14.
For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/
For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

import os
from pathlib import Path
import django_heroku
import environ

django_heroku.settings(locals())

# https://django-environ.readthedocs.io/en/latest/getting-started.html#installation
env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False)
)


# print("_----------",os.environ.get(AWS_ACCESS_KEY_ID))
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent



# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['0.0.0.0', 'localhost', '123.0.0.1']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'corsheaders',
    'rest_framework',
    'anymail',
    "django_dbq",

    'src.apps.bikes',
    'src.apps.stations',
    'src.apps.notifications',
    'src.apps.core',
    'src.apps.profiles',
    'src.apps.authentication',


]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

]

ROOT_URLCONF = 'src.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'src.wsgi.application'


# Database
# https://dev.to/sm0ke/how-to-use-mysql-with-django-for-beginners-2ni0

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'MontyBici',
        'USER': 'root',
        'PASSWORD': 'root',
        'HOST': 'localhost',
        # 'HOST': 'mysql_db',      #<- Nombre del contenedor de docker de mysql
        'PORT': '3306',
    }
}
# Take environment variables from .env file
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))
# https://github.com/anymail/django-anymail
ANYMAIL = {
    # (exact settings here depend on your ESP...)
    "MAILGUN_API_KEY": env('MAILGUN_API_KEY'),
    # your Mailgun domain, if needed
    "MAILGUN_SENDER_DOMAIN": env('MAILGUN_SENDER_DOMAIN'),
}

# or sendgrid.EmailBackend, or...
EMAIL_BACKEND = "anymail.backends.mailgun.EmailBackend"
# if you don't already have this in settings
DEFAULT_FROM_EMAIL = env('DEFAULT_FROM_EMAIL')
# ditto (default from-email for Django errors)
SERVER_EMAIL = env('SERVER_EMAIL')
# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Europe/Madrid'

USE_I18N = True

USE_L10N = True

USE_TZ = True

DATE_INPUT_FORMATS = ('%Y-%m-%d %H:%M:%S')
# TIME_INPUT_FORMATS=[


# ]

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'

# REST_FRAMEWORK = {
#     'DEFAULT_PERMISSION_CLASSES': [
#         'rest_framework.permissions.AllowAny',
#     ]
# }
# Tell Django about the custom `User` model we created. The string
# `authentication.User` tells Django we are referring to the `User` model in
# the `authentication` module. This module is registered above in a setting
# called `INSTALLED_APPS`.


AUTH_USER_MODEL = 'authentication.User'
REST_FRAMEWORK = {
    'EXCEPTION_HANDLER': 'src.apps.core.exceptions.core_exception_handler',
    'NON_FIELD_ERRORS_KEY': 'error',

    'DEFAULT_AUTHENTICATION_CLASSES': (
        'src.apps.authentication.backends.JWTAuthentication',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 300,
}


CORS_ALLOWED_ORIGINS = [

    "http://localhost:3000",
]


STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

STATIC_URL = '/static/'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'mysite/static')
]

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

MEDIA_URL = '/media/'


JOBS = {
    "job_mail": {
        "tasks": ["src.apps.core.jobs.notification_mail"],
        "failure_hook": "src.apps.core.jobs.notification_mail_fail",
    },
}
