from . import models

def getFilteredProducts(data, category_id):
        if("filtered_by" in data and "asc" in data):
            products = queryFilteredProducts(category_id, data["filtered_by"], data["asc"])
        elif("filtered_by" in data and "asc" not in data):
            products = queryFilteredProducts(category_id, data["filtered_by"], True)
        elif("filtered_by" not in data):
            products = queryFilteredProducts(category_id, "name", True)

        return products
    
def queryFilteredProducts(category_id, filtered_by, asc):
    if(asc):
        if(filtered_by == "name"):
            products = models.Product.objects.filter(cat_id = category_id).order_by("name")
        elif(filtered_by == "manufacturer"):
            products = models.Product.objects.filter(cat_id = category_id).order_by("mfr_id")
        elif(filtered_by == "date"):
            products = models.Product.objects.filter(cat_id = category_id).order_by("date")
        elif(filtered_by == "price"):
            products = models.Product.objects.filter(cat_id = category_id).order_by("price")
    else:
        if(filtered_by == "name"):
            products = models.Product.objects.filter(cat_id = category_id).order_by("-name")
        elif(filtered_by == "manufacturer"):
            products = models.Product.objects.filter(cat_id = category_id).order_by("-mfr_id")
        elif(filtered_by == "date"):
            products = models.Product.objects.filter(cat_id = category_id).order_by("-date")
        elif(filtered_by == "price"):
            products = models.Product.objects.filter(cat_id = category_id).order_by("-price")
    return products