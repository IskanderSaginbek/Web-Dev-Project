from django.contrib.auth.base_user import BaseUserManager

from rest_framework import status
from rest_framework.response import Response

from . import models

class UserManager(BaseUserManager):
    def create_user(self, username, email, is_customer, password, **extra_fields):
        if username is None:
            return Response({"error": "Username is required"}, status=status.HTTP_400_BAD_REQUEST)
        if email is None:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
        if is_customer is None:
            return Response({"error": "IsCustomer is required"}, status=status.HTTP_400_BAD_REQUEST)

        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.username = username  
        user.is_customer = is_customer
        user.set_password(password)
        user.save()

        if(is_customer):
            customer = models.CustomerUser.objects.create(userid = user, email = email, username = username, password = password)
        else:
            manufacturer = models.ManufacturerUser.objects.create(userid = user, email = email, name = username, password = password)

        return user