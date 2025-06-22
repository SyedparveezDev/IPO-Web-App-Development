from rest_framework import serializers
from .models import IPO

class IPOListSerializer(serializers.ModelSerializer):
    """Serializer for IPO list view"""
    listing_gain = serializers.ReadOnlyField()
    current_return = serializers.ReadOnlyField()
    days_to_open = serializers.ReadOnlyField()
    is_active = serializers.ReadOnlyField()
    
    class Meta:
        model = IPO
        fields = [
            'id', 'company_name', 'logo', 'price_band', 'open_date', 
            'close_date', 'issue_size', 'issue_type', 'listing_date', 
            'status', 'ipo_price', 'listing_price', 'current_market_price',
            'listing_gain', 'current_return', 'days_to_open', 'is_active'
        ]

class IPODetailSerializer(serializers.ModelSerializer):
    """Serializer for IPO detail view"""
    listing_gain = serializers.ReadOnlyField()
    current_return = serializers.ReadOnlyField()
    days_to_open = serializers.ReadOnlyField()
    is_active = serializers.ReadOnlyField()
    
    class Meta:
        model = IPO
        fields = '__all__'

class IPOCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer for creating and updating IPOs"""
    
    class Meta:
        model = IPO
        fields = '__all__'
    
    def validate(self, data):
        """Custom validation"""
        if data.get('open_date') and data.get('close_date'):
            if data['open_date'] > data['close_date']:
                raise serializers.ValidationError("Open date cannot be after close date")
        
        if data.get('ipo_price') and data.get('listing_price'):
            if data['ipo_price'] < 0 or data['listing_price'] < 0:
                raise serializers.ValidationError("Prices cannot be negative")
        
        return data
