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




########## all views ##########
def data_get(request):
    #banners
    banners = BannerSerializers(Banner.objects.all(), many=True)

    for b in banners.data:
        room = RoomSerializes(Room.objects.get(id=b["room"]))
        bannerImg = RoomImgSerializers(RoomImg.objects.get(room=b["room"]))
        b["image"] = bannerImg.data
        b["room"] = room.data

    #rooms
    rooms = RoomSerializes(Room.objects.all(), many=True)
    for r in rooms.data:
        try :
            r["banner"] = BannerSerializers(Banner.objects.get(room=r["id"])).data
        except Banner.DoesNotExist:
            r["banner"] = None
            
        try:
            r["image"] = RoomImgSerializers(RoomImg.objects.get(room=r["id"])).data
        except Banner.DoesNotExist:
            r["image"] = None

    #hotel & resort
    hotelResort = HotelResortSerializers(HotelResort.objects.all(), many=True)
    hotelResortImg = HotelResortImgSerializers(HotelResortImg.objects.all(), many=True)

    # hotel's facilities
    facilities = FacilitySerializers(Facility.objects.all(), many=True)
    for f in facilities.data:
        try :
            f["icon"] = FacilityIconSerializers(FacilityIcon.objects.get(id=f["icon"])).data
        except Banner.DoesNotExist:
            f["icon"] = None
            
        try:
            f["image"] = FacilityImgSerializers(FacilityImg.objects.get(id=f["image"])).data
        except Banner.DoesNotExist:
            f["image"] = None

    data = {
        "banner" : banners.data,
        "rooms" : rooms.data,
        "hotelResort" : hotelResort.data,
        "hotelResortImg" : hotelResortImg.data,
        "facility" : facilities.data,
    }
    return JsonResponse({"data":data})




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
        # return saved image id to create the user
        image = UserImgSerializers(UserImg.objects.latest('id'))
        return Response({"status": "succes", "data":image.data})
    else:
        return JsonResponse({"status": "error", "massage": user_image.errors})

@api_view(['POST'])
def create_user(request):
    serializer = UserSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"status":"success", "message": "user created successfully"})
    else:
        return JsonResponse({"status":"error", "message": serializer.errors})
    
@api_view(['POST'])
def disconnect(request):
    logout(request)
    return JsonResponse({'status': 'success', 'message': 'user disconnected'})

def get_user(request):
    try:
        auth = JWTAuthentication()
        user, _ = auth.authenticate(request)
    except:
        return JsonResponse({'status': 'error'})
    mon_user = {
        'user': user.username,
        'role' : user.role.id
    }
    return JsonResponse({'user': mon_user})






########## rooms views ##########
def get_room(request, id):
    room = RoomImgSerializers(Room.objects.get(id=id))
    return JsonResponse({"data":room.data})

@api_view(['POST'])
def create_roomImg(request):
    roomimg = RoomImgSerializers(data=request.data)
    if roomimg.is_valid():
        roomimg.save()
        return JsonResponse({"status": "success", "message": "room created successfully", "data":roomimg.data})
    else:
        return JsonResponse({"status": "error", "message": roomimg.errors})

@api_view(["PUT"])
def modify_roomImg(request,id):
    roomImg = RoomImg.objects.get(id=id)
    serializer = RoomImgSerializers(roomImg, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"status": "success", "message": "Room modified successfully", "data":serializer.data})
    else:
        return JsonResponse({"status": "error", "message": serializer.errors})

@api_view(['POST'])
def create_room(request):
    room = RoomSerializes(data=request.data)
    if room.is_valid():
        room.save()
        return JsonResponse({"status": "success", "message": "Room created successfully", "data":room.data})
    else:
        return JsonResponse({"status": "error", "message": room.errors})
    
@api_view(["PUT"])
def modify_room(request, id):
    room = Room.objects.get(id=id)
    serializer = RoomSerializes(room, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"status": "success", "message": "Room modified successfully", "data":serializer.data})
    else:
        return JsonResponse({"status": "error", "message": serializer.errors})
    




########## banner views ##########
@api_view(["PUT"])
def create_banner(request):
    banner = BannerSerializers(data=request.data)
    if banner.is_valid():
        banner.save()
        banners = BannerSerializers(Banner.objects.all(), many=True)
        return JsonResponse({"status": "success", "message": "banner created successfully", "data":banners.data})
    else:
        return JsonResponse({"status": "error", "message": banner.errors})
    
@api_view(['DELETE'])
def delete_banner(request, id):
    banner = Banner.objects.get(id=id)
    banner.delete()
    banners = BannerSerializers(Banner.objects.all(), many=True)
    return Response({"status": "success", "message": "banner created successfully", "data":banners.data})

@api_view(["PUT"])
def modify_banner(request, id):
    banner = Banner.objects.get(id=id)
    serializer = BannerSerializers(banner, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"status": "success", "message": "Banner modified successfully", "data":serializer.data})
    else:
        return JsonResponse({"status": "error", "message": serializer.errors})
    
def get_banner_detail(request, id):
    banner = BannerSerializers(Banner.objects.get(id=id))
    return JsonResponse({"data":banner.data})





########## hotel & resort views ##########
