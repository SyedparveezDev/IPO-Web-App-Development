from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView
from .models import IPO
from .serializers import IPOSerializer

class IPOListAPIView(APIView):
    def get(self, request):
        ipos = IPO.objects.all()
        serializer = IPOSerializer(ipos, many=True)
        return Response(serializer.data)
