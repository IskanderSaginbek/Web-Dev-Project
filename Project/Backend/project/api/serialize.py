from rest_framework import serializers

from . import models

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ["id", "username", "email", "password", "is_customer"]
        extra_kwargs = {
            "password": {"write_only": True},
            "id": {"read_only": True}
        }

    def create(self, validated_data):
        password = validated_data.pop("pass", None)
        instance = self.Meta.model(**validated_data)
        if(password is not None):
            instance.set_password(password) # django built-in
        instance.save()
        return instance



class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CustomerUser
        fields = ["id", "username", "fname", "lname", "password", "email", "phone",
                  "card_num", "exp_date", "ver_num", "address", "img", "allow_news", "pref_cat", 
                  "only_available"]
        extra_kwargs = {
            "password": {"write_only": True},
            "id": {"read_only": True}
        }

        def update(self, instance, validated_data):
            instance.fname = validated_data.get("fname", instance.fname)
            instance.lname = validated_data.get("lname", instance.lname)
            instance.phone = validated_data.get("phone", instance.phone)
            instance.card_num = validated_data.get("card_num", instance.card_num)
            instance.exp_date = validated_data.get("exp_date", instance.exp_date)
            instance.ver_num = validated_data.get("ver_num", instance.ver_num)
            instance.address = validated_data.get("address", instance.address)
            instance.img = validated_data.get("img", instance.img)
            instance.allow_news = validated_data.get("allow_news", instance.allow_news)
            instance.pref_cat = validated_data.get("pref_cat", instance.pref_cat)
            instance.only_available = validated_data.get("only_available", instance.only_available)
            instance.save()
            return instance



class ManufacturerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ManufacturerUser
        exclude = ['userid']
        extra_kwargs = {
            "password": {"write_only": True},
            "id": {"read_only": True}
        }

        def update(self, instance, validated_data):
            instance.name = validated_data.get("name", instance.name)
            instance.descr = validated_data.get("descr", instance.descr)
            instance.phone = validated_data.get("phone", instance.phone)
            instance.card_num = validated_data.get("card_num", instance.card_num)
            instance.exp_date = validated_data.get("exp_date", instance.exp_date)
            instance.ver_num = validated_data.get("ver_num", instance.ver_num)
            instance.address = validated_data.get("address", instance.address)
            instance.img = validated_data.get("img", instance.img)
            instance.allow_news = validated_data.get("allow_news", instance.allow_news)
            instance.save()
            return instance

    

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = ("id", "name", "descr", "descr_short", "sub_cat", "image", "datasheet",
                "price", "amount", "ratings_num", "date", "rating", "cat_id", "mfr_id")
        extra_kwargs = {
            "id": {"read_only": True}
        }
    
    def create(self, validated_data):
        product = models.Product.objects.create(**validated_data)
        return product
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.descr = validated_data.get("descr", instance.descr)
        instance.descr_short = validated_data.get("descr_short", instance.descr_short)
        instance.image = validated_data.get("image", instance.image)
        instance.datasheet = validated_data.get("datasheet", instance.datasheet)
        instance.sub_cat = validated_data.get("sub_cat", instance.sub_cat)
        instance.price = validated_data.get("price", instance.price)
        instance.amount = validated_data.get("amount", instance.amount)
        instance.rating = validated_data.get("rating", instance.rating)
        instance.ratings_num = validated_data.get("ratings_num", instance.ratings_num)
        instance.date = validated_data.get("date", instance.date)
        instance.save()
        return instance



class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    descr = serializers.CharField()
    image = serializers.CharField()
    descr_short = serializers.CharField()

    def create(self, validated_data):
        product = models.Category.objects.create(**validated_data)
        return product
    
    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.descr = validated_data.get("descr", instance.descr)
        instance.descr_short = validated_data.get("descr_short", instance.descr_short)
        instance.image = validated_data.get("image", instance.image)
        instance.save()
        return instance



class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comment
        fields = ["id", "user_id", "prod_id", "text", "date"]

    def create(self, validated_data):
        comment = models.Comment.objects.create(**validated_data)
        return comment
    
    def update(self, instance, validated_data):
        instance.text = validated_data.get("text", instance.text)
        instance.save()
        return instance



class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.History
        fields = ["id", "user_id", "prod_id", "ship_id", "quantity", "price", "date", "status"]



class ShippingSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    descr = serializers.CharField()
    price = serializers.FloatField()