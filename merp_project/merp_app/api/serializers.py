from rest_framework import serializers
from ..models import Event, Reservation


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['event', 'reservation_code', 'status', 'created_ate']
        read_only_fields = ['reservation_code']
