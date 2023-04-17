import json
from django.http.response import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view

from . import models
from .categories import getCertainCategory
from . import serialize

def addProduct(category_name, data):
    if(category_name == "resistor"):
        return models.Resistor.addProduct(data)
    elif(category_name == "capacitor"):
        return models.Capacitor.addProduct(data)
    elif(category_name == "transistor"):
        return models.Transistor.addProduct(data)
    elif(category_name == "inductor"):
        return models.Inductor.addProduct(data)
    elif(category_name == "diode"):
        return models.Diode.addProduct(data)
    elif(category_name == "ic"):
        return models.IC.addProduct(data)
    elif(category_name == "wire"):
        return models.Wire.addProduct(data)
    elif(category_name == "connector"):
        return models.Connector.addProduct(data)
    elif(category_name == "power"):
        return models.Power.addProduct(data)
    elif(category_name == "memory"):
        return models.Memory.addProduct(data)

@api_view(("GET", "POST"))
@csrf_exempt
def getProductsByCategory(request, category_name):
    category_name = category_name.lower()
    try:
        products = getCertainCategory(category_name) # Resistor = resistor
    except:
        return JsonResponse({"message": "Such category doesn't exist"})
    
    if(request.method == "GET"):
        serialized = serialize.getPluralSerialized(products, category_name)
        return JsonResponse(serialized, safe=False)
    elif(request.method == "POST"):
        data = json.loads(request.body)
        newProduct = addProduct(category_name, data)
        serialized = serialize.getSingularSerialized(newProduct, category_name)
        return Response(serialized)
         

@csrf_exempt
def getAllProducts(request):
    products = models.Product.objects.all()
    serialized = serialize.getPluralSerialized(products, "")
    return JsonResponse(serialized, safe=False)
    # CRUD REQUIRED