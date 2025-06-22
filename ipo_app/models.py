from django.db import models
from django.core.validators import MinValueValidator
from django.utils import timezone

class IPO(models.Model):
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('ongoing', 'Ongoing'),
        ('listed', 'Listed'),
    ]
    
    ISSUE_TYPE_CHOICES = [
        ('mainboard', 'Mainboard'),
        ('sme', 'SME'),
    ]
    
    company_name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='logos/', null=True, blank=True)
    price_band = models.CharField(max_length=100, help_text="e.g., ₹100-120")
    open_date = models.DateField()
    close_date = models.DateField()
    issue_size = models.CharField(max_length=100, help_text="e.g., ₹500 Cr")
    issue_type = models.CharField(max_length=20, choices=ISSUE_TYPE_CHOICES, default='mainboard')
    listing_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming')
    ipo_price = models.FloatField(null=True, blank=True, validators=[MinValueValidator(0)])
    listing_price = models.FloatField(null=True, blank=True, validators=[MinValueValidator(0)])
    current_market_price = models.FloatField(null=True, blank=True, validators=[MinValueValidator(0)])
    rhp_pdf = models.FileField(upload_to='docs/', null=True, blank=True, help_text="Red Herring Prospectus")
    drhp_pdf = models.FileField(upload_to='docs/', null=True, blank=True, help_text="Draft Red Herring Prospectus")
    
    # Additional fields for better functionality
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    description = models.TextField(blank=True, help_text="Company description")
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "IPO"
        verbose_name_plural = "IPOs"
    
    @property
    def listing_gain(self):
        """Calculate listing gain percentage"""
        if self.ipo_price and self.listing_price:
            return round(((self.listing_price - self.ipo_price) / self.ipo_price) * 100, 2)
        return None
    
    @property
    def current_return(self):
        """Calculate current return percentage"""
        if self.ipo_price and self.current_market_price:
            return round(((self.current_market_price - self.ipo_price) / self.ipo_price) * 100, 2)
        return None
    
    @property
    def days_to_open(self):
        """Calculate days remaining to open"""
        if self.open_date:
            today = timezone.now().date()
            delta = self.open_date - today
            return delta.days if delta.days > 0 else 0
        return 0
    
    @property
    def is_active(self):
        """Check if IPO is currently active"""
        today = timezone.now().date()
        return self.open_date <= today <= self.close_date if self.open_date and self.close_date else False
    
    def __str__(self):
        return f"{self.company_name} - {self.status.title()}"
