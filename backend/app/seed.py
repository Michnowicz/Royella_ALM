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





def run_hotelResort():
    seeder=Seed.seeder()
    seeder.add_entity(HotelResort, 1, {
        "title" : lambda x : "LUXURY HOTEL AND RESORT",
        "subtitle" : lambda x : "LUXURY BEST HOTEL IN CITY CALIFORNIA, USA",
        "text" : lambda x : "Rapidiously myocardinate cross-platform intellectual capital after marketing model. Appropriately create interactive infrastructures after maintainable are Holisticly facilitate stand-alone inframe Compellingly create premier open data through economically.",
    })
    pks = seeder.execute()
    print(pks)

def run_hotelResortImg():
    images = ["hr1.jpg", "hr2.jpg"]
    seeder=Seed.seeder()
    for i in range(2):
        seeder.add_entity(HotelResortImg, 1, {
            "image" : lambda x : "hotelresort/" + images[i],
        })
        pks = seeder.execute()
        print(pks)





def run_facilityImg():
    seeder=Seed.seeder()
    for i in range (1, 7):
        seeder.add_entity(FacilityImg, 1, {
            "image" : lambda x : "facility/facility"+str(i)+".png"
        })
        pks = seeder.execute()
        print(pks)

def run_facilityIcon():
    features = ["1", "2", "3", "4", "5", "1"]
    seeder=Seed.seeder()
    for i in range (6):
        seeder.add_entity(FacilityIcon, 1, {
            "icon" : lambda x : "facility/feature-"+features[i]+".jpg"
        })
        pks = seeder.execute()
        print(pks)

def run_facility():
    titles = ["Room Services","Wi-Fi Internet","Smart Key","Breakfast","Swimming Pool","Room Service"]
    categories = ["Rooms", "Connexion", "Protection", "Foods", "Fitness", "Rooms"]
    subtitles = ["Full Room Service", "Best Connexion", "Protection Policy", "The Restaurant Center", "Indoor Swimming Pool", "Full Room Service"]
    description = "Rapidiously myocardinate cross-platform intellectual capital after model. Appropriately create interactive infrastructures after are Holisticly facilitate stand-alone"
    display = [0, 0, 0, 0, 0, 0]
    images = [1, 2, 3, 4, 5, 6]
    icons = [1, 2, 3, 4, 5, 1]

    seeder=Seed.seeder()
    for i in range(6):
        seeder.add_entity(Facility, 1, {
            "title" : lambda x : titles[i],
            "category" : lambda x: categories[i],
            "subtitle" : lambda x: subtitles[i],
            "description": lambda x: description,
            "display": lambda x: display[i],
            "image" : lambda x : FacilityImg.objects.get(id=images[i]),
            "icon" : lambda x : FacilityIcon.objects.get(id=icons[i]),
        })
        pks = seeder.execute()
        print(pks)






def run_employeesImg():
    seeder=Seed.seeder()
    for i in range (0,4):
        seeder.add_entity(EmployeesImg, 1, {
            "image": lambda x: "/employee/e"+str(i+1)+".jpg"
        })
        pks = seeder.execute()
        print(pks)
    for i in range (1,7):
        seeder.add_entity(EmployeesImg, 1, {
            "image": lambda x: "/employee/member-"+str(i)+".jpg"
        })
        pks = seeder.execute()
        print(pks)

def run_employee():
    firstnames = ["John D.", "Valentina", "Leary", "Samantha", "Casey"]
    lastnames = ["Alexon", "Kerry", "Mart", "Shen", "Loyd"]
    occupations = ["Manager", "Product Manager", "Sales Admin", "HR Officer", "Accountant"]
    images = [5, 2, 7, 4, 9 ]

    seeder=Seed.seeder()
    for i in range(0,5):
        seeder.add_entity(Employees, 1, {
            "firstname": lambda x: firstnames[i],
            "lastname": lambda x: lastnames[i],
            "occupation": lambda x: occupations[i],
            "image": lambda x: EmployeesImg.objects.get(id=images[i]), 
        })
        pks = seeder.execute()
        print(pks)



def run_managerImg():
    seeder = Seed.seeder()
    seeder.add_entity(ManagerImg, 1, {
        "image": lambda x: "manager/m1.jpg",
    })

def run_manager():
    seeder=Seed.seeder()
    seeder.add_entity(Manager, 1, {
            "title": lambda x: "MANAGER",
            "subtitle": lambda x: "LUXURY BEST HOTEL IN CITY CALIFORNIA, USA",
            "description": lambda x: "Rapidiously myocardinate cross-platform intellectual capital after model. Appropriately create interactive infrastructures after main Holisticly facilitate stand-alone inframe",
            "video": lambda x: "https://www.youtube.com/watch?v=N28NyPl_8KI",
            "manager": lambda x: Employees.objects.get(id=1),
            "image": lambda x: ManagerImg.objects.get(id=1),
        })
    pks = seeder.execute()
    print(pks)