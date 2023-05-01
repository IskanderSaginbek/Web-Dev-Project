import json

from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser
from rest_framework.pagination import PageNumberPagination

from . import models
from . import serialize
from . import methods

@api_view(["GET"])
@permission_classes([IsAdminUser])
def getAllUsers(request):
    users = models.User.objects.all()
    serialized = serialize.UserSerializer(users, many=True)
    return Response(serialized.data)

@api_view(["GET"])
def getManufacturers(request):
    mfrs = models.ManufacturerUser.objects.all()
    serialized = serialize.ManufacturerSerializer(mfrs, many=True)
    return Response(serialized.data)



@api_view(["GET", "PATCH"])
@permission_classes([IsAuthenticatedOrReadOnly])
@csrf_exempt
def manageProfile(request): # desired User's user_id is required, this is 
    data = json.loads(request.body)
    user_id = data["user_id"]
    loggedUser = request.user
    desiredUser = models.User.objects.get(id = user_id)

    if(request.method == "GET"):
        if(desiredUser.is_customer):
            child = desiredUser.customer
            serialized = serialize.CustomerSerializer(child)
        else:
            child = desiredUser.manufacturer
            serialized = serialize.ManufacturerSerializer(child)
        
        return Response(serialized.data)
    
    elif(request.method == "PATCH"):
        if(user_id == loggedUser.id):
            if(loggedUser.is_customer):
                serialized = serialize.CustomerSerializer(instance=loggedUser.customer, data=request.data, partial=True)
                if(serialized.is_valid()):
                    serialized.save()
                    return Response(serialized.data)
                return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)
            
            else:
                serialized = serialize.ManufacturerSerializer(instance=loggedUser.manufacturer, data=request.data, partial=True)
                if(serialized.is_valid()):
                    serialized.save()
                    return Response(serialized.data)
                return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)
            
        else:
            return Response({"error": "You don't have rights"}, status=status.HTTP_403_FORBIDDEN)



