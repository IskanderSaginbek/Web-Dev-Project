from django.contrib import admin

from .models import User, Product, CartItem, Category, Comment, History, Shipping, CustomerUser, ManufacturerUser

admin.site.register(User)
admin.site.register(Product)
admin.site.register(CartItem)
admin.site.register(Category)
admin.site.register(Comment)
admin.site.register(History)
admin.site.register(Shipping)
admin.site.register(CustomerUser)
admin.site.register(ManufacturerUser)