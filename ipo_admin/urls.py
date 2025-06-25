"""
URL configuration for ipo_admin project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('ipo_management.urls')),
    path('', TemplateView.as_view(template_name='index.html'), name='dashboard'),
    path('dashboard/', TemplateView.as_view(template_name='index.html'), name='dashboard'),
    path('upcoming/', TemplateView.as_view(template_name='index.html'), name='upcoming'),
    path('register/', TemplateView.as_view(template_name='index.html'), name='register'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
