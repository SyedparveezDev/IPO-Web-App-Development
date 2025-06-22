from django.contrib import admin
from django.utils.html import format_html
from .models import IPO

@admin.register(IPO)
class IPOAdmin(admin.ModelAdmin):
    list_display = [
        'company_name', 'status', 'price_band', 'open_date', 
        'close_date', 'issue_size', 'logo_preview', 'created_at'
    ]
    list_filter = ['status', 'issue_type', 'open_date', 'created_at']
    search_fields = ['company_name', 'description']
    readonly_fields = ['listing_gain', 'current_return', 'days_to_open', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('company_name', 'logo', 'description', 'status')
        }),
        ('IPO Details', {
            'fields': ('price_band', 'open_date', 'close_date', 'issue_size', 'issue_type', 'listing_date')
        }),
        ('Pricing Information', {
            'fields': ('ipo_price', 'listing_price', 'current_market_price')
        }),
        ('Documents', {
            'fields': ('rhp_pdf', 'drhp_pdf')
        }),
        ('Calculated Fields', {
            'fields': ('listing_gain', 'current_return', 'days_to_open'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def logo_preview(self, obj):
        if obj.logo:
            return format_html(
                '<img src="{}" width="50" height="50" style="border-radius: 5px;" />',
                obj.logo.url
            )
        return "No Logo"
    logo_preview.short_description = "Logo"
    
    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)

# Customize admin site
admin.site.site_header = "Bluestock IPO Admin"
admin.site.site_title = "IPO Management"
admin.site.index_title = "Welcome to IPO Management Portal"
