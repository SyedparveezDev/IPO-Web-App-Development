from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
    path('logout/', views.logout_user, name='logout'),
    path('forgot-password/', views.forgot_password, name='forgot-password'),
    path('profile/', views.user_profile, name='profile'),
    path('check-auth/', views.check_auth_status, name='check-auth'),
]
