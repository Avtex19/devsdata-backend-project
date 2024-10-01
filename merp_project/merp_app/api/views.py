from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from ..models import Event, Reservation
from .serializers import EventSerializer, ReservationSerializer
from rest_framework import generics


# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = [
        ''
    ]
    return Response(routes)


class ViewEvents(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
