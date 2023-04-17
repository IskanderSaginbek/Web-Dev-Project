from django.db import models
from django.contrib.auth.models import AbstractUser

class Product(models.Model):
    name = models.CharField(max_length=255)
    descr = models.TextField()
    descr_short = models.CharField(max_length=255)
    subcategory = models.CharField(max_length=255)
    price = models.FloatField()
    amount = models.IntegerField()
    manufacturer = models.IntegerField()
    rating = models.FloatField(null=True)
    images = models.TextField() # like "url1, url2 etc"; we can split them using split or smth
    datasheet = models.CharField(max_length=255) # link to a file? or use FileField?

    class Meta:
        ordering = ["-rating"]

    def __str__(self):
        return self.name

class Resistor(Product):
    resistance = models.IntegerField()
    power_value = models.FloatField()
    tolerance = models.FloatField()

    def addProduct(data):
        newProduct = Resistor.objects.create(
            name = data.get("name"),
            descr = data.get("descr"),
            descr_short = data.get("descr_short"),
            subcategory = data.get("sub_cat"),
            price = data.get("price"),
            amount = data.get("amount"),
            manufacturer = data.get("mfr_id"),
            rating = data.get("rating"),
            images = data.get("imgs"),
            datasheet  = data.get("ds"),
            resistance = data.get("resistance"),
            power_value = data.get("power"),
            tolerance = data.get("tolerance"),
        )
        return newProduct


class Capacitor(Product):
    capacitance = models.FloatField()
    vdc = models.FloatField()
    vac = models.FloatField()

    def addProduct(self, data):
        newProduct = Resistor.objects.create(
            name = data.get("name"),
            descr = data.get("descr"),
            descr_short = data.get("descr_short"),
            subcategory = data.get("sub_cat"),
            price = data.get("price"),
            amount = data.get("amount"),
            manufacturer = data.get("mfr_id"),
            rating = data.get("rating"),
            images = data.get("imgs"),
            datasheet  = data.get("ds"),
            capacitance = data.get("capacitance"),
            vdc = data.get("vdc"),
            vac = data.get("vac"),
        )
        return newProduct

class Transistor(Product):
    tech = models.CharField(max_length=255)
    package = models.CharField(max_length=255)
    voltage = models.FloatField()

    def addProduct(self, data):
        newProduct = Resistor.objects.create(
            name = data.get("name"),
            descr = data.get("descr"),
            descr_short = data.get("descr_short"),
            subcategory = data.get("sub_cat"),
            price = data.get("price"),
            amount = data.get("amount"),
            manufacturer = data.get("mfr_id"),
            rating = data.get("rating"),
            images = data.get("imgs"),
            datasheet  = data.get("ds"),
            tech = data.get("tech"),
            package = data.get("package"),
            voltage = data.get("voltage"),
        )
        return newProduct

class Inductor(Product):
    inductance = models.FloatField()
    tolerance = models.IntegerField() # %
    current = models.FloatField()

    def addProduct(self, data):
        newProduct = Resistor.objects.create(
            name = data.get("name"),
            descr = data.get("descr"),
            descr_short = data.get("descr_short"),
            subcategory = data.get("sub_cat"),
            price = data.get("price"),
            amount = data.get("amount"),
            manufacturer = data.get("mfr_id"),
            rating = data.get("rating"),
            images = data.get("imgs"),
            datasheet  = data.get("ds"),
            inductance = data.get("inductance"),
            tolerance = data.get("tolerance"),
            current = data.get("current"),
        )
        return newProduct

class Diode(Product):
    color = models.CharField(max_length=255)
    lum = models.FloatField()
    vf = models.FloatField()

    def addProduct(self, data):
        newProduct = Resistor.objects.create(
            name = data.get("name"),
            descr = data.get("descr"),
            descr_short = data.get("descr_short"),
            subcategory = data.get("sub_cat"),
            price = data.get("price"),
            amount = data.get("amount"),
            manufacturer = data.get("mfr_id"),
            rating = data.get("rating"),
            images = data.get("imgs"),
            datasheet  = data.get("ds"),
            color = data.get("color"),
            lum = data.get("lum"),
            vf = data.get("vf"),
        )
        return newProduct

class IC(Product):
    package = models.CharField(max_length=255)
    tech = models.CharField(max_length=255)

    def addProduct(self, data):
        newProduct = Resistor.objects.create(
            name = data.get("name"),
            descr = data.get("descr"),
            descr_short = data.get("descr_short"),
            subcategory = data.get("sub_cat"),
            price = data.get("price"),
            amount = data.get("amount"),
            manufacturer = data.get("mfr_id"),
            rating = data.get("rating"),
            images = data.get("imgs"),
            datasheet  = data.get("ds"),
            package = data.get("package"),
            tech = data.get("tech"),
        )
        return newProduct

class Wire(Product):
    length = models.FloatField()
    voltage = models.FloatField()
    package = models.CharField(max_length=255)

    def addProduct(self, data):
        newProduct = Resistor.objects.create(
            name = data.get("name"),
            descr = data.get("descr"),
            descr_short = data.get("descr_short"),
            subcategory = data.get("sub_cat"),
            price = data.get("price"),
            amount = data.get("amount"),
            manufacturer = data.get("mfr_id"),
            rating = data.get("rating"),
            images = data.get("imgs"),
            datasheet  = data.get("ds"),
            length = data.get("length"),
            voltage = data.get("number"),
            package = data.get("package"),
        )
        return newProduct

class Connector(Product):
    standart = models.CharField(max_length=255)
    current = models.FloatField()

    def addProduct(self, data):
        newProduct = Resistor.objects.create(
            name = data.get("name"),
            descr = data.get("descr"),
            descr_short = data.get("descr_short"),
            subcategory = data.get("sub_cat"),
            price = data.get("price"),
            amount = data.get("amount"),
            manufacturer = data.get("mfr_id"),
            rating = data.get("rating"),
            images = data.get("imgs"),
            datasheet  = data.get("ds"),
            standart = data.get("standart"),
            current = data.get("current"),
        )
        return newProduct

class Power(Product):
    voltage = models.FloatField()
    capacity = models.FloatField()

    def addProduct(self, data):
        newProduct = Resistor.objects.create(
            name = data.get("name"),
            descr = data.get("descr"),
            descr_short = data.get("descr_short"),
            subcategory = data.get("sub_cat"),
            price = data.get("price"),
            amount = data.get("amount"),
            manufacturer = data.get("mfr_id"),
            rating = data.get("rating"),
            images = data.get("imgs"),
            datasheet  = data.get("ds"),
            voltage = data.get("voltage"),
            capacity = data.get("capacity"),
        )
        return newProduct

class Memory(Product):
    size = models.IntegerField()
    interface = models.CharField(max_length=255)

    def addProduct(self, data):
        newProduct = Resistor.objects.create(
            name = data.get("name"),
            descr = data.get("descr"),
            descr_short = data.get("descr_short"),
            subcategory = data.get("sub_cat"),
            price = data.get("price"),
            amount = data.get("amount"),
            manufacturer = data.get("mfr_id"),
            rating = data.get("rating"),
            images = data.get("imgs"),
            datasheet  = data.get("ds"),
            size = data.get("size"),
            interface = data.get("int_type"),
        )
        return newProduct