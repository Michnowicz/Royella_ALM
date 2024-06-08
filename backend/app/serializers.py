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





########## banner ##########
class BannerImgSerializers(serializers.ModelSerializer):
    class Meta:
        model = BannerImg
        fields = '__all__'

class BannerSerializers(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = '__all__'