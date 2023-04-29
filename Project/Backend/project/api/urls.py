from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views

urlpatterns = [
    path("token/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path("user/login/", views.MyTokenObtainPairView.as_view()),
    # path("user/logout/", views.logoutUser),
    path("user/register/", views.RegisterUser.as_view()),
    # path("user/update/", views.updateUser),
    path("user/get/", views.getUser),

    path("products/categories/<int:category_id>/", views.getProductsByCategoryID),
    path("products/<int:product_id>/", views.getProductByID),

    path("categories/", views.getCategories),
    path("categories/<int:category_id>/", views.getCategoryByID),

    # path("comments/", views.getComments),
]