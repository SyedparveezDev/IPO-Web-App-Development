from rest_framework.views import APIView
from rest_framework.response import Response
from .models import IPO
from .serializers import IPOSerializer
from rest_framework.generics import RetrieveAPIView

class IPOListAPIView(APIView):
    def get(self, request):
        ipos = IPO.objects.all()
        serializer = IPOSerializer(ipos, many=True)
        return Response(serializer.data)

class IPODetailAPIView(RetrieveAPIView):
    queryset = IPO.objects.all()
    serializer_class = IPOSerializer