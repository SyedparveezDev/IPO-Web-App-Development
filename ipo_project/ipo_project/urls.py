from django.contrib import admin
from django.urls import path
from django.http import HttpResponse
from django.conf import settings
from django.conf.urls.static import static

def homepage(request):
    return HttpResponse("<h1>Welcome to the IPO Web App 🚀</h1>")

urlpatterns = [
    path('', homepage),  # 👈 Now / will show a page
    path('admin/', admin.site.urls),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
