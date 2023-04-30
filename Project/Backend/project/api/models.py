from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    password = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=255)
    is_customer = models.BooleanField()
    first_name = None
    last_name = None

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "password"]



class CustomerUser(models.Model):
    userid = models.OneToOneField(User, on_delete=models.CASCADE, related_name="customer")
    password = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    username = models.CharField(max_length=255, unique=True)
    fname = models.CharField(max_length=255, blank=True, null=True)
    lname = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=255, null=True, blank=True)
    card_num = models.CharField(max_length=255,  null=True, blank=True)
    exp_date = models.DateField(null=True, blank=True)
    ver_num = models.CharField(max_length=255, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    img = models.CharField(max_length=255, blank=True, null=True)
    allow_news = models.BooleanField(default=True, blank=True)
    pref_cat = models.ForeignKey("Category", on_delete=models.SET_NULL, null=True, blank=True, related_name="prefered_user")
    only_available = models.BooleanField(blank=True, null=True)

    def __str__(self):
        return self.username



class ManufacturerUser(models.Model):
    userid = models.OneToOneField(User, on_delete=models.CASCADE, related_name="manufacturer")
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=255, blank=True, null=True)
    descr = models.TextField(blank=True, null=True)
    card_num = models.CharField(max_length=255, blank=True, null=True)
    exp_date = models.DateField(null=True, blank=True)
    ver_num = models.CharField(max_length=255, null=True, blank=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    img = models.CharField(max_length=255, blank=True, null=True)
    allow_news = models.BooleanField(null=True, blank=True)

    def __str__(self):
        return self.name



class Product(models.Model):
    image = models.CharField(max_length=255)
    datasheet = models.CharField(max_length=255, null=True, blank=True)
    name = models.CharField(max_length=255)
    descr = models.TextField(null=True, blank=True)
    descr_short = models.CharField(max_length=255)
    sub_cat = models.CharField(max_length=255)
    price = models.FloatField()
    amount = models.IntegerField()
    date = models.DateField()
    mfr_id = models.ForeignKey(ManufacturerUser, on_delete=models.CASCADE, related_name="manufactured_products")
    rating = models.FloatField()
    ratings_num = models.IntegerField()
    cat_id = models.ForeignKey("Category", on_delete=models.CASCADE, related_name="manufactured_categories")

    class Meta:
        ordering = ["-rating", "-price", "-amount"]

    def __str__(self):
        return self.name
    
    def purchaseProduct(self, item, user, ship_id):
        if(self.amount - item["amount"] < 0):
            return False
        self.amount -= item["amount"]
        self.save()

        shipping = Shipping.objects.get(id = ship_id)
        History.objects.create(prod_id = self, user_id = user, ship_id = shipping, quantity = item["amount"], price=self.price, status=1) # what is status?
        return True
    
    

class Category(models.Model):
    name = models.CharField(max_length=255)
    descr = models.TextField()
    image = models.CharField(max_length=255, blank=True)
    descr_short = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name



class Comment(models.Model):
    user_id = models.ForeignKey(CustomerUser, on_delete=models.CASCADE, related_name="comments")
    prod_id = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="products_comments")
    text = models.TextField()
    date = models.DateField(auto_now_add=True, blank=True)

    def __str__(self):
        return "Comment #" + str(id)



class History(models.Model):
    prod_id = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="purchase_history")
    user_id = models.ForeignKey(CustomerUser, on_delete=models.CASCADE, related_name="user_history")
    ship_id = models.ForeignKey("Shipping", on_delete=models.CASCADE, related_name="shipping_history")
    quantity = models.IntegerField()
    price = models.FloatField()
    date = models.DateField(blank=True, auto_now_add=True)
    status = models.IntegerField()

    class Meta:
        verbose_name_plural = "Histories"

    def __str__(self):
        return f'Purchase #{self.id}'



class Shipping(models.Model):
    name = models.CharField(max_length=255)
    descr = models.TextField()
    price = models.FloatField()
    days = models.IntegerField()

    def __str__(self):
        return self.name