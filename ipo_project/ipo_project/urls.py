from django.contrib import admin
from django.urls import path
from django.http import HttpResponse
from django.conf import settings
from django.conf.urls.static import static
from ipo_app.views import IPOListAPIView, IPODetailAPIView


def homepage(request):
    return HttpResponse("<h1>Welcome to the IPO Web App 🚀</h1>")

urlpatterns = [
    path('', homepage),  # 👈 Now / will show a page
    path('admin/', admin.site.urls),
    path('api/ipos/', IPOListAPIView.as_view()),  # 👈 API endpoint
    path('api/ipos/<int:pk>/', IPODetailAPIView.as_view()),  # 👈 New route
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
