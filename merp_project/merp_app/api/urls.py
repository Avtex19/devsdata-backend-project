from django.urls import path
from . import views
from .views import ViewEvents,CreateReservation,GetReservation,CancelReservation


urlpatterns = [
    path('', views.getRoutes),
    path('events/', ViewEvents.as_view()),
    path('reservation/create', CreateReservation.as_view()),
    path('reservation/<str:reservation_code>/', GetReservation.as_view(), name='get_reservation'),
    path('reservation/cancel/<str:reservation_code>/', CancelReservation.as_view())

]
