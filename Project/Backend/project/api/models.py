from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    password = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    is_manufacturer = models.BooleanField(default=True)
    is_customer = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "password"]

class CustomerUser(models.Model):
    userid = models.OneToOneField(User, on_delete=models.CASCADE)
    password = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    username = models.CharField(max_length=255, unique=True)
    phone = models.CharField(max_length=255, null=True, blank=True)
    card_num = models.CharField(max_length=255,  null=True, blank=True)
    exp_date = models.DateTimeField(null=True, blank=True)
    ver_num = models.CharField(max_length=255, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    image = models.CharField(max_length=255, blank=True, null=True)
    allow_news = models.BooleanField(default=True, blank=True)
    pref_cat = models.ForeignKey("Category", on_delete=models.SET_NULL, null=True, blank=True, related_name="prefered_user")
    pref_price = models.FloatField(blank=True, null=True)
    only_available = models.BooleanField(blank=True, null=True)

class ManufacturerUser(models.Model):
    userid = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    descr = models.CharField(max_length=255)
    card_num = models.CharField(max_length=255, default="0000-0000-0000-0000", blank=True)
    exp_date = models.DateTimeField(null=True, blank=True)
    ver_num = models.CharField(max_length=255, default="000", blank=True)
    address = models.CharField(max_length=255)
    image = models.CharField(max_length=255, blank=True, null=True)
    allow_news = models.BooleanField(default=True, blank=True)



class Product(models.Model):
    images = models.TextField(blank=True, null=True)
    datasheet = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    descr = models.TextField()
    descr_short = models.CharField(max_length=255)
    sub_cat = models.CharField(max_length=255)
    price = models.FloatField()
    amount = models.IntegerField()
    is_available = models.BooleanField()
    mfr_id = models.ForeignKey(ManufacturerUser, on_delete=models.CASCADE, related_name="manufactured_products")
    rating = models.FloatField(default=0, blank=True, null=True)
    cat_id = models.ForeignKey("Category", on_delete=models.CASCADE, related_name="manufactured_categories")

    class Meta:
        ordering = ["-price", "-amount"]

    def __str__(self):
        return self.name
    
    def addProduct(data):
        try:
            referencedCategory = Category.objects.get(id = data.get("cat_id"))
        except Category.DoesNotExist:
            return None
        # referencedManufacturer = Manufacturer.objects.get("id" == data.get("mfr_id"))
        if(referencedCategory is not None):
            # is_available_toBool = True if data.get("is_available") == 1 else False  
            newProduct = Product.objects.create(
                images = data.get("imgs"),
                datasheet = data.get("ds"),
                name = data.get("name"),
                descr = data.get("descr"),
                descr_short = data.get("descr_short"),
                sub_cat = data.get("sub_cat"),
                price = data.get("price"),
                amount = data.get("amount"),
                is_available = data.get("is_available"),
                cat_id = referencedCategory,
                rating = data.get("rating"),
                # mfr_id = referencedManufacturer
            )
            return newProduct
        return {}
    
    def updateProduct(self, data):
        try:
            newCategory = Category.objects.get(id = data.get("cat_id"))
        except:
            return None

        self.name = data.get("name")
        self.descr = data.get("descr")
        self.descr_short = data.get("descr_short")
        self.images = data.get("imgs")
        self.ds = data.get("ds")
        self.sub_cat = data.get("sub_cat")
        self.price = data.get("price")
        self.amount = data.get("amount")
        self.is_available = data.get("is_available")
        self.rating = data.get("rating")
        self.cat_id = newCategory
        self.save()
        return self

class Category(models.Model):
    name = models.CharField(max_length=255)
    descr = models.TextField()
    image = models.CharField(max_length=255, blank=True)
    descr_short = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name
    
    def addCategory(data):
        newCategory = Category.objects.create(
            name = data.get("name"),
            descr = data.get("descr"),
            image = data.get("image"),
            descr_short = data.get("descr_short"),
        )
        return newCategory
    
    def updateCategory(self, data):
        self.name = data.get("name")
        self.descr = data.get("descr")
        self.descr_short = data.get("descr_short")
        self.image = data.get("image")
        self.save()
        return self

class Comment(models.Model):
    user_id = models.ForeignKey(CustomerUser, on_delete=models.CASCADE, related_name="comments")
    prod_id = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="products_comments")
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0, blank=True)
    dislikes = models.IntegerField(default=0, blank=True)

class History(models.Model):
    prod_id = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="purchase_history")
    user_id = models.ForeignKey(CustomerUser, on_delete=models.CASCADE, related_name="user_history")
    ship_id = models.ForeignKey("Shipping", on_delete=models.CASCADE, related_name="shipping_history")
    quantity = models.IntegerField()
    cost = models.FloatField()
    date = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField()

    class Meta:
        verbose_name_plural = "Histories"

class Shipping(models.Model):
    name = models.CharField(max_length=255)
    descr = models.TextField()
    price = models.FloatField()

class CartItem(models.Model):
    prod_id = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="picked")
    ship_id = models.ForeignKey(Shipping, on_delete=models.CASCADE, related_name="used_shipping")
    quantity = models.IntegerField()
    price = models.FloatField()