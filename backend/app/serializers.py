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