from rest_framework import serializers
from .models import Company, IPO, IPODocument, IPONews

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name', 'logo', 'description', 'website', 'sector', 'created_at', 'updated_at']

class IPOListSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True)
    company_logo = serializers.ImageField(source='company.logo', read_only=True)
    price_band_display = serializers.CharField(read_only=True)
    issue_size_display = serializers.CharField(read_only=True)
    days_to_open = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = IPO
        fields = [
            'id', 'company_name', 'company_logo', 'price_band_display', 'issue_size_display',
            'open_date', 'close_date', 'listing_date', 'status', 'issue_type',
            'days_to_open', 'listing_gain_loss', 'current_market_price'
        ]

class IPODetailSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    company_id = serializers.IntegerField(write_only=True)
    price_band_display = serializers.CharField(read_only=True)
    issue_size_display = serializers.CharField(read_only=True)
    is_profitable = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = IPO
        fields = '__all__'
    
    def validate(self, data):
        if data['price_band_min'] >= data['price_band_max']:
            raise serializers.ValidationError("Price band minimum must be less than maximum")
        
        if data['open_date'] >= data['close_date']:
            raise serializers.ValidationError("Open date must be before close date")
        
        if data['fresh_issue'] + data['offer_for_sale'] != data['issue_size']:
            raise serializers.ValidationError("Fresh issue + Offer for sale must equal total issue size")
        
        return data

class IPOCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = IPO
        fields = [
            'company', 'issue_type', 'status', 'exchange',
            'price_band_min', 'price_band_max', 'lot_size',
            'issue_size', 'fresh_issue', 'offer_for_sale',
            'open_date', 'close_date', 'listing_date', 'allotment_date',
            'listing_price', 'current_market_price', 'listing_gain_loss',
            'face_value', 'market_cap', 'pe_ratio',
            'retail_subscription', 'qib_subscription', 'nii_subscription',
            'registrar', 'lead_managers'
        ]

class IPODocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = IPODocument
        fields = '__all__'

class IPONewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = IPONews
        fields = '__all__'

class DashboardStatsSerializer(serializers.Serializer):
    total_ipos = serializers.IntegerField()
    upcoming_ipos = serializers.IntegerField()
    ongoing_ipos = serializers.IntegerField()
    new_listed_ipos = serializers.IntegerField()
    profitable_ipos = serializers.IntegerField()
    loss_making_ipos = serializers.IntegerField()
    total_issue_size = serializers.DecimalField(max_digits=20, decimal_places=2)
    avg_listing_gain = serializers.DecimalField(max_digits=10, decimal_places=2)
