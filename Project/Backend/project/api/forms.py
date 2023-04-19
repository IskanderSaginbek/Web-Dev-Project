from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm

from .models import User

class NewUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ["email", "username", "password1", "password2"]

class UserForm(ModelForm):
    class Meta:
        model = User
        fields = ["name", "surname", "phone", "creditcard", "city",
                  "profile_pic", "show_news", "prefered_cat"]