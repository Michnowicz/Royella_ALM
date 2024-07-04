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
        except RoomImg.DoesNotExist:
            r["image"] = None

    #hotel & resort
    hotelResort = HotelResortSerializers(HotelResort.objects.all(), many=True)
    hotelResortImg = HotelResortImgSerializers(HotelResortImg.objects.all(), many=True)

    # hotel's facilities
    facilities = FacilitySerializers(Facility.objects.all(), many=True)
    for f in facilities.data:
        try :
            f["icon"] = FacilityIconSerializers(FacilityIcon.objects.get(id=f["icon"])).data
        except FacilityIcon.DoesNotExist:
            f["icon"] = None
            
        try:
            f["image"] = FacilityImgSerializers(FacilityImg.objects.get(id=f["image"])).data
        except FacilityImg.DoesNotExist:
            f["image"] = None

    # facility section
    facilitiesSection = FacilitySectionSerializers(FacilitySection.objects.all(), many=True)
    for f in facilitiesSection.data:
        try:
            f["facility_info"] = f["facility"]
            f["facility_info"] = FacilitySerializers(Facility.objects.get(id=f["facility"])).data
            f["facility_info"]["icon"] = FacilityIconSerializers(FacilityIcon.objects.get(id=f["facility_info"]["icon"])).data
            f["facility_info"]["image"] = FacilityImgSerializers(FacilityImg.objects.get(id=f["facility_info"]["image"])).data
        except Facility.DoesNotExist:
            f["facility_info"] = None

    
    # manager
    manager = ManagerSerializers(Manager.objects.get(id=1)).data
    try:
        manager["manager"] = EmployeesSerializers(Employees.objects.get(id=manager["manager"])).data
        manager["image"] = ManagerImgSerializers(ManagerImg.objects.get(id=manager["image"])).data
        manager["manager"]["image"] = EmployeesImgSerializers(EmployeesImg.objects.get(id=manager["manager"]["image"])).data
    except Employees.DoesNotExist:
        manager["manager"] = None

    # employees
    employees = EmployeesSerializers(Employees.objects.all(), many=True)
    for e in employees.data:
        try:
            e["image"] = EmployeesImgSerializers(EmployeesImg.objects.get(id=e["image"])).data
        except EmployeesImg.DoesNotExist:
            e["image"] = ""


    data = {
        "banner" : banners.data,
        "rooms" : rooms.data,
        "hotelResort" : hotelResort.data,
        "hotelResortImg" : hotelResortImg.data,
        "facility" : facilities.data,
        "facilitySection" : facilitiesSection.data,
        "manager" : manager,
        "employees" : employees.data,
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
@api_view(["PUT"])
def modify_hotel_resort(request):
    hotelResort = HotelResort.objects.get(id=1)
    serializer = HotelResortSerializers(hotelResort, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"status": "success", "message": "Hotel & resort section modified", "data":serializer.data})
    else:
        return JsonResponse({"status": "error", "message":serializer.errors})


@api_view(["PUT"])
def modify_hr_img(request, id):
    hr_img = HotelResortImg.objects.get(id=id)
    serializer = HotelResortImgSerializers(hr_img, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"status": "success", "message": "Hotel & resort image modified", "data":serializer.data})
    else:
        return JsonResponse({"status": "error", "message":serializer.errors})
    




########## manager views ##########
@api_view(["PUT"])
def modify_manager(request):
    manager = Manager.objects.get(id=1)
    serializer = ManagerSerializers(manager, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"status": "success", "message": "manager modified", "data":serializer.data})
    else:
        return JsonResponse({"status": "error", "message":serializer.errors})

@api_view(["PUT"])
def modify_managerImg(request):
    managerImg = ManagerImg.objects.get(id=1)
    serializer = ManagerImgSerializers(managerImg, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"status": "success", "message": "manager image modified", "data":serializer.data})
    else:
        return JsonResponse({"status": "error", "message":serializer.errors})
    




########## facilities views ##########
@api_view(["PUT"])
def modify_facility(request, id):
    facility = FacilitySection.objects.get(id=id)
    serializer = FacilitySectionSerializers(facility, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"status": "success", "message": "manager image modified", "data":serializer.data})
    else:
        return JsonResponse({"status": "error", "message":serializer.errors})
    




