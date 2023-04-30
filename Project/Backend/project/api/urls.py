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
    path("user/register/", views.RegisterUser.as_view()),

    path("products/categories/<int:category_id>/", views.ManageProductsByCategoryID.as_view()),
    path("products/<int:product_id>/", views.manageProductByID),
    path("products/chosen/", views.getChosenProducts),
    path("products/existant/", views.getExistantProducts),

    path("categories/", views.getCategories),
    path("categories/<int:category_id>/", views.getCategoryByID),

    path("comments/<int:user_id>/", views.getComments),
    path("comments/<int:user_id>/<int:comment_id>/", views.manageComment),

    path("rate/<int:prod_id>/", views.rateProduct),

    path("history/", views.getHistory),
    path("purchase/", views.purchaseProducts),

    path("shippings/", views.getShippings),
    path("shippings/<int:ship_id>/", views.getShipping),
]