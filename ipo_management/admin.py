from django.contrib import admin
from .models import Company, IPO, IPODocument, IPONews

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ['name', 'sector', 'website', 'created_at']
    list_filter = ['sector', 'created_at']
    search_fields = ['name', 'sector']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(IPO)
class IPOAdmin(admin.ModelAdmin):
    list_display = [
        'company', 'status', 'open_date', 'close_date', 
        'price_band_display', 'issue_size_display', 'listing_gain_loss'
    ]
    list_filter = ['status', 'issue_type', 'exchange', 'open_date']
    search_fields = ['company__name']
    readonly_fields = ['created_at', 'updated_at']
    date_hierarchy = 'open_date'
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('company', 'issue_type', 'status', 'exchange')
        }),
        ('Price Information', {
            'fields': ('price_band_min', 'price_band_max', 'lot_size', 'face_value')
        }),
        ('Issue Details', {
            'fields': ('issue_size', 'fresh_issue', 'offer_for_sale', 'market_cap')
        }),
        ('Important Dates', {
            'fields': ('open_date', 'close_date', 'listing_date', 'allotment_date')
        }),
        ('Listing Information', {
            'fields': ('listing_price', 'current_market_price', 'listing_gain_loss', 'pe_ratio')
        }),
        ('Subscription Details', {
            'fields': ('retail_subscription', 'qib_subscription', 'nii_subscription')
        }),
        ('Additional Information', {
            'fields': ('registrar', 'lead_managers')
        }),
    )

@admin.register(IPODocument)
class IPODocumentAdmin(admin.ModelAdmin):
    list_display = ['ipo', 'document_type', 'title', 'uploaded_at']
    list_filter = ['document_type', 'uploaded_at']
    search_fields = ['ipo__company__name', 'title']

@admin.register(IPONews)
class IPONewsAdmin(admin.ModelAdmin):
    list_display = ['ipo', 'title', 'source', 'published_at']
    list_filter = ['source', 'published_at']
    search_fields = ['ipo__company__name', 'title', 'content']
    date_hierarchy = 'published_at'
