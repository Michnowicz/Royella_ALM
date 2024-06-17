
from django.contrib import admin
from django.urls import path
from app.views import *
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/login", Log_in),
    path("api/all/get", data_get),

    #user
    path("api/user/create", create_user),
    path("api/user/get", get_user),
    path("api/user/disconnect", disconnect),
    path("api/user_img/create", create_userImg),

    #rooms
    path("api/rooms/<int:id>", get_room),
    path("api/rooms/create", create_room),
    path("api/roomsimg/create", create_roomImg),
    path("api/roomsimg/modify/<int:id>", modify_roomImg),
    path("api/rooms/modify/<int:id>", modify_room),

    #banners
    path("api/banners/create", create_banner),
    path("api/banners/delete/<int:id>", delete_banner),
    path("api/banners/modify/<int:id>", modify_banner),
    path("api/banners/get/<int:id>", get_banner_detail),

    #hotel & resort
    # path("api/hotelresort/get", get_hotel_resort),
    path("api/hotelresort/modify", modify_hotel_resort),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
