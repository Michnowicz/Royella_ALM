
from django.contrib import admin
from django.urls import path
from app.views import *
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/login", Log_in),
    path("api/user/create", create_user),
    path("api/user/disconnect", disconnect),
    path("api/user_img/create", create_userImg),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
