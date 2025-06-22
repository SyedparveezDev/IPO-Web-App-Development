#!/usr/bin/env python3
"""
Script to populate the database with dummy IPO data
Run this script after setting up the Django project
"""

import os
import sys
import django
from datetime import datetime, timedelta
from decimal import Decimal

# Setup Django environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ipo_project.settings')
django.setup()

from ipo_app.models import IPO

def create_dummy_ipos():
    """Create dummy IPO data"""
    
    # Clear existing data
    IPO.objects.all().delete()
    print("Cleared existing IPO data")
    
    # Dummy IPO data
    dummy_ipos = [
        {
            'company_name': 'TechCorp Solutions Ltd',
            'price_band': '₹450-500',
            'open_date': datetime.now().date() + timedelta(days=15),
            'close_date': datetime.now().date() + timedelta(days=18),
            'issue_size': '₹2,500 Cr',
            'issue_type': 'mainboard',
            'status': 'upcoming',
            'description': 'Leading technology solutions provider specializing in enterprise software and cloud services.',
        },
        {
            'company_name': 'GreenEnergy Power Ltd',
            'price_band': '₹280-320',
            'open_date': datetime.now().date() + timedelta(days=5),
            'close_date': datetime.now().date() + timedelta(days=8),
            'issue_size': '₹1,800 Cr',
            'issue_type': 'mainboard',
            'status': 'upcoming',
            'description': 'Renewable energy company focused on solar and wind power generation across India.',
        },
        {
            'company_name': 'FinServ Digital Ltd',
            'price_band': '₹150-180',
            'open_date': datetime.now().date() - timedelta(days=2),
            'close_date': datetime.now().date() + timedelta(days=1),
            'issue_size': '₹950 Cr',
            'issue_type': 'mainboard',
            'status': 'ongoing',
            'description': 'Digital financial services platform offering banking and payment solutions.',
        },
        {
            'company_name': 'MedTech Innovations Ltd',
            'price_band': '₹220-250',
            'open_date': datetime.now().date() - timedelta(days=5),
            'close_date': datetime.now().date() - timedelta(days=2),
            'issue_size': '₹1,200 Cr',
            'issue_type': 'mainboard',
            'status': 'ongoing',
            'description': 'Healthcare technology company developing medical devices and diagnostic solutions.',
        },
        {
            'company_name': 'AutoParts Manufacturing Ltd',
            'price_band': '₹380-420',
            'open_date': datetime.now().date() - timedelta(days=30),
            'close_date': datetime.now().date() - timedelta(days=27),
            'listing_date': datetime.now().date() - timedelta(days=20),
            'issue_size': '₹1,600 Cr',
            'issue_type': 'mainboard',
            'status': 'listed',
            'ipo_price': 400.0,
            'listing_price': 456.0,
            'current_market_price': 478.50,
            'description': 'Leading manufacturer of automotive components and spare parts for domestic and international markets.',
        },
        {
            'company_name': 'FoodChain Retail Ltd',
            'price_band': '₹95-110',
            'open_date': datetime.now().date() - timedelta(days=45),
            'close_date': datetime.now().date() - timedelta(days=42),
            'listing_date': datetime.now().date() - timedelta(days=35),
            'issue_size': '₹800 Cr',
            'issue_type': 'mainboard',
            'status': 'listed',
            'ipo_price': 105.0,
            'listing_price': 98.50,
            'current_market_price': 112.75,
            'description': 'Retail chain specializing in organic and healthy food products across major Indian cities.',
        },
        {
            'company_name': 'CloudTech Services Ltd',
            'price_band': '₹650-750',
            'open_date': datetime.now().date() - timedelta(days=60),
            'close_date': datetime.now().date() - timedelta(days=57),
            'listing_date': datetime.now().date() - timedelta(days=50),
            'issue_size': '₹3,200 Cr',
            'issue_type': 'mainboard',
            'status': 'listed',
            'ipo_price': 700.0,
            'listing_price': 812.0,
            'current_market_price': 945.25,
            'description': 'Cloud infrastructure and services provider catering to enterprise clients globally.',
        },
        {
            'company_name': 'EduTech Learning Ltd',
            'price_band': '₹45-55',
            'open_date': datetime.now().date() + timedelta(days=25),
            'close_date': datetime.now().date() + timedelta(days=28),
            'issue_size': '₹350 Cr',
            'issue_type': 'sme',
            'status': 'upcoming',
            'description': 'Online education platform providing courses and certification programs.',
        },
        {
            'company_name': 'AgriTech Solutions Ltd',
            'price_band': '₹125-145',
            'open_date': datetime.now().date() + timedelta(days=35),
            'close_date': datetime.now().date() + timedelta(days=38),
            'issue_size': '₹600 Cr',
            'issue_type': 'mainboard',
            'status': 'upcoming',
            'description': 'Agricultural technology company providing smart farming solutions and equipment.',
        },
        {
            'company_name': 'LogiChain Express Ltd',
            'price_band': '₹85-95',
            'open_date': datetime.now().date() - timedelta(days=15),
            'close_date': datetime.now().date() - timedelta(days=12),
            'listing_date': datetime.now().date() - timedelta(days=5),
            'issue_size': '₹450 Cr',
            'issue_type': 'mainboard',
            'status': 'listed',
            'ipo_price': 90.0,
            'listing_price': 85.50,
            'current_market_price': 88.25,
            'description': 'Logistics and supply chain management company serving e-commerce and retail sectors.',
        },
    ]
    
    # Create IPO objects
    created_count = 0
    for ipo_data in dummy_ipos:
        try:
            ipo = IPO.objects.create(**ipo_data)
            created_count += 1
            print(f"Created IPO: {ipo.company_name} ({ipo.status})")
        except Exception as e:
            print(f"Error creating IPO {ipo_data['company_name']}: {e}")
    
    print(f"\nSuccessfully created {created_count} dummy IPOs")
    
    # Print summary
    print("\n=== IPO Summary ===")
    print(f"Upcoming IPOs: {IPO.objects.filter(status='upcoming').count()}")
    print(f"Ongoing IPOs: {IPO.objects.filter(status='ongoing').count()}")
    print(f"Listed IPOs: {IPO.objects.filter(status='listed').count()}")
    print(f"Total IPOs: {IPO.objects.count()}")

if __name__ == '__main__':
    create_dummy_ipos()
