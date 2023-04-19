from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # FOR CITIES DROPDOWN
    ALMATY = "ALMATY"
    ASTANA = "ASTANA"
    SHYMKENT = "SHYMKENT"
    KARAGANDY = "KARAGANDY"
    AKTAU = "AKTAU"
    ATYRAU = "ATYRAU"
    SEMEI = "SEMEI"
    UST_KAMENOGORSK = "UST-KAMENOGORSK"
    AKTOBE = "AKTOBE"
    KYZYLORDA = "KYZYLORDA"
    PETROPAVLOVSK = "PETROPAVLOVSK"
    PAVLODAR = "PAVLODAR"
    URALSK = "URALSK"

    CITIES_CHOICES = [
        (ALMATY, "Almaty"),
        (ASTANA, "Astana"),
        (SHYMKENT, "Shymkent"),
        (KARAGANDY, "Karagandy"),
        (AKTAU, "Aktau"),
        (ATYRAU, "Atyrau"),
        (SEMEI, "Semei"),
        (UST_KAMENOGORSK, "Ust-Kamenogorsk"),
        (AKTOBE, "Aktobe"),
        (KYZYLORDA, "Kyzylorda"),
        (PETROPAVLOVSK, "Petropavlovsk"),
        (PAVLODAR, "Pavlodar"),
        (URALSK, "Uralsk")
    ]

    username = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    surname = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=255, null=True, blank=True)
    creditcard = models.CharField(max_length=255,  null=True, blank=True)
    city = models.CharField(max_length=255, choices=CITIES_CHOICES, default="ASTANA")
    profile_pic = models.CharField(max_length=255, blank=True, default="default-profile-pic.jpg")
    show_news = models.BooleanField(default=True, blank=True)
    prefered_cat = models.ForeignKey("Category", on_delete=models.SET_NULL, null=True, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "password"]



class Product(models.Model):
    images = models.TextField()
    datasheet = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    descr = models.TextField()
    descr_short = models.CharField(max_length=255)
    sub_cat = models.CharField(max_length=255)
    price = models.FloatField()
    amount = models.IntegerField()
    is_available = models.BooleanField()
    # mfr_id = models.ForeignKey(Manufacturer, on_delete=models.CASCADE)
    rating = models.FloatField()
    cat_id = models.ForeignKey("Category", on_delete=models.CASCADE)

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
    image = models.CharField(max_length=255)
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
    # user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    prod_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0, blank=True)
    dislikes = models.IntegerField(default=0, blank=True)

class History(models.Model):
    prod_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    # user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    ship_id = models.ForeignKey("Shipping", on_delete=models.CASCADE)
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
    prod_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    ship_id = models.ForeignKey(Shipping, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.FloatField()