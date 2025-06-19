from django.contrib import admin
from django.urls import path
from django.http import HttpResponse
from django.conf import settings
from django.conf.urls.static import static
from ipo_app.views import IPOListAPIView, IPODetailAPIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from ipo_app.views import IPOCreateAPIView


def homepage(request):
    return HttpResponse("<h1>Welcome to the IPO Web App 🚀</h1>")

urlpatterns = [
    path('', homepage),  # 👈 Now / will show a page
    path('admin/', admin.site.urls),
    path('api/ipos/', IPOListAPIView.as_view()),  # 👈 API endpoint
    path('api/ipos/<int:pk>/', IPODetailAPIView.as_view()),  # 👈 New route
     path('api/ipos/create/', IPOCreateAPIView.as_view()),           # 👈 POST IPO
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # 👈 Login
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # 👈 Refresh
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
