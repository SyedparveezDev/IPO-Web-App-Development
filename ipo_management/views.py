from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.db.models import Count, Sum, Avg, Q
from django.utils import timezone
from datetime import datetime, timedelta
from .models import Company, IPO, IPODocument, IPONews
from .serializers import (
    CompanySerializer, IPOListSerializer, IPODetailSerializer,
    IPOCreateUpdateSerializer, IPODocumentSerializer, IPONewsSerializer,
    DashboardStatsSerializer
)

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    
    def get_queryset(self):
        queryset = Company.objects.all()
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(name__icontains=search)
        return queryset

class IPOViewSet(viewsets.ModelViewSet):
    queryset = IPO.objects.select_related('company').all()
    
    def get_serializer_class(self):
        if self.action == 'list':
            return IPOListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return IPOCreateUpdateSerializer
        return IPODetailSerializer
    
    def get_queryset(self):
        queryset = IPO.objects.select_related('company').all()
        
        # Filter by status
        status_filter = self.request.query_params.get('status', None)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        # Filter by date range
        date_from = self.request.query_params.get('date_from', None)
        date_to = self.request.query_params.get('date_to', None)
        if date_from:
            queryset = queryset.filter(open_date__gte=date_from)
        if date_to:
            queryset = queryset.filter(close_date__lte=date_to)
        
        # Search by company name
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(company__name__icontains=search)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Get upcoming IPOs"""
        today = timezone.now().date()
        upcoming_ipos = self.get_queryset().filter(
            Q(status='upcoming') | Q(open_date__gt=today)
        ).order_by('open_date')
        
        serializer = IPOListSerializer(upcoming_ipos, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def ongoing(self, request):
        """Get ongoing IPOs"""
        today = timezone.now().date()
        ongoing_ipos = self.get_queryset().filter(
            open_date__lte=today,
            close_date__gte=today,
            status='ongoing'
        )
        
        serializer = IPOListSerializer(ongoing_ipos, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def new_listed(self, request):
        """Get newly listed IPOs (within last 30 days)"""
        thirty_days_ago = timezone.now().date() - timedelta(days=30)
        new_listed = self.get_queryset().filter(
            listing_date__gte=thirty_days_ago,
            status='new_listed'
        ).order_by('-listing_date')
        
        serializer = IPOListSerializer(new_listed, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        """Update IPO status"""
        ipo = self.get_object()
        new_status = request.data.get('status')
        
        if new_status in dict(IPO.STATUS_CHOICES):
            ipo.status = new_status
            ipo.save()
            serializer = self.get_serializer(ipo)
            return Response(serializer.data)
        
        return Response(
            {'error': 'Invalid status'}, 
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['GET'])
def dashboard_stats(request):
    """Get dashboard statistics"""
    today = timezone.now().date()
    
    # Basic counts
    total_ipos = IPO.objects.count()
    upcoming_ipos = IPO.objects.filter(status='upcoming').count()
    ongoing_ipos = IPO.objects.filter(status='ongoing').count()
    new_listed_ipos = IPO.objects.filter(status='new_listed').count()
    
    # Performance stats
    profitable_ipos = IPO.objects.filter(listing_gain_loss__gt=0).count()
    loss_making_ipos = IPO.objects.filter(listing_gain_loss__lt=0).count()
    
    # Financial stats
    total_issue_size = IPO.objects.aggregate(
        total=Sum('issue_size')
    )['total'] or 0
    
    avg_listing_gain = IPO.objects.filter(
        listing_gain_loss__isnull=False
    ).aggregate(
        avg=Avg('listing_gain_loss')
    )['avg'] or 0
    
    stats = {
        'total_ipos': total_ipos,
        'upcoming_ipos': upcoming_ipos,
        'ongoing_ipos': ongoing_ipos,
        'new_listed_ipos': new_listed_ipos,
        'profitable_ipos': profitable_ipos,
        'loss_making_ipos': loss_making_ipos,
        'total_issue_size': total_issue_size,
        'avg_listing_gain': round(avg_listing_gain, 2)
    }
    
    serializer = DashboardStatsSerializer(stats)
    return Response(serializer.data)

@api_view(['GET'])
def quick_links(request):
    """Get quick links data"""
    links = [
        {
            'name': 'NSE India',
            'url': 'https://www.nseindia.com',
            'icon': 'fas fa-chart-line',
            'description': 'National Stock Exchange'
        },
        {
            'name': 'BSE India',
            'url': 'https://www.bseindia.com',
            'icon': 'fas fa-building',
            'description': 'Bombay Stock Exchange'
        },
        {
            'name': 'SEBI',
            'url': 'https://www.sebi.gov.in',
            'icon': 'fas fa-shield-alt',
            'description': 'Securities and Exchange Board'
        },
        {
            'name': 'Money Control',
            'url': 'https://www.moneycontrol.com',
            'icon': 'fas fa-money-bill-wave',
            'description': 'Financial News & Analysis'
        }
    ]
    
    return Response(links)

class IPODocumentViewSet(viewsets.ModelViewSet):
    queryset = IPODocument.objects.all()
    serializer_class = IPODocumentSerializer
    
    def get_queryset(self):
        queryset = IPODocument.objects.all()
        ipo_id = self.request.query_params.get('ipo_id', None)
        if ipo_id:
            queryset = queryset.filter(ipo_id=ipo_id)
        return queryset

class IPONewsViewSet(viewsets.ModelViewSet):
    queryset = IPONews.objects.all()
    serializer_class = IPONewsSerializer
    
    def get_queryset(self):
        queryset = IPONews.objects.all()
        ipo_id = self.request.query_params.get('ipo_id', None)
        if ipo_id:
            queryset = queryset.filter(ipo_id=ipo_id)
        return queryset.order_by('-published_at')
