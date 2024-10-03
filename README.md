# MagicEvents - Event Registration Platform

**MagicEvents** is an event registration platform designed to allow customers to view events, register, and manage their reservations automatically. The platform enables customers to easily register for events, receive reservation codes, and manage their bookings with the ability to cancel reservations under specific conditions.

## Project Overview

The project is divided into two parts:

1. **Backend** - A Django REST API that handles all event-related operations, such as viewing events, creating reservations, and managing reservations.
2. **Frontend** - A React application that allows users to interact with the backend via the API, view events, register for them, and cancel registrations.

## Features

- **Event Registration**: Customers can view events and register for them.
- **Reservation Management**: Customers receive a reservation code to manage their bookings.
- **Booking Cancellation**: Customers can cancel bookings for events that last no longer than two days and not later than two days before the start of the event.

## Backend Setup Instructions

To run the backend, follow these steps:

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
pip install django
pip install djangorestframework
pip install django-cors-headers
pip install pillow
pip install drf-yasg
# Run migrations
python manage.py makemigrations
python manage.py migrate
# Run the Django development server
python manage.py runserver
```
The backend will be available at http://127.0.0.1:8000/


Frontend Setup Instructions

To run the frontend, follow these steps:
```bash
cd merp_project/front-end
npm install
npm run dev
```
The frontend will be available at http://localhost:5173/

