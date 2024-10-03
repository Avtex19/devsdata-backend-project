from rest_framework import serializers
from ..models import Event, Reservation


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class CreateReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['event', 'reservation_code', 'created_at', 'email']
        read_only_fields = ['reservation_code', 'created_at']

    def validate(self, data):
        if Reservation.objects.filter(event=data['event'], email=data['email']).exists():
            raise serializers.ValidationError("A reservation with the same event and email already exists.")
        return data

class ReservationSerializer(serializers.ModelSerializer):
    event = EventSerializer()
    class Meta:
        model = Reservation
        fields = ['event', 'reservation_code', 'created_at', 'email']
        read_only_fields = ['reservation_code', 'created_at']


class ReservationCancellationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['status']
