
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
    path("api/rooms/create", create_room),
    path("api/roomsimg/create", create_roomImg),




] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
