from django.urls import path
from .views import getRoutes
from . import views
from .views import ViewEvents,CreateReservation

urlpatterns = [
    path('', views.getRoutes),
    path('viewEvents/', ViewEvents.as_view()),
    path('createReservation/', CreateReservation.as_view()),

]
