from rest_framework import serializers
from .models import *

########## user ##########
class UserImgSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserImg
        fields = '__all__'

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'





########## Rooms ##########
class RoomImgSerializers(serializers.ModelSerializer):
    class Meta:
        model = RoomImg
        fields = '__all__'

class RoomSerializes(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'





########## banner ##########
class BannerSerializers(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = '__all__'





########## hotel & resort ##########
class HotelResortImgSerializers(serializers.ModelSerializer):
    class Meta:
        model = HotelResortImg
        fields = '__all__'

class HotelResortSerializers(serializers.ModelSerializer):
    class Meta:
        model = HotelResort
        fields = '__all__'





########## hotel & facilities ##########
class FacilitySerializers(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = '__all__'

class FacilityImgSerializers(serializers.ModelSerializer):
    class Meta:
        model = FacilityImg
        fields = '__all__'

class FacilityIconSerializers(serializers.ModelSerializer):
    class Meta:
        model = FacilityIcon
        fields = '__all__'

class FacilitySectionSerializers(serializers.ModelSerializer):
    class Meta:
        model = FacilitySection
        fields = '__all__'



########## Employees & manager ##########
class EmployeesImgSerializers(serializers.ModelSerializer):
    class Meta:
        model = EmployeesImg
        fields = '__all__'

class EmployeesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = '__all__'

class ManagerImgSerializers(serializers.ModelSerializer):
    class Meta:
        model = ManagerImg
        fields = '__all__'

class ManagerSerializers(serializers.ModelSerializer):
    class Meta:
        model = Manager
        fields = '__all__'





########## blogs & categories & tags ##########
class CategoriesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields= '__all__'

class TagsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Tags
        fields= '__all__'


class BlogSerializers(serializers.ModelSerializer):
    tags = TagsSerializers(read_only=True, many=True)
    category = CategoriesSerializers(read_only=True)

    class Meta:
        model = Blog
        fields = '__all__'

class BlogCreateSerializers(serializers.ModelSerializer):
    tags = TagsSerializers(read_only=True, many=True)
    categories = CategoriesSerializers(read_only=True)

    class Meta:
        model = Blog
        fields = '__all__'


class BlogImgSerializers(serializers.ModelSerializer):
    blogs = BlogSerializers(read_only=True, many=True)
    class Meta:
        model = BlogImg
        fields = '__all__'

class CommentSerializers(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class ReplySerializers(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = '__all__'
