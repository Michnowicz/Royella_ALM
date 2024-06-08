from django_seed import Seed
from .models import *
import random
from django.contrib.auth.hashers import make_password


def run_roles():
    roles = ["admin","user","receptionist","editor","webmaster"]
    seeder = Seed.seeder()

    for r in roles:
        seeder.add_entity(Role, 1, {
            "name" :  lambda x : r
        })
        pks = seeder.execute()
        print(pks)



def run_user_images():
    images = ["dc.jpg", "furi.png", "hn.png", "samus.png", "sk.png"]
    seeder = Seed.seeder()

    for i in range (5):
        seeder.add_entity(UserImg, 1, {
            "image" : lambda x : "user/" + images[i],
        })
        pks = seeder.execute()
        print(pks)




def run_users():
    emails = ["dummy@test.com", "user@test.com", "receptionist@test.com", "editor@test.com", "webmaster@test.com",]
    names = ["dummy", "user", "receptionist", "editor", "webmaster"]


    seeder = Seed.seeder()
    for i in range (5):
        seeder.add_entity(User, 1, {
            "id" : lambda x : i+1,
            "email" : lambda x : emails[i],
            "username" : lambda x : emails[i],
            "first_name" : lambda x : names[i],
            "last_name" : lambda x : names[i],
            "password" : lambda x : make_password(names[i]),
            "image" : lambda x : UserImg.objects.get(id=i+1),
            "role" : lambda x : Role.objects.get(id=i+1),
        })
        pks = seeder.execute()
        print(pks)




def run_bannerImg():
    images = ["banner1.jpg", "banner2.jpg", "banner3.jpg", "banner4.jpg"]
    seeder=Seed.seeder()
    for i in range(4):
        seeder.add_entity(BannerImg, 1, {
            "image": lambda x : images[i]
        })
        pks = seeder.execute()
        print(pks)




def run_banner():
    titles = ["LUXURY HOTEL AND RESORT", "LUXURY HOTEL", "LUXURY RESORT", "ROYELLA CITY HOTEL"]
    subtitles = ["THE BEST LUXURY HOTEL", "THE BEST LUXURY HOTEL", "THE BEST LUXURY HOTEL", "THE BEST LUXURY HOTEL"]
    subtitles_bottom = ["IN CALIFORNIA", "IN KASHMIR", "IN COLOSSEUM", "IN SRILANKA"]
    ratings = [3, 4, 5, 4]
    phone_numbers = ["0423652294035", "2550747707271", "6469348627791", "3114818024128"]

    seeder=Seed.seeder()
    for i in range(4):
        seeder.add_entity(Banner, 1, {
            "title" : lambda x : titles[i],
            "subtitle" : lambda x : subtitles[i],
            "subtitle_bottom" : lambda x : subtitles_bottom[i],
            "rating" : lambda x : ratings[i],
            "phone_number" : lambda x : phone_numbers[i],
            "image" : lambda x : BannerImg.objects.get(id=i+1),
        })
        pks = seeder.execute()
        print(pks)
