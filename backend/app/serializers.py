from rest_framework import serializers
from .models import *


class UserImgSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserImg
        fields = '__all__'

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'