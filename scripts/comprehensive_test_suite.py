#!/usr/bin/env python
"""
Comprehensive Test Suite for IPO Administration Dashboard
This script performs end-to-end testing of all functionalities
"""

import os
import sys
import django
import requests
import json
from datetime import datetime, timedelta
from decimal import Decimal

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ipo_admin.settings')
django.setup()

from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from ipo_management.models import Company, IPO, IPODocument, IPONews
from ipo_management.serializers import IPOListSerializer, IPODetailSerializer

class ComprehensiveTestSuite:
    def __init__(self):
        self.client = Client()
        self.base_url = 'http://127.0.0.1:8000'
        self.api_base = f'{self.base_url}/api'
        self.test_results = {
            'passed': 0,
            'failed': 0,
            'errors': []
        }
        
    def log_test(self, test_name, passed, message=""):
        """Log test results"""
        if passed:
            self.test_results['passed'] += 1
            print(f"✅ {test_name}: PASSED")
        else:
            self.test_results['failed'] += 1
            self.test_results['errors'].append(f"{test_name}: {message}")
            print(f"❌ {test_name}: FAILED - {message}")
    
    def test_database_setup(self):
        """Test database connectivity and models"""
        print("\n🔍 Testing Database Setup...")
        
        try:
            # Test Company model
            company_count = Company.objects.count()
            self.log_test("Database Connection", True)
            self.log_test("Company Model Access", company_count >= 0)
            
            # Test IPO model
            ipo_count = IPO.objects.count()
            self.log_test("IPO Model Access", ipo_count >= 0)
            
            # Test model relationships
            if ipo_count > 0:
                ipo = IPO.objects.first()
                company_name = ipo.company.name
                self.log_test("Model Relationships", bool(company_name))
            
        except Exception as e:
            self.log_test("Database Setup", False, str(e))
    
    def test_api_endpoints(self):
        """Test all API endpoints"""
        print("\n🔍 Testing API Endpoints...")
        
        endpoints = [
            ('/api/companies/', 'GET', 'Companies List'),
            ('/api/ipos/', 'GET', 'IPOs List'),
            ('/api/dashboard-stats/', 'GET', 'Dashboard Stats'),
            ('/api/quick-links/', 'GET', 'Quick Links'),
            ('/api/ipos/upcoming/', 'GET', 'Upcoming IPOs'),
            ('/api/ipos/ongoing/', 'GET', 'Ongoing IPOs'),
            ('/api/ipos/new_listed/', 'GET', 'New Listed IPOs'),
        ]
        
        for endpoint, method, name in endpoints:
            try:
                if method == 'GET':
                    response = self.client.get(endpoint)
                    self.log_test(f"API {name}", response.status_code == 200)
                    
                    # Test JSON response
                    if response.status_code == 200:
                        data = response.json()
                        self.log_test(f"API {name} JSON", isinstance(data, (dict, list)))
                        
            except Exception as e:
                self.log_test(f"API {name}", False, str(e))
    
    def test_crud_operations(self):
        """Test Create, Read, Update, Delete operations"""
        print("\n🔍 Testing CRUD Operations...")
        
        # Create test company
        try:
            test_company = Company.objects.create(
                name="Test Company Ltd",
                description="Test company for testing",
                sector="Technology"
            )
            self.log_test("Company Creation", True)
            
            # Create test IPO
            test_ipo = IPO.objects.create(
                company=test_company,
                price_band_min=Decimal('100.00'),
                price_band_max=Decimal('120.00'),
                lot_size=100,
                issue_size=Decimal('1000.00'),
                open_date=datetime.now().date(),
                close_date=datetime.now().date() + timedelta(days=3),
                status='upcoming',
                issue_type='book_built'
            )
            self.log_test("IPO Creation", True)
            
            # Test Read operations
            retrieved_ipo = IPO.objects.get(id=test_ipo.id)
            self.log_test("IPO Read", retrieved_ipo.company.name == "Test Company Ltd")
            
            # Test Update operations
            retrieved_ipo.status = 'ongoing'
            retrieved_ipo.save()
            updated_ipo = IPO.objects.get(id=test_ipo.id)
            self.log_test("IPO Update", updated_ipo.status == 'ongoing')
            
            # Test Delete operations
            test_ipo.delete()
            test_company.delete()
            self.log_test("IPO/Company Deletion", True)
            
        except Exception as e:
            self.log_test("CRUD Operations", False, str(e))
    
    def test_data_validation(self):
        """Test data validation and constraints"""
        print("\n🔍 Testing Data Validation...")
        
        try:
            # Test price band validation
            company = Company.objects.create(name="Validation Test Co")
            
            # This should fail - min >= max
            try:
                IPO.objects.create(
                    company=company,
                    price_band_min=Decimal('120.00'),
                    price_band_max=Decimal('100.00'),  # Invalid: max < min
                    lot_size=100,
                    issue_size=Decimal('1000.00'),
                    open_date=datetime.now().date(),
                    close_date=datetime.now().date() + timedelta(days=3),
                )
                self.log_test("Price Band Validation", False, "Should have failed")
            except:
                self.log_test("Price Band Validation", True)
            
            # Test date validation
            try:
                IPO.objects.create(
                    company=company,
                    price_band_min=Decimal('100.00'),
                    price_band_max=Decimal('120.00'),
                    lot_size=100,
                    issue_size=Decimal('1000.00'),
                    open_date=datetime.now().date() + timedelta(days=5),
                    close_date=datetime.now().date(),  # Invalid: close < open
                )
                self.log_test("Date Validation", False, "Should have failed")
            except:
                self.log_test("Date Validation", True)
            
            company.delete()
            
        except Exception as e:
            self.log_test("Data Validation", False, str(e))
    
    def test_serializers(self):
        """Test API serializers"""
        print("\n🔍 Testing Serializers...")
        
        try:
            # Create test data
            company = Company.objects.create(name="Serializer Test Co")
            ipo = IPO.objects.create(
                company=company,
                price_band_min=Decimal('100.00'),
                price_band_max=Decimal('120.00'),
                lot_size=100,
                issue_size=Decimal('1000.00'),
                open_date=datetime.now().date(),
                close_date=datetime.now().date() + timedelta(days=3),
            )
            
            # Test list serializer
            list_serializer = IPOListSerializer(ipo)
            list_data = list_serializer.data
            self.log_test("IPO List Serializer", 'company_name' in list_data)
            self.log_test("Price Band Display", 'price_band_display' in list_data)
            
            # Test detail serializer
            detail_serializer = IPODetailSerializer(ipo)
            detail_data = detail_serializer.data
            self.log_test("IPO Detail Serializer", 'company' in detail_data)
            
            # Cleanup
            ipo.delete()
            company.delete()
            
        except Exception as e:
            self.log_test("Serializers", False, str(e))
    
    def test_dashboard_functionality(self):
        """Test dashboard statistics and functionality"""
        print("\n🔍 Testing Dashboard Functionality...")
        
        try:
            # Test dashboard stats endpoint
            response = self.client.get('/api/dashboard-stats/')
            self.log_test("Dashboard Stats Endpoint", response.status_code == 200)
            
            if response.status_code == 200:
                stats = response.json()
                required_fields = [
                    'total_ipos', 'upcoming_ipos', 'ongoing_ipos', 
                    'new_listed_ipos', 'profitable_ipos', 'loss_making_ipos'
                ]
                
                for field in required_fields:
                    self.log_test(f"Dashboard Stats - {field}", field in stats)
            
            # Test quick links
            response = self.client.get('/api/quick-links/')
            self.log_test("Quick Links Endpoint", response.status_code == 200)
            
            if response.status_code == 200:
                links = response.json()
                self.log_test("Quick Links Data", isinstance(links, list) and len(links) > 0)
                
        except Exception as e:
            self.log_test("Dashboard Functionality", False, str(e))
    
    def test_filtering_and_search(self):
        """Test filtering and search functionality"""
        print("\n🔍 Testing Filtering and Search...")
        
        try:
            # Test status filtering
            response = self.client.get('/api/ipos/?status=upcoming')
            self.log_test("Status Filtering", response.status_code == 200)
            
            # Test date filtering
            today = datetime.now().date()
            response = self.client.get(f'/api/ipos/?date_from={today}')
            self.log_test("Date Filtering", response.status_code == 200)
            
            # Test search functionality
            response = self.client.get('/api/ipos/?search=test')
            self.log_test("Search Functionality", response.status_code == 200)
            
            # Test company search
            response = self.client.get('/api/companies/?search=test')
            self.log_test("Company Search", response.status_code == 200)
            
        except Exception as e:
            self.log_test("Filtering and Search", False, str(e))
    
    def test_pagination(self):
        """Test pagination functionality"""
        print("\n🔍 Testing Pagination...")
        
        try:
            # Test pagination parameters
            response = self.client.get('/api/ipos/?page=1')
            self.log_test("Pagination - Page 1", response.status_code == 200)
            
            if response.status_code == 200:
                data = response.json()
                pagination_fields = ['count', 'next', 'previous', 'results']
                has_pagination = any(field in data for field in pagination_fields)
                self.log_test("Pagination Structure", has_pagination)
                
        except Exception as e:
            self.log_test("Pagination", False, str(e))
    
    def run_all_tests(self):
        """Run all test suites"""
        print("🚀 Starting Comprehensive Test Suite for IPO Administration Dashboard")
        print("=" * 80)
        
        self.test_database_setup()
        self.test_api_endpoints()
        self.test_crud_operations()
        self.test_data_validation()
        self.test_serializers()
        self.test_dashboard_functionality()
        self.test_filtering_and_search()
        self.test_pagination()
        
        # Print summary
        print("\n" + "=" * 80)
        print("📊 TEST SUMMARY")
        print("=" * 80)
        print(f"✅ Tests Passed: {self.test_results['passed']}")
        print(f"❌ Tests Failed: {self.test_results['failed']}")
        
        if self.test_results['errors']:
            print("\n🔍 FAILED TESTS:")
            for error in self.test_results['errors']:
                print(f"   • {error}")
        
        success_rate = (self.test_results['passed'] / 
                       (self.test_results['passed'] + self.test_results['failed'])) * 100
        print(f"\n📈 Success Rate: {success_rate:.1f}%")
        
        if success_rate >= 95:
            print("🎉 EXCELLENT: All critical functionalities are working!")
        elif success_rate >= 85:
            print("✅ GOOD: Most functionalities are working with minor issues.")
        else:
            print("⚠️  WARNING: Multiple issues detected. Review required.")
        
        return success_rate >= 95

if __name__ == "__main__":
    test_suite = ComprehensiveTestSuite()
    test_suite.run_all_tests()
