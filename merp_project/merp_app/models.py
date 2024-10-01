from django.db import models
from .random_sequence_generator import generate_unique_code
from django.utils import timezone


# Create your models here.
class Event(models.Model):
    title = models.CharField(max_length=250)
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField(default=timezone.now)
    thumbnail = models.ImageField(upload_to='thumbnails/', blank=True, null=True)

    def __str__(self):
        return self.title


class Reservation(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='reservations')
    email = models.EmailField()
    reservation_code = models.CharField(default=generate_unique_code(), max_length=6, editable=False, unique=True)
    status = models.CharField(max_length=50, default='active')
    created_at = models.DateTimeField(auto_now_add=True)
