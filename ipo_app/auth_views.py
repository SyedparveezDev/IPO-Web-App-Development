from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.urls import reverse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
import json

def login_view(request):
    """Login page view"""
    if request.user.is_authenticated:
        return redirect('ipo_app:home')
    
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        remember_me = request.POST.get('remember_me')
        
        # Try to find user by email
        try:
            user = User.objects.get(email=email)
            username = user.username
        except User.DoesNotExist:
            messages.error(request, 'Invalid email or password.')
            return render(request, 'auth/login.html')
        
        # Authenticate user
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            
            # Set session expiry based on remember me
            if not remember_me:
                request.session.set_expiry(0)  # Session expires when browser closes
            else:
                request.session.set_expiry(1209600)  # 2 weeks
            
            messages.success(request, f'Welcome back, {user.first_name or user.username}!')
            
            # Redirect to next page or home
            next_page = request.GET.get('next', 'ipo_app:home')
            return redirect(next_page)
        else:
            messages.error(request, 'Invalid email or password.')
    
    return render(request, 'auth/login.html')

def logout_view(request):
    """Logout view"""
    logout(request)
    messages.success(request, 'You have been logged out successfully.')
    return redirect('ipo_app:login')

def register_view(request):
    """Registration page view"""
    if request.user.is_authenticated:
        return redirect('ipo_app:home')
    
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        
        # Validation
        if password != confirm_password:
            messages.error(request, 'Passwords do not match.')
            return render(request, 'auth/register.html')
        
        if User.objects.filter(email=email).exists():
            messages.error(request, 'An account with this email already exists.')
            return render(request, 'auth/register.html')
        
        if User.objects.filter(username=email).exists():
            messages.error(request, 'An account with this email already exists.')
            return render(request, 'auth/register.html')
        
        # Create user
        try:
            user = User.objects.create_user(
                username=email,
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name
            )
            
            # Auto login after registration
            login(request, user)
            messages.success(request, 'Account created successfully! Welcome to Bluestock.')
            return redirect('ipo_app:home')
            
        except Exception as e:
            messages.error(request, 'Error creating account. Please try again.')
    
    return render(request, 'auth/register.html')

def forgot_password_view(request):
    """Forgot password view"""
    if request.method == 'POST':
        email = request.POST.get('email')
        
        try:
            user = User.objects.get(email=email)
            # In a real application, you would send a password reset email here
            messages.success(request, 'Password reset instructions have been sent to your email.')
            return redirect('ipo_app:login')
        except User.DoesNotExist:
            messages.error(request, 'No account found with this email address.')
    
    return render(request, 'auth/forgot_password.html')

@login_required
def profile_view(request):
    """User profile view"""
    return render(request, 'auth/profile.html')

@csrf_exempt
def google_auth_callback(request):
    """Handle Google OAuth callback (placeholder)"""
    # This would handle Google OAuth in a real implementation
    return JsonResponse({'status': 'not_implemented'})
