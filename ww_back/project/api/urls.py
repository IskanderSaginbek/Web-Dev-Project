from django.urls import path, include, re_path

from rest_framework.routers import DefaultRouter

from . import views



urlpatterns = [

    # DJOSER & JWT AUTH

    # REGISTRATION:
    # http://127.0.0.1:8000/api/auth/users/       Send here POST with email, username, password, is_customer; otherwise not valid

    # LOGIN:
    # http://127.0.0.1:8000/api/auth/jwt/create/     Send here POST with email and password; JWT token is returned in exchange

    # REFRESH:
    # http://127.0.0.1:8000/api/auth/jwt/refresh/  Send here POST with email and password; token is destroyed in exchange

    # CHANGE PASSWORD:
    # http://127.0.0.1:8000/api/auth/users/set_password/ Send here POST with "new_password" and "current_password", with auth token; it changes current user

    # IN ORDER TO ACCESS PROTECTED VIEWS (THOSE WHICH REQUIRE AUTHORIZED USER), PUT BEARER JWTTOKEN IN HEADERS
    
    
    path("auth/", include("djoser.urls")), # base, controls users in django
    path("auth/", include("djoser.urls.jwt")), # controls jwt tokens

    path("users/", views.getAllUsers),
    path("user/", views.manageProfile),
    path("user/<str:email>/", views.manageProfile),

    path("mfrs/", views.getManufacturers),
    path("mfrs/<int:id>/", views.getManufacturerById),
    path("customers/", views.getCustomers),

    path("products/search/<str:searchWord>/<int:cat>/<str:orderby>/<int:order>", views.searchProducts),
    path("products/categories/<int:category_id>/", views.ManageProductsByCategoryID.as_view()),
    path("products/<int:product_id>/", views.manageProductByID),
    path("products/chosen/", views.getChosenProducts),
    path("products/existant/", views.getExistantProducts),

    path("categories/", views.getCategories),
    path("categories/<int:category_id>/", views.getCategoryByID),

    path("comments/<int:prod_id>/", views.getComments),
    path("comment/", views.postComment),
    path("comments/manage/<int:comment_id>/", views.manageComment),

    path("rate/<int:prod_id>/", views.rateProduct),

    path("history/<int:user_id>", views.getHistory),
    path("purchase/", views.purchaseProducts),

    path("shippings/", views.getShippings),
    path("shippings/<int:ship_id>/", views.getShipping),
]