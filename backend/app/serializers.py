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