########## blog views ##########
def get_blogs(request):
    blogs = BlogSerializers(Blog.objects.all(), many=True)
    for b in blogs.data:
        images =  BlogImgSerializers(BlogImg.objects.filter(blog_id=b["id"]), many=True)
        b["images"] = images.data
    return JsonResponse({"blogs":blogs.data})


def get_searchBar(request):
    tags = TagsSerializers(Tags.objects.all(), many=True)
    categories = CategoriesSerializers(Categories.objects.all(), many=True)

    data = {
        "tags": tags.data,
        "categories": categories.data,
    }
    return JsonResponse({"data":data})

def get_popular_post(request):
    blogs = BlogSerializers(Blog.objects.all(), many=True)
    popular_posts = []
    max_count = []
    for b in blogs.data:
        images =  BlogImgSerializers(BlogImg.objects.filter(blog_id=b["id"]), many=True)
        b["images"] = images.data
        comments = CommentSerializers(Comment.objects.filter(blog_id=b["id"]), many=True)
        b["comments"] = len(comments.data)
        for c in comments.data:
            replies = ReplySerializers(Reply.objects.filter(comment_id=c["id"]), many=True)
            b["comments"] += len(replies.data)
        max_count.append(b["comments"])

    print(max_count)
    max_count.sort(reverse=True)

    for m in max_count:
        for b in blogs.data:
            if b["comments"] == m and len(popular_posts) < 3:
                popular_posts.append(b)
    
    return JsonResponse({"blogs":popular_posts})


def get_blog_detail(request,id):
    blog = BlogSerializers(Blog.objects.get(id=id)).data
    blog["images"] =  BlogImgSerializers(BlogImg.objects.filter(blog=blog["id"]), many=True).data

    blog["comments"] = CommentSerializers(Comment.objects.filter(blog_id=blog["id"]), many=True).data
    count = len(blog["comments"])
    for c in blog["comments"]:
        c["replies"] = ReplySerializers(Reply.objects.filter(comment_id=c["id"]), many=True).data
        count += len(c["replies"])


    return JsonResponse({"blog":blog, "count": count})


@api_view(["PUT"])
def create_comment(request):
    comment = CommentSerializers(data=request.data)
    if comment.is_valid():
        comment.save()
        comments = CommentSerializers(Comment.objects.all(), many=True)
        return JsonResponse({"status": "success", "message": "banner created successfully", "data":comments.data})
    else:
        return JsonResponse({"status": "error", "message": comment.errors})


@api_view(["PUT"])
def create_reply(request):
    reply = ReplySerializers(data=request.data)
    if reply.is_valid():
        reply.save()
        return JsonResponse({"status": "success", "message": "banner created successfully"})
    else:
        return JsonResponse({"status": "error", "message": reply.errors})
    

@api_view(["GET","PUT"])
def create_blog(request):
    if request.method == 'GET':
        categories = CategoriesSerializers(Categories.objects.all(), many=True).data
        tags = TagsSerializers(Tags.objects.all(), many=True).data
        return JsonResponse({"categories": categories, "tags": tags})
    
    if request.method == "PUT":
        data = request.data
        blog = {
            "title" : data["title"],
            "title_text" : data["title_text"],
            "subtitle" : data["subtitle"],
            "subtitle_text" : data["subtitle_text"],
            "subtitle_text2" : data["subtitle_text2"],
            "subtitle_list1" : data["subtitle_list1"],
            "subtitle_list2" : data["subtitle_list2"],
            "subtitle_list3" : data["subtitle_list3"],
            "subtitle_list4" : data["subtitle_list4"],
            "date" : data["date"],
        }

        serializer = BlogSerializers(data=blog)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"status":"success", "data": serializer.data})
        else:
            return JsonResponse({"status": "error", "message": serializer.errors, "data": tags})

@api_view(["PUT"])
def create_blogImg(request):
    blogImg = BlogImgSerializers(data=request.data)
    if blogImg.is_valid():
        blogImg.save()
        return JsonResponse({"status":"success"})
    else:
        return JsonResponse({"status": "error", "message": blogImg.errors})


@api_view(["PUT"])
def create_blog_tags(request):
    datas = request.data
    blog = Blog.objects.get(id=datas["blog"])
    blog_tag = Tags.objects.get(id=datas["id"])
    blog.tags.add(blog_tag)

    return JsonResponse({"status": "success", "data":datas})
