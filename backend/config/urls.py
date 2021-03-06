# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.views.generic import TemplateView
from django.views import defaults as default_views
from django.contrib.staticfiles import views

from backend.payment.views import save_stripe_token

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='pages/home.html'), name='home'),
    url(r'^about/$', TemplateView.as_view(template_name='pages/about.html'), name='about'),

    # Django Admin, use {% url 'admin:index' %}
    url(settings.ADMIN_URL, admin.site.urls),

    # User management

    # User profile page is handled by React `Goals app`
    url(r'^users/[\w.@+-]+/$', views.serve, kwargs={'path': 'index.html'}, name='profile'),

    url(r'^users/', include('backend.users.urls', namespace='users')),
    url(r'^accounts/', include('allauth.urls')),

    # Your stuff: custom urls includes go here

    # REST API
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    # Include login URLs for the browsable API.
    url(r'^api/', include('backend.api.urls', namespace='api')),

    # Deals React app
    url(r'^deals/$', views.serve, kwargs={'path': 'index.html'}, name='deals'),

    # Goals React app
    url(r'^goals/$', views.serve, kwargs={'path': 'index.html'}, name='goals'),

    # Payment app
    url(r'^save-stripe-token/$', save_stripe_token, name='payment'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + staticfiles_urlpatterns()

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        url(r'^400/$', default_views.bad_request, kwargs={'exception': Exception('Bad Request!')}),
        url(r'^403/$', default_views.permission_denied, kwargs={'exception': Exception('Permission Denied')}),
        url(r'^404/$', default_views.page_not_found, kwargs={'exception': Exception('Page not Found')}),
        url(r'^500/$', default_views.server_error),
    ]
    if 'debug_toolbar' in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns += [
            url(r'^__debug__/', include(debug_toolbar.urls)),
        ]
