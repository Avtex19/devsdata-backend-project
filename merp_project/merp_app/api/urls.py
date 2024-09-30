from django.urls import path
from .views import getRoutes
from . import views

urlpatterns = [
    path('', views.getRoutes)
]
