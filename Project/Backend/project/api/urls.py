from django.urls import path

from . import views

urlpatterns = [
    path("categories/<str:category_name>/", views.getProductsByCategory),
    path("categories", views.getAllProducts),
]