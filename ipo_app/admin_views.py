from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib import messages
from django.http import JsonResponse
from django.core.paginator import Paginator
from django.db.models import Q, Count
from django.utils import timezone
from datetime import datetime, timedelta
import json

from .models import IPO

def is_admin(user):
    """Check if user is admin"""
    return user.is_authenticated and (user.is_staff or user.is_superuser)

@login_required
@user_passes_test(is_admin)
def admin_dashboard(request):
    """Main admin dashboard"""
    # Get IPO statistics
    total_ipos = IPO.objects.count()
    upcoming_ipos = IPO.objects.filter(status='upcoming').count()
    ongoing_ipos = IPO.objects.filter(status='ongoing').count()
    listed_ipos = IPO.objects.filter(status='listed').count()
    
    # Recent IPOs
    recent_ipos = IPO.objects.all().order_by('-created_at')[:5]
    
    # Monthly data for charts
    current_date = timezone.now().date()
    monthly_data = []
    for i in range(6):
        month_start = current_date.replace(day=1) - timedelta(days=30*i)
        month_end = month_start.replace(day=28) + timedelta(days=4)
        month_end = month_end - timedelta(days=month_end.day)
        
        month_ipos = IPO.objects.filter(
            created_at__date__gte=month_start,
            created_at__date__lte=month_end
        ).count()
        
        monthly_data.append({
            'month': month_start.strftime('%b %Y'),
            'count': month_ipos
        })
    
    context = {
        'total_ipos': total_ipos,
        'upcoming_ipos': upcoming_ipos,
        'ongoing_ipos': ongoing_ipos,
        'listed_ipos': listed_ipos,
        'recent_ipos': recent_ipos,
        'monthly_data': json.dumps(monthly_data),
        'current_date': current_date.strftime('%d %b %Y'),
    }
    
    return render(request, 'admin_dashboard/dashboard.html', context)

@login_required
@user_passes_test(is_admin)
def admin_ipo_list(request):
    """IPO management table"""
    # Get filter parameters
    status_filter = request.GET.get('status', '')
    search_query = request.GET.get('search', '')
    
    # Base queryset
    ipos = IPO.objects.all().order_by('-created_at')
    
    # Apply filters
    if status_filter:
        ipos = ipos.filter(status=status_filter)
    
    if search_query:
        ipos = ipos.filter(
            Q(company_name__icontains=search_query) |
            Q(description__icontains=search_query)
        )
    
    # Pagination
    paginator = Paginator(ipos, 10)
    page_number = request.GET.get('page', 1)
    page_obj = paginator.get_page(page_number)
    
    context = {
        'ipos': page_obj,
        'status_filter': status_filter,
        'search_query': search_query,
        'total_count': ipos.count(),
    }
    
    return render(request, 'admin_dashboard/ipo_list.html', context)

@login_required
@user_passes_test(is_admin)
def admin_ipo_create(request):
    """Create new IPO"""
    if request.method == 'POST':
        try:
            # Create IPO from form data
            ipo = IPO.objects.create(
                company_name=request.POST.get('company_name'),
                price_band=request.POST.get('price_band'),
                open_date=request.POST.get('open_date'),
                close_date=request.POST.get('close_date'),
                issue_size=request.POST.get('issue_size'),
                issue_type=request.POST.get('issue_type'),
                status=request.POST.get('status'),
                description=request.POST.get('description', ''),
                ipo_price=request.POST.get('ipo_price') or None,
                listing_price=request.POST.get('listing_price') or None,
                current_market_price=request.POST.get('current_market_price') or None,
                listing_date=request.POST.get('listing_date') or None,
            )
            
            # Handle file uploads
            if request.FILES.get('logo'):
                ipo.logo = request.FILES['logo']
            if request.FILES.get('rhp_pdf'):
                ipo.rhp_pdf = request.FILES['rhp_pdf']
            if request.FILES.get('drhp_pdf'):
                ipo.drhp_pdf = request.FILES['drhp_pdf']
            
            ipo.save()
            
            messages.success(request, f'IPO "{ipo.company_name}" created successfully!')
            return redirect('ipo_app:admin_ipo_list')
            
        except Exception as e:
            messages.error(request, f'Error creating IPO: {str(e)}')
    
    return render(request, 'admin_dashboard/ipo_form.html', {
        'title': 'Register New IPO',
        'action': 'create'
    })

@login_required
@user_passes_test(is_admin)
def admin_ipo_update(request, ipo_id):
    """Update existing IPO"""
    ipo = get_object_or_404(IPO, id=ipo_id)
    
    if request.method == 'POST':
        try:
            # Update IPO fields
            ipo.company_name = request.POST.get('company_name')
            ipo.price_band = request.POST.get('price_band')
            ipo.open_date = request.POST.get('open_date')
            ipo.close_date = request.POST.get('close_date')
            ipo.issue_size = request.POST.get('issue_size')
            ipo.issue_type = request.POST.get('issue_type')
            ipo.status = request.POST.get('status')
            ipo.description = request.POST.get('description', '')
            
            # Handle optional fields
            ipo.ipo_price = request.POST.get('ipo_price') or None
            ipo.listing_price = request.POST.get('listing_price') or None
            ipo.current_market_price = request.POST.get('current_market_price') or None
            ipo.listing_date = request.POST.get('listing_date') or None
            
            # Handle file uploads
            if request.FILES.get('logo'):
                ipo.logo = request.FILES['logo']
            if request.FILES.get('rhp_pdf'):
                ipo.rhp_pdf = request.FILES['rhp_pdf']
            if request.FILES.get('drhp_pdf'):
                ipo.drhp_pdf = request.FILES['drhp_pdf']
            
            ipo.save()
            
            messages.success(request, f'IPO "{ipo.company_name}" updated successfully!')
            return redirect('ipo_app:admin_ipo_list')
            
        except Exception as e:
            messages.error(request, f'Error updating IPO: {str(e)}')
    
    return render(request, 'admin_dashboard/ipo_form.html', {
        'title': f'Update {ipo.company_name}',
        'action': 'update',
        'ipo': ipo
    })

@login_required
@user_passes_test(is_admin)
def admin_ipo_delete(request, ipo_id):
    """Delete IPO"""
    ipo = get_object_or_404(IPO, id=ipo_id)
    
    if request.method == 'POST':
        company_name = ipo.company_name
        ipo.delete()
        messages.success(request, f'IPO "{company_name}" deleted successfully!')
        return redirect('ipo_app:admin_ipo_list')
    
    return render(request, 'admin_dashboard/ipo_delete.html', {'ipo': ipo})

@login_required
@user_passes_test(is_admin)
def admin_settings(request):
    """Admin settings page"""
    return render(request, 'admin_dashboard/settings.html')

@login_required
@user_passes_test(is_admin)
def admin_api_manager(request):
    """API manager page"""
    return render(request, 'admin_dashboard/api_manager.html')

@login_required
@user_passes_test(is_admin)
def admin_accounts(request):
    """Accounts management page"""
    return render(request, 'admin_dashboard/accounts.html')

@login_required
@user_passes_test(is_admin)
def admin_help(request):
    """Help page"""
    return render(request, 'admin_dashboard/help.html')
