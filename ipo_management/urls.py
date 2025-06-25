from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'companies', views.CompanyViewSet)
router.register(r'ipos', views.IPOViewSet)
router.register(r'documents', views.IPODocumentViewSet)
router.register(r'news', views.IPONewsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard-stats/', views.dashboard_stats, name='dashboard-stats'),
    path('quick-links/', views.quick_links, name='quick-links'),
]
