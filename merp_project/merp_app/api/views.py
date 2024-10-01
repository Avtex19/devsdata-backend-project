import uuid
from datetime import datetime

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from ..models import Event, Reservation
from .serializers import EventSerializer, ReservationSerializer
from rest_framework import generics, status


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


class CreateReservation(generics.CreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def create(self, request, *args, **kwargs):
        event_id = request.data.get('event')
        print(request.data)
        print(event_id)
        if not event_id:
            return Response({"error": "Event ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)

        reservation_code = uuid.uuid4()
        print(reservation_code)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(event=event, reservation_code=reservation_code)
            return Response({
                "message": "Registration successful.",
                "reservation_code": str(reservation_code)
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
