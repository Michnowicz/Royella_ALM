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



def run_Room():
    names = ["Double Suite Rooms", "Delux Family Rooms", "Superior Bed Rooms", "Junior Suite Room", "Family Suite Room", "Beautiful family Room"]
    subtitles = ["Luxury Room", "Luxury Room", "Luxury Room", "Luxury Room", "Luxury Room", "Luxury Room"]
    beds = [2, 3, 1, 2, 3, 2]
    spaces = [1500, 1300, 1400, 1700, 1100, 1400]
    ratings = [5, 3, 5, 4, 2]
    prices = [450, 650, 300, 400, 500, 450]
    reduction = [0, 0, 0, 0, 0, 0]
    disponibilities = [1, 1, 1, 1, 0, 1]
    phones = ["0423652294035", "2550747707271", "6469348627791", "3114818024128","2523882645528", "2783875866499"]
    
    seeder=Seed.seeder()
    for i in range(6):
        seeder.add_entity(Room, 1, {
            "name": lambda x: names[i-1],
            "subtitle": lambda x: subtitles[i-1],
            "bed_number": lambda x: beds[i-1],
            "space": lambda x: spaces[i-1],
            "rating": lambda x: ratings[i-1],
            "price": lambda x: prices[i-1],
            "percentage_reduction": lambda x: reduction[i-1],
            "disponibility": lambda x: disponibilities[i-1],
            "phone_number": lambda x: phones[i-1]
        })
        pks = seeder.execute()
        print(pks)



def run_RoomImg():
    images = ["banner1.jpg", "banner2.jpg", "banner3.jpg", "banner4.jpg", "banner5.jpg", "banner6.jpg"]
    seeder=Seed.seeder()
    for i in range(6):
        seeder.add_entity(RoomImg, 1, {
            "image": lambda x : images[i],
            "room": lambda x: Room.objects.get(id=i+1),
        })
        pks = seeder.execute()
        print(pks)




def run_banner():
    titles = ["LUXURY HOTEL AND RESORT", "LUXURY HOTEL", "LUXURY RESORT", "ROYELLA CITY HOTEL"]
    subtitles = ["THE BEST LUXURY HOTEL", "THE BEST LUXURY HOTEL", "THE BEST LUXURY HOTEL", "THE BEST LUXURY HOTEL"]
    subtitles_bottom = ["IN CALIFORNIA", "IN KASHMIR", "IN COLOSSEUM", "IN SRILANKA"]

    seeder=Seed.seeder()
    for i in range(4):
        seeder.add_entity(Banner, 1, {
            "title" : lambda x : titles[i],
            "subtitle" : lambda x : subtitles[i],
            "subtitle_bottom" : lambda x : subtitles_bottom[i],
            "room": lambda x: Room.objects.get(id=i+1)
        })
        pks = seeder.execute()
        print(pks)
