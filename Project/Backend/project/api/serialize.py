from rest_framework import serializers

from . import models

# NEED SERIALIZERS FOR USERS

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = ["id", "name", "descr", "descr_short", "sub_cat", "images", "datasheet",
                  "price", "amount", "is_available", "rating", "cat_id"]

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CartItem
        fields = ["id", "prod_id", "ship_id", "quantity", "price"]

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comment
        fields = ["id", "prod_id", "text", "data", "likes", "dislikes"]

class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.History
        fields = ["id", "prod_id", "ship_id", "quantity", "cost", "date", "status"]

class ShippingSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    descr = serializers.CharField()
    price = serializers.FloatField()

class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    descr = serializers.CharField()
    image = serializers.CharField()
    descr_short = serializers.CharField()