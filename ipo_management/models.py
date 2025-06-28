from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from decimal import Decimal

class Company(models.Model):
    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to='company_logos/', blank=True, null=True)
    description = models.TextField(blank=True)
    website = models.URLField(blank=True)
    sector = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = "Companies"
        ordering = ['name']
    
    def __str__(self):
        return self.name

class IPO(models.Model):
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('ongoing', 'Ongoing'),
        ('new_listed', 'New Listed'),
        ('closed', 'Closed'),
        ('confirming', 'Confirming'),
    ]
    
    ISSUE_TYPE_CHOICES = [
        ('book_built', 'Book Built'),
        ('fixed_price', 'Fixed Price'),
        ('rights_issue', 'Rights Issue'),
    ]
    
    EXCHANGE_CHOICES = [
        ('nse', 'NSE'),
        ('bse', 'BSE'),
        ('both', 'NSE & BSE'),
    ]
    
    # Basic Information
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='ipos')
    issue_type = models.CharField(max_length=20, choices=ISSUE_TYPE_CHOICES, default='book_built')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming')
    exchange = models.CharField(max_length=10, choices=EXCHANGE_CHOICES, default='both')
    
    # Price Information
    price_band_min = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal('0.01'))])
    price_band_max = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(Decimal('0.01'))])
    lot_size = models.IntegerField(validators=[MinValueValidator(1)])
    
    # Issue Details
    issue_size = models.DecimalField(max_digits=15, decimal_places=2, help_text="Issue size in Crores")
    fresh_issue = models.DecimalField(max_digits=15, decimal_places=2, default=0, help_text="Fresh issue amount in Crores")
    offer_for_sale = models.DecimalField(max_digits=15, decimal_places=2, default=0, help_text="Offer for sale amount in Crores")
    
    # Important Dates
    open_date = models.DateField()
    close_date = models.DateField()
    listing_date = models.DateField(blank=True, null=True)
    allotment_date = models.DateField(blank=True, null=True)
    
    # Listing Information
    listing_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    current_market_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    listing_gain_loss = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, help_text="Percentage gain/loss")
    
    # Financial Information
    face_value = models.DecimalField(max_digits=10, decimal_places=2, default=10)
    market_cap = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True, help_text="Market cap in Crores")
    pe_ratio = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    
    # Subscription Details
    retail_subscription = models.DecimalField(max_digits=10, decimal_places=2, default=0, help_text="Times subscribed")
    qib_subscription = models.DecimalField(max_digits=10, decimal_places=2, default=0, help_text="QIB subscription times")
    nii_subscription = models.DecimalField(max_digits=10, decimal_places=2, default=0, help_text="NII subscription times")
    
    # Additional Information
    registrar = models.CharField(max_length=200, blank=True)
    lead_managers = models.TextField(blank=True, help_text="Comma separated list of lead managers")
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-open_date']
        verbose_name = "IPO"
        verbose_name_plural = "IPOs"
    
    def __str__(self):
        return f"{self.company.name} IPO"
    
    @property
    def price_band_display(self):
        return f"₹{self.price_band_min} - ₹{self.price_band_max}"
    
    @property
    def issue_size_display(self):
        return f"₹{self.issue_size} Cr."
    
    @property
    def is_profitable(self):
        if self.listing_gain_loss is not None:
            return self.listing_gain_loss > 0
        return None
    
    @property
    def days_to_open(self):
        from django.utils import timezone
        if self.open_date:
            today = timezone.now().date()
            return (self.open_date - today).days
        return None

class IPODocument(models.Model):
    DOCUMENT_TYPES = [
        ('prospectus', 'Prospectus'),
        ('rrhp', 'Red Herring Prospectus'),
        ('application_form', 'Application Form'),
        ('price_band', 'Price Band Announcement'),
        ('allotment', 'Allotment Details'),
        ('other', 'Other'),
    ]
    
    ipo = models.ForeignKey(IPO, on_delete=models.CASCADE, related_name='documents')
    document_type = models.CharField(max_length=20, choices=DOCUMENT_TYPES)
    title = models.CharField(max_length=200)
    file = models.FileField(upload_to='ipo_documents/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-uploaded_at']
    
    def __str__(self):
        return f"{self.ipo.company.name} - {self.title}"

class IPONews(models.Model):
    ipo = models.ForeignKey(IPO, on_delete=models.CASCADE, related_name='news')
    title = models.CharField(max_length=300)
    content = models.TextField()
    source = models.CharField(max_length=100, blank=True)
    published_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-published_at']
        verbose_name = "IPO News"
        verbose_name_plural = "IPO News"
    
    def __str__(self):
        return f"{self.ipo.company.name} - {self.title[:50]}"
