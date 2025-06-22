from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.db.models import Q
from django.core.paginator import Paginator
from rest_framework import generics, filters, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
import django_filters

from .models import IPO
from .serializers import IPOListSerializer, IPODetailSerializer, IPOCreateUpdateSerializer

# API Views
class IPOFilter(django_filters.FilterSet):
    """Custom filter for IPO API"""
    company_name = django_filters.CharFilter(lookup_expr='icontains')
    status = django_filters.ChoiceFilter(choices=IPO.STATUS_CHOICES)
    issue_type = django_filters.ChoiceFilter(choices=IPO.ISSUE_TYPE_CHOICES)
    open_date_from = django_filters.DateFilter(field_name='open_date', lookup_expr='gte')
    open_date_to = django_filters.DateFilter(field_name='open_date', lookup_expr='lte')
    
    class Meta:
        model = IPO
        fields = ['status', 'issue_type', 'company_name']

class IPOListCreateAPIView(generics.ListCreateAPIView):
    """API endpoint for listing and creating IPOs"""
    queryset = IPO.objects.all()
    filterset_class = IPOFilter
    search_fields = ['company_name', 'description']
    ordering_fields = ['open_date', 'close_date', 'created_at', 'company_name']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return IPOCreateUpdateSerializer
        return IPOListSerializer

class IPODetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    """API endpoint for IPO detail, update, and delete"""
    queryset = IPO.objects.all()
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return IPOCreateUpdateSerializer
        return IPODetailSerializer

@api_view(['GET'])
def ipo_stats_api(request):
    """API endpoint for IPO statistics"""
    total_ipos = IPO.objects.count()
    upcoming_ipos = IPO.objects.filter(status='upcoming').count()
    ongoing_ipos = IPO.objects.filter(status='ongoing').count()
    listed_ipos = IPO.objects.filter(status='listed').count()
    
    return Response({
        'total_ipos': total_ipos,
        'upcoming_ipos': upcoming_ipos,
        'ongoing_ipos': ongoing_ipos,
        'listed_ipos': listed_ipos,
    })

# Web Views
def home_view(request):
    """Home page view showing all IPOs"""
    # Get filter parameters
    status_filter = request.GET.get('status', '')
    search_query = request.GET.get('search', '')
    
    # Base queryset
    ipos = IPO.objects.all()
    
    # Apply filters
    if status_filter:
        ipos = ipos.filter(status=status_filter)
    
    if search_query:
        ipos = ipos.filter(
            Q(company_name__icontains=search_query) |
            Q(description__icontains=search_query)
        )
    
    # Separate IPOs by status
    upcoming_ipos = ipos.filter(status='upcoming').order_by('open_date')
    ongoing_ipos = ipos.filter(status='ongoing').order_by('close_date')
    listed_ipos = ipos.filter(status='listed').order_by('-listing_date')
    
    # Pagination
    paginator = Paginator(ipos, 12)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'upcoming_ipos': upcoming_ipos[:6],  # Show first 6
        'ongoing_ipos': ongoing_ipos[:6],
        'listed_ipos': listed_ipos[:6],
        'all_ipos': page_obj,
        'status_filter': status_filter,
        'search_query': search_query,
        'total_count': ipos.count(),
    }
    
    return render(request, 'home.html', context)

def ipo_detail_view(request, ipo_id):
    """IPO detail page view"""
    ipo = get_object_or_404(IPO, id=ipo_id)
    
    # Get related IPOs (same status, excluding current)
    related_ipos = IPO.objects.filter(
        status=ipo.status
    ).exclude(id=ipo.id)[:4]
    
    context = {
        'ipo': ipo,
        'related_ipos': related_ipos,
    }
    
    return render(request, 'ipo_detail.html', context)

def search_ipos_ajax(request):
    """AJAX endpoint for IPO search"""
    query = request.GET.get('q', '')
    
    if len(query) < 2:
        return JsonResponse({'results': []})
    
    ipos = IPO.objects.filter(
        Q(company_name__icontains=query) |
        Q(description__icontains=query)
    )[:10]
    
    results = []
    for ipo in ipos:
        results.append({
            'id': ipo.id,
            'company_name': ipo.company_name,
            'status': ipo.get_status_display(),
            'price_band': ipo.price_band,
            'logo_url': ipo.logo.url if ipo.logo else None,
        })
    
    return JsonResponse({'results': results})
