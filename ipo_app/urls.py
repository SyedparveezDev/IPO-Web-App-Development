from django.urls import path
from .views import IPOListView, IPODetailView

urlpatterns = [
    path('', IPOListView.as_view(), name='ipo-list'),
    path('<int:pk>/', IPODetailView.as_view(), name='ipo-detail'),
]
