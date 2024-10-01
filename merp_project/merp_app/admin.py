from django.contrib import admin
from .models import Event, Reservation


class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'start_date', 'end_date', 'thumbnail')
    list_filter = ('start_date', 'end_date')
    search_fields = ('title',)
    prepopulated_fields = {'title': ('title',)}
    ordering = ('start_date',)


class ReservationAdmin(admin.ModelAdmin):
    list_display = ('event', 'email', 'reservation_code', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('email', 'reservation_code')


admin.site.register(Event, EventAdmin)
admin.site.register(Reservation, ReservationAdmin)
