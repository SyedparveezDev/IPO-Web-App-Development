from django.urls import path
from . import views
from . import auth_views
from . import admin_views

app_name = 'ipo_app'

urlpatterns = [
    # Web URLs
    path('', views.home_view, name='home'),
    path('ipo/<int:ipo_id>/', views.ipo_detail_view, name='ipo_detail'),
    path('search/', views.search_ipos_ajax, name='search_ajax'),
    
    # API URLs
    path('api/ipo/', views.IPOListCreateAPIView.as_view(), name='ipo_list_api'),
    path('api/ipo/<int:pk>/', views.IPODetailAPIView.as_view(), name='ipo_detail_api'),
    path('api/stats/', views.ipo_stats_api, name='ipo_stats_api'),

    # Authentication URLs
    path('login/', auth_views.login_view, name='login'),
    path('logout/', auth_views.logout_view, name='logout'),
    path('register/', auth_views.register_view, name='register'),
    path('forgot-password/', auth_views.forgot_password_view, name='forgot_password'),
    path('profile/', auth_views.profile_view, name='profile'),
    path('auth/google/callback/', auth_views.google_auth_callback, name='google_auth_callback'),

    # Admin Dashboard URLs
    path('admin-dashboard/', admin_views.admin_dashboard, name='admin_dashboard'),
    path('admin-dashboard/manage-ipo/', admin_views.admin_ipo_list, name='admin_ipo_list'),
    path('admin-dashboard/create-ipo/', admin_views.admin_ipo_create, name='admin_ipo_create'),
    path('admin-dashboard/update-ipo/<int:ipo_id>/', admin_views.admin_ipo_update, name='admin_ipo_update'),
    path('admin-dashboard/delete-ipo/<int:ipo_id>/', admin_views.admin_ipo_delete, name='admin_ipo_delete'),
    path('admin-dashboard/settings/', admin_views.admin_settings, name='admin_settings'),
    path('admin-dashboard/api-manager/', admin_views.admin_api_manager, name='admin_api_manager'),
    path('admin-dashboard/accounts/', admin_views.admin_accounts, name='admin_accounts'),
    path('admin-dashboard/help/', admin_views.admin_help, name='admin_help'),
]
