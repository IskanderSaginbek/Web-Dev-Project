from django.urls import path

from . import views

urlpatterns = [
    path("products/categories/<int:category_id>/", views.getProductsByCategoryID),
    path("products/<int:product_id>/", views.getProductByID),
    path("products/", views.getAllProducts),

    path("categories/", views.getCategories),
    path("categories/<int:category_id>/", views.getCategoryByID),
]