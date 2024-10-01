from datetime import datetime, timedelta
from ..random_sequence_generator import generate_unique_code
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..models import Event, Reservation
from .serializers import EventSerializer, ReservationSerializer, ReservationCancellationSerializer
from rest_framework import generics, status


# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = [
        'events'
        'reservation/',
        'reservation/create',
    ]
    return Response(routes)


class ViewEvents(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class CreateReservation(generics.CreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    unique_code = generate_unique_code()
    print(unique_code)

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

        reservation_code = generate_unique_code()
        print(reservation_code)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(event=event, reservation_code=reservation_code)
            return Response({
                "message": "Registration successful.",
                "reservation_code": str(reservation_code)
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetReservation(generics.RetrieveAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    lookup_field = 'reservation_code'


class CancelReservation(generics.DestroyAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationCancellationSerializer
    lookup_field = 'reservation_code'

    def destroy(self, request, *args, **kwargs):
        reservation = self.get_object()
        event = reservation.event

        event_start_datetime = datetime.combine(event.start_date, datetime.min.time())
        event_end_datetime = datetime.combine(event.end_date, datetime.min.time())

        event_duration = event_end_datetime - event_start_datetime

        if event_start_datetime <= datetime.now() + timedelta(days=2):
            return Response({"error": "You cannot cancel this reservation within two days of the event."},
                            status=status.HTTP_400_BAD_REQUEST)

        if event_duration > timedelta(days=2):
            return Response({"error": "You cannot cancel this reservation for events longer than two days."},
                            status=status.HTTP_400_BAD_REQUEST)

        reservation.delete()

        return Response({"message": "Reservation canceled successfully."}, status=status.HTTP_200_OK)
