from rest_framework import serializers
from ..models import Event, Reservation


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['event', 'email','reservation_code', 'created_at', 'email']
        read_only_fields = ['reservation_code','created_at']
