import json

from django.core import serializers
from django.http.response import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, logout, authenticate

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from . import models
from . import serialize
from . import methods

class MyTokenObtainPairSerializer(TokenObtainPairSerializer): # gives back serialized jwt token (suppose so)
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



class RegisterUser(APIView):
    def post(self, request):
        if(request.data["pass"] != request.data["confirm"]):
            return JsonResponse({"error": "Passwords do not match"})
        
        if(not request.data["is_customer"]):
            request.data["username"] = request.data.pop("name")

        serialized = serialize.UserSerializer(data=request.data)
        if(serialized.is_valid()):
            serialized.save()
            user = models.User.objects.get(id = serialized.data["id"])
            if(request.data["is_customer"] == True):
                customer = models.CustomerUser.objects.create(username = request.data["username"],
                        email = request.data["email"], password = request.data["pass"], userid = user)
            else:
                manufacturer = models.ManufacturerUser.objects.create(name = request.data["username"],
                        email = request.data["email"], password = request.data["pass"], userid = user)
                
            return Response(serialized.data)
        
        return Response(serialized.errors, status = status.HTTP_400_BAD_REQUEST)



@api_view(["GET"])
@permission_classes([IsAuthenticatedOrReadOnly])
def getUser(request):
    if(request.user.is_customer):
        serialized = serialize.CustomerSerializer(request.user)
        return Response(serialized.data)
    serialized = serialize.ManufacturerSerializer(request.user)
    return Response(serialized.data)



@api_view(["GET", "POST"])
#@permission_classes([IsAuthenticatedOrReadOnly])
@csrf_exempt
def getProductsByCategoryID(request, category_id):
    if(request.method == "GET"):
        products = methods.getFilteredProducts(request.data, category_id)
        serialized = serialize.ProductSerializer(products, many=True)
        return Response(serialized.data)
    elif(request.method == "POST"):
        # if(request.user.is_customer):
        #     return JsonResponse({"error": "You don't have rights"})
        
        serialized = serialize.ProductSerializer(data=request.data)
        if(serialized.is_valid()):
            serialized.save()
            return Response(serialized.data)
        return Response(serialized.errors, status = status.HTTP_400_BAD_REQUEST)
    
@api_view(["GET", "PATCH", "DELETE"])
#@permission_classes([IsAuthenticatedOrReadOnly])
@csrf_exempt
def getProductByID(request, product_id):
    try:
        product = models.Product.objects.get(id = product_id)
    except models.Product.DoesNotExist as error:
        return Response({"error": str(error)}, status=status.HTTP_400_BAD_REQUEST)

    if(request.method == "GET"):
        serialized = serialize.ProductSerializer(product)
        return Response(serialized.data)
    elif(request.method == "PATCH"):
        # if(request.user.is_customer):
        #     return JsonResponse({"error": "You don't have rights"})
        
        serialized = serialize.ProductSerializer(instance=product, data=request.data, partial=True)
        if(serialized.is_valid()):
            serialized.save()
            return Response(serialized.data)
        return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)
    elif(request.method == "DELETE"):
        # if(request.user.is_customer):
        #     return JsonResponse({"error": "You don't have rights"})
        
        serialized = serialize.ProductSerializer(product)
        product.delete()
        return Response(serialized.data)



@api_view(["GET", "POST"])
@csrf_exempt
def getCategories(request):
    if(request.method == "GET"):
        categories = models.Category.objects.all()
        serialized = serialize.CategorySerializer(categories, many=True)
        return Response(serialized.data)
    
@api_view(["GET"])
@csrf_exempt
def getCategoryByID(request, category_id):
    try:
        category = models.Category.objects.get(id = category_id)
    except models.Category.DoesNotExist as error:
        return Response({"error": str(error)}, status=status.HTTP_400_BAD_REQUEST)

    if(request.method == "GET"):
        serialized = serialize.CategorySerializer(category)
        return Response(serialized.data)