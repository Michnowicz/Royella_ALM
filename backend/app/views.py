from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *
from .serializers import *
import json







########## user views ##########
@api_view(["POST"])
def Log_in(request):
    data = json.loads(request.body)
    user = authenticate(request, username=data.get('email'), password=data.get('password'))

    if user is None:
        return JsonResponse({"status": "error", "message":"wrong username or password ", "data":data})
    else:
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        return JsonResponse({"status":"success", "message": "user connected", "access_token":access_token, "data": data})



@api_view(['POST'])
def create_userImg(request):
    user_image = UserImgSerializers(data=request.data)

    if user_image.is_valid():
        user_image.save()
        image = UserImgSerializers(UserImg.objects.latest('id'))
        return Response({"status": "succes", "data":image.data})
    else:
        return JsonResponse({"status": "error", "massage": user_image.errors})

@api_view(['POST'])
def create_user(request):
    data = json.loads(request.body)


    if User.objects.filter(username=data.get('email')).exists():
        return JsonResponse({'status': 'error', 'message': 'username already taken'})
    else:
        new_image = UserImg(image=request._files)
        new_image.save()
        return JsonResponse({'data':"ok"})

    # new_user = User(
    #     username=data.get('email'),
    #     email=data.get('email'),
    #     password=make_password(data.get('password')),
    #     first_name = data.get("first_name"),
    #     last_name = data.get("last_name"),
    #     )
    
    return JsonResponse({"data": data})