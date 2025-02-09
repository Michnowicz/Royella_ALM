from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator




########## user models ##########
class Role(models.Model):
    name = models.CharField(max_length=32)

class UserImg(models.Model):
    image = models.ImageField(upload_to="user/")

class User(AbstractUser):
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, default=2)
    image = models.ForeignKey(UserImg, on_delete=models.CASCADE, null=True)

class Testimony(models.Model):
    description= models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)





########## rooms models ##########
class Room(models.Model):
    name = models.CharField(max_length=32)
    subtitle = models.CharField(max_length=32)
    bed_number = models.IntegerField()
    space = models.IntegerField()
    rating = models.IntegerField(default=0, validators=[
        MinValueValidator(0),
        MaxValueValidator(5)
    ])
    price = models.FloatField()
    percentage_reduction = models.FloatField(validators=[
        MinValueValidator(0),
        MaxValueValidator(1)
    ])
    disponibility = models.BooleanField(default=True)
    phone_number = models.CharField(max_length=24, validators=[RegexValidator('\d', message="The phone number must be a number.")])

class RoomImg(models.Model):
    image = models.ImageField(upload_to="room/")
    room = models.ForeignKey(Room, on_delete=models.CASCADE)





########## banner models ##########
class Banner(models.Model):
    title = models.CharField(max_length=32)
    subtitle = models.CharField(max_length=24)
    subtitle_bottom = models.CharField(max_length=24, default="")
    room = models.ForeignKey(Room, on_delete=models.SET_NULL, null=True)



# homepage section "LUXURY HOTEL AND RESORT"
class HotelResort(models.Model):
    title = models.CharField(max_length=32)
    subtitle = models.CharField(max_length=64)
    text = models.TextField()

class HotelResortImg(models.Model):
    image = models.ImageField(upload_to="hotelresort/")





# employees
class EmployeesImg(models.Model):
    image = models.ImageField(upload_to="employee/")

class Employees(models.Model):
    firstname = models.CharField(max_length=32)
    lastname = models.CharField(max_length=32)
    occupation = models.CharField(max_length=32)
    image = models.ForeignKey(EmployeesImg, on_delete=models.SET_NULL, null=True)

# managers
class ManagerImg(models.Model):
    image = models.ImageField(upload_to="manager/")
    

class Manager(models.Model):
    title = models.CharField(max_length=32)
    subtitle = models.CharField(max_length=48)
    description = models.CharField(max_length=255)
    video = models.CharField(max_length=255, default="")
    manager = models.ForeignKey(Employees, on_delete=models.SET_NULL, null=True)
    image = models.ForeignKey(ManagerImg, on_delete=models.SET_NULL, null=True)






########## About page ##########
# facilities
class FacilityImg(models.Model):
    image = models.ImageField(upload_to="facility/")

class FacilityIcon(models.Model):
    icon = models.ImageField(upload_to="facility/")

class Facility(models.Model):
    title = models.CharField(max_length=32)
    icon = models.ForeignKey(FacilityIcon, on_delete=models.SET_NULL, null=True)
    image = models.ForeignKey(FacilityImg, on_delete=models.SET_NULL, null=True)

class FacilitySection(models.Model):
    category = models.CharField(max_length=32, default="")
    subtitle = models.CharField(max_length=48, default="")
    description = models.CharField(max_length=255, default="")
    facility = models.ForeignKey(Facility,on_delete=models.SET_NULL, null=True)



# contact
class Contact(models.Model):
    phone = models.CharField(max_length=24, validators=[RegexValidator('\d', message="The phone number must be a number.")])
    email = models.EmailField()
    street = models.CharField(max_length=64)
    city = models.CharField(max_length=32)
    postal_code = models.CharField(max_length=5, validators=[RegexValidator('\d', message="The postal code must be a number.")])





# blog


class Categories(models.Model):
    name = models.CharField(max_length=32)

class Tags(models.Model):
    name = models.CharField(max_length=32)

class Blog(models.Model):
    title = models.CharField(max_length=125, default="")
    title_text = models.TextField()
    subtitle = models.CharField(max_length=125, default="")
    subtitle_text = models.TextField()
    subtitle_text2 = models.TextField()
    subtitle_list1 = models.CharField(max_length=125)
    subtitle_list2 = models.CharField(max_length=125)
    subtitle_list3 = models.CharField(max_length=125)
    subtitle_list4 = models.CharField(max_length=125)
    date = models.DateField()
    tags = models.ManyToManyField(Tags)
    category = models.ForeignKey(Categories, on_delete=models.SET_NULL, null=True)


class BlogImg(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(upload_to="blog/")

class Comment(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=150)
    email = models.CharField(max_length=150, null=True)
    date = models.DateField()
    text = models.TextField()
    image = models.CharField(max_length=255)

class Reply(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=150)
    email = models.CharField(max_length=150, null=True)
    date = models.DateField()
    text = models.TextField()
    image = models.CharField(max_length=255)