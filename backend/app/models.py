from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.core.exceptions import ValidationError





########## user models ##########
class Role(models.Model):
    name = models.CharField()

class UserImg(models.Model):
    image = models.ImageField(upload_to="user/")

class User(AbstractUser):
    username = models.CharField(max_length=32, required=True)
    firtname = models.CharField(max_length=32, required=True)
    lastname = models.CharField(max_length=32, required=True)
    password = models.CharField(max_length=255, required=True)
    email = models.EmailField(required=True)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL,required=True)
    image = models.ForeignKey(UserImg, on_delete=models.CASCADE)

class Testimony(models.Model):
    description= models.TextField(required=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, required=True)





########## rooms models ##########
class RoomImg(models.Model):
    image = models.ImageField(upload_to="room/")

class Room(models.Model):
    name = models.CharField(max_length=32, required=True)
    bed_number = models.IntegerField(required=True)
    space = models.IntegerField(required=True)
    rating = models.IntegerField(default=0, validators=[
        MinValueValidator(0),
        MaxValueValidator(5)
    ])
    price = models.FloatField(required=True)
    percentage_reduction = models.FloatField(required=True, validators=[
        MinValueValidator(0),
        MaxValueValidator(1)
    ])
    disponibility = models.BooleanField(default=True)
    image = models.ForeignKey(RoomImg, null=True, on_delete=models.SET_NULL)





########## banner models ##########
class BannerImg(models.Model):
    image = models.ImageField(upload_to="banner")

class Banner(models.Model):
    title = models.CharField(max_length=32, required=True)
    subtitle = models.CharField(max_length=48, required=True)
    rating = models.IntegerField(default=0, validators=[
        MinValueValidator(0),
        MaxValueValidator(5)
    ])
    phone_number = models.CharField(max_length=24)
    image = models.ForeignKey()



# homepage section "LUXURY HOTEL AND RESORT"
class HotelResort(models.Model):
    title = models.CharField(max_length=32, required=True)
    subtitle = models.CharField(max_length=64, required=True)
    text = models.TextField(required=True)



# managers
class Manager(models.Model):
    title = models.CharField(max_length=32, required=True)
    subtitle = models.CharField(max_length=48, required=True)
    description = models.CharField(max_length=255, required=True)
    image = models.ImageField(upload_to="manager")

    