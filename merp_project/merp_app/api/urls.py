from django.urls import path
from .views import getRoutes
from . import views
from .views import ViewEvents

urlpatterns = [
    path('', views.getRoutes),
    path('viewEvents/', ViewEvents.as_view())

]