class ManageProductsByCategoryID(generics.GenericAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serialize.ProductSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, category_id):
        if(request.method == "GET"):
            queryset= methods.getFilteredProducts(request.data, category_id)
            paginator = PageNumberPagination()
            paginator.page_size = 10
            p = paginator.paginate_queryset(queryset=queryset, request=request)
            serialized = serialize.ProductSerializer(p, many=True)
            data = serialized.data
            return paginator.get_paginated_response(data)
        
    def post(self, request):
        if(request.method == "POST"):
            if(request.user.is_customer):
                return JsonResponse({"error": "You don't have rights"})
        
            serialized = serialize.ProductSerializer(data=request.data)
            if(serialized.is_valid()):
                serialized.save()
                return Response(serialized.data)
            return Response(serialized.errors, status = status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@csrf_exempt
def searchProducts(request):
    data = json.loads(request.body)
    searchWord = data["search"]
    products = models.Product.objects.filter(name__icontains = searchWord)
    serialized = serialize.ProductSerializer(products, many=True)
    return Response(serialized.data)


@api_view(["GET"])
@csrf_exempt
def getExistantProducts(request): # get products, where isStock is true
    products = models.Product.objects.filter(amount__gt = 0)
    serialized = serialize.ProductSerializer(products, many=True)
    return Response(serialized.data)


@api_view(["GET", "PATCH", "DELETE"])
@permission_classes([IsAuthenticatedOrReadOnly])
@csrf_exempt
def manageProductByID(request, product_id):
    try:
        product = models.Product.objects.get(id = product_id)
    except models.Product.DoesNotExist as error:
        return Response({"error": str(error)}, status=status.HTTP_404_NOT_FOUND)

    if(request.method == "GET"):
        serialized = serialize.ProductSerializer(product)
        return Response(serialized.data)
    
    elif(request.method == "PATCH"):
        if(request.user.is_customer):
            return Response({"error": "You don't have rights to do this"}, status=status.HTTP_403_FORBIDDEN)
        
        serialized = serialize.ProductSerializer(instance=product, data=request.data, partial=True)
        if(serialized.is_valid()):
            serialized.save()
            return Response(serialized.data)
        return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif(request.method == "DELETE"):
        if(request.user.is_customer):
            return Response({"error": "You don't have rights to do this"}, status=status.HTTP_403_FORBIDDEN)
        
        serialized = serialize.ProductSerializer(product)
        product.delete()
        return Response(serialized.data)



@api_view(["GET"])
@csrf_exempt
def getCategories(request):
    try:
        categories = models.Category.objects.all()
    except models.Category.DoesNotExist as error:
        return Response({"error": str(error)}, status=status.HTTP_404_NOT_FOUND)
    
    if(request.method == "GET"):
        serialized = serialize.CategorySerializer(categories, many=True)
        return Response(serialized.data)
    

@api_view(["GET"])
@csrf_exempt
def getCategoryByID(request, category_id):
    try:
        category = models.Category.objects.get(id = category_id)
    except models.Category.DoesNotExist as error:
        return Response({"error": str(error)}, status=status.HTTP_404_NOT_FOUND)

    if(request.method == "GET"):
        serialized = serialize.CategorySerializer(category)
        return Response(serialized.data)
    


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@csrf_exempt
def getHistory(request): # request.user.id == user_id ?
    if(request.method == "GET"):
        userHistory = models.History.objects.filter(user_id = request.user.id)
        serialized = serialize.HistorySerializer(userHistory, many=True)
        return Response(serialized.data)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
@csrf_exempt
def purchaseProducts(request): # array items with objects; each object has prod_id and quantity
    if(request.method == "PATCH"):
        data = json.loads(request.body)

        if("items" not in data): # empty body
            return Response({"error": "No items were sent"}, status=status.HTTP_400_BAD_REQUEST)
        
        items = data["items"] # get array of items
        
        if(len(items) == 0): # empty items array
            return Response({"error": "The cart is empty"}, status=status.HTTP_400_BAD_REQUEST)
        
        messages = []
        for item in items:
            product = models.Product.objects.get(id = item["id"])
            operationResult = product.purchaseProduct(item, request.user, data["ship_id"])
            if(not operationResult):
                messages.append(f'Product #{product.id} doesnt have such amount')
            else:
                messages.append(f'Product #{product.id} has been successfully updated')

        return JsonResponse(messages, safe=False)



@api_view(["GET"])
@csrf_exempt
def getShippings(request):
    try:
        shippings = models.Shipping.objects.all()
    except models.Shipping.DoesNotExist as error:
        return Response({"error": str(error)}, status=status.HTTP_404_NOT_FOUND)
    
    if(request.method == "GET"):
        serialized = serialize.ShippingSerializer(shippings, many=True)
        return Response(serialized.data)
    

@api_view(["GET"])
@csrf_exempt
def getShipping(request, ship_id):
    try:
        shipping = models.Shipping.objects.get(id = ship_id)
    except models.Shipping.DoesNotExist as error:
        return Response({"error": str(error)}, status=status.HTTP_404_NOT_FOUND)
    
    if(request.method == "GET"):
        serialized = serialize.ShippingSerializer(shipping)
        return Response(serialized.data)
    


@api_view(["GET"])
@permission_classes([IsAuthenticatedOrReadOnly])
@csrf_exempt
def getComments(request, user_id):
    comments = models.Comment.objects.filter(user_id = user_id)
    if(request.method == "GET"):    
        serialized = serialize.CommentSerializer(comments, many=True)
        return Response(serialized.data)
    
    elif(request.method == "POST"):
        serialized = serialize.CommentSerializer(data=request.data)
        if(serialized.is_valid()):
            serialized.save()
            return Response(serialized.data)
        return Response(serialized.errors, status = status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PATCH", "DELETE"])
@permission_classes([IsAuthenticatedOrReadOnly])
@csrf_exempt
def manageComment(request, comment_id):
    try:
        comment = models.Comment.objects.get(id = comment_id)
    except models.Comment.DoesNotExist as error:
        return Response({"error": str(error)}, status=status.HTTP_404_NOT_FOUND)

    if(request.method == "GET"):
        serialized = serialize.CommentSerializer(comment)

        return Response(serialized.data)
    elif(request.method == "PATCH"):
        if(comment.user_id != request.user.id):
            return Response({"error": "You don't have rights to do this"}, status=status.HTTP_403_FORBIDDEN)
        
        serialized = serialize.CommentSerializer(instance=comment, data=request.data, partial=True)
        if(serialized.is_valid()):
            serialized.save()
            return Response(serialized.data)
        return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif(request.method == "DELETE"):
        if(comment.user_id != request.user.id):
            return Response({"error": "You don't have rights to do this"}, status=status.HTTP_403_FORBIDDEN)
        serialized = serialize.CommentSerializer(comment)
        comment.delete()
        return Response(serialized.data)
    


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
@csrf_exempt
def rateProduct(request, prod_id):
    """
        What if a user has already rated the product? We do not track it, so if he decides to
        make another rate, it would be counted as new rating, not updated one.
        Our models User and Product do not have anything to track this.

        Also the rating method is probably incorrect, but we have what we have
    """

    data = json.loads(request.body)
    product = models.Product.objects.get(id = prod_id)
    oldRating = product.rating
    usersRating = data["rating"]

    newRating = round(((oldRating / 5) * usersRating), 1)

    product.ratings_num += 1
    product.rating = newRating
    product.save()

    serialized = serialize.ProductSerializer(product)
    return Response(serialized.data)



@api_view(["GET"])
@csrf_exempt
def getChosenProducts(request):
    if(request.user.is_anonymous):
        products = models.Product.objects.all().order_by("-date")[:5]
    else:
        if(not request.user.is_customer): # mfr doesnt have any prefered categories
            products = models.Product.objects.all().order_by("-date")[:5]
        else:
            customer = models.CustomerUser.objects.get(userid = request.user.id)
            if(customer.pref_cat is not None): # pref_cat exists
                products = models.Product.objects.filter(cat_id = customer.pref_cat)
            else:
                products = models.Product.objects.all().order_by("-date")[:5]
    
    serialized = serialize.ProductSerializer(products, many=True)
    return Response(serialized.data)