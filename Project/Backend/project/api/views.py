import json

from django.http.response import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, logout, authenticate

# from rest_framework.response import Response
# from rest_framework.decorators import api_view

from . import models
from . import serialize
from . import forms

@csrf_exempt
def loginUser(request):
    if(request.method == "POST"):
        email = request.POST.get("username")
        password = request.POST.get("password")

        try:
            user = models.User.objects.get(email = email)
        except:
            return JsonResponse({"message": "Such user doesn't exist"})
        
        user = authenticate(request, email, password)
        if(user is not None):
            login(request, user)
            return JsonResponse({"message": "You successfully logged in"})
        return JsonResponse({"message": "Your password is incorrect"})

@csrf_exempt 
def logoutUser(request):
    if(request.method == "GET"):
        logout(request)
        return JsonResponse({"message": "You successfully logged out"})

@csrf_exempt
def registerUser(request):
    form = forms.NewUserForm()

    if(request.method == "POST"):
        form = forms.NewUserForm(request.POST)
        if(form.is_valid()):
            user = form.save(commit = False) # temp. freezing
            # checking
            user.save()
            login(request, user)
            return JsonResponse({"message": "You successfully registered"})

@csrf_exempt
def updateUser(request):
    user = request.user
    form = forms.UserForm(instance=user)

    if(request.method == "POST"):
        form = forms.UserForm(request.POST, instance=user)
        if(form.is_valid()):
            form.save()
            return JsonResponse({"message": "You successfully registered"})
        return JsonResponse({"message": "The form is not valid"})
    elif(request.method == "GET"):
        serialized = serialize.UserSerializer(user)
        return JsonResponse(serialized.data)
    



@csrf_exempt
def getProductsByCategoryID(request, category_id):
    products = models.Product.objects.filter(cat_id = category_id)
    if(len(products) == 0):
        return JsonResponse({"message": "No products of this category have been found"})

    if(request.method == "GET"):
        serialized = serialize.ProductSerializer(products, many=True)
        return JsonResponse(serialized.data, safe=False)
    elif(request.method == "POST"):
        data = json.loads(request.body)
        newProduct = models.Product.addProduct(data)
        if(newProduct is None):
            return JsonResponse({"message": "Such category doesn't exist"})
        else:
            serialized = serialize.ProductSerializer(newProduct)
            return JsonResponse(serialized.data)
       
@csrf_exempt
def getAllProducts(request):
    if(request.method == "GET"):
        products = models.Product.objects.all()
        serialized = serialize.ProductSerializer(products, many=True)
        return JsonResponse(serialized.data, safe=False)
    elif(request.method == "POST"):
        data = json.loads(request.body)
        newProduct = models.Product.addProduct(data)
        if(newProduct is None):
            return JsonResponse({"message": "Such category doesn't exist"})
        else:
            serialized = serialize.ProductSerializer(newProduct)
            return JsonResponse(serialized.data)

@csrf_exempt
def getProductByID(request, product_id):
    try:
        product = models.Product.objects.get(id = product_id)
    except:
        return JsonResponse({"message": "Such product doesn't exist"})

    if(request.method == "GET"):
        serialized = serialize.ProductSerializer(product)
        return JsonResponse(serialized.data)
    elif(request.method == "PUT"):
        data = json.loads(request.body)
        product = product.updateProduct(data)
        if(product is None):
            return JsonResponse({"message": "Such product or category doesn't exist"})
        serialized = serialize.ProductSerializer(product)
        return JsonResponse(serialized.data)
    elif(request.method == "DELETE"):
        deletedProduct = product
        product.delete()
        serialized = serialize.ProductSerializer(deletedProduct)
        return JsonResponse(serialized.data)
    


@csrf_exempt
def getCategories(request):
    if(request.method == "GET"):
        products = models.Category.objects.all()
        serialized = serialize.CategorySerializer(products, many=True)
        return JsonResponse(serialized.data, safe=False)
    elif(request.method == "POST"):
        data = json.loads(request.body)
        newCategory = models.Category.addCategory(data)
        serialized = serialize.CategorySerializer(newCategory)
        return JsonResponse(serialized.data)

@csrf_exempt
def getCategoryByID(request, category_id):
    try:
        category = models.Category.objects.get(id = category_id)
    except:
        return JsonResponse({"message": "Such category doesn't exist"})

    if(request.method == "GET"):
        serialized = serialize.CategorySerializer(category)
        return JsonResponse(serialized.data)
    elif(request.method == "PUT"):
        data = json.loads(request.body)
        category = category.updateCategory(data)
        serialized = serialize.CategorySerializer(category)
        return JsonResponse(serialized.data)
    elif(request.method == "DELETE"):
        deletedCategory = category
        category.delete()
        serialized = serialize.CategorySerializer(deletedCategory)
        return JsonResponse(serialized.data)   

