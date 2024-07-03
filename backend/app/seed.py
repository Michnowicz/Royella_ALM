from django_seed import Seed
from .models import *
import random
from django.contrib.auth.hashers import make_password
from datetime import datetime
from faker import Faker

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
    seeder = Seed.seeder()

    for i in range (5):
        seeder.add_entity(UserImg, 1, {
            "image" : lambda x : "user/u3.png",
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
            "image": lambda x : "banner/"+images[i],
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
            "image" : lambda x : "facility/facility"+str(i)+".jpg"
        })
        pks = seeder.execute()
        print(pks)

def run_facilityIcon():
    features = ["1", "2", "3", "4", "5", "1"]
    seeder=Seed.seeder()
    for i in range (6):
        seeder.add_entity(FacilityIcon, 1, {
            "icon" : lambda x : "facility/feature-"+features[i]+".png"
        })
        pks = seeder.execute()
        print(pks)

def run_facility():
    titles = ["Room Services","Wi-Fi Internet","Smart Key","Breakfast","Swimming Pool","Room Service"]
    images = [1, 2, 3, 4, 5, 6]
    icons = [1, 2, 3, 4, 5, 1]

    seeder=Seed.seeder()
    for i in range(6):
        seeder.add_entity(Facility, 1, {
            "title" : lambda x : titles[i],
            "image" : lambda x : FacilityImg.objects.get(id=images[i]),
            "icon" : lambda x : FacilityIcon.objects.get(id=icons[i]),
        })
        pks = seeder.execute()
        print(pks)

def run_facilitySection():
    categories = ["Rooms", "Connexion", "Foods", "Fitness"]
    subtitles = ["Full Room Service", "Best Connexion", "The Restaurant Center", "Indoor Swimming Pool"]
    description = "Rapidiously myocardinate cross-platform intellectual capital after model. Appropriately create interactive infrastructures after are Holisticly facilitate stand-alone"
    id = [1, 2, 4, 5]

    seeder=Seed.seeder()
    for i in range(4):
        seeder.add_entity(FacilitySection, 1, {
            "category" : lambda x: categories[i],
            "subtitle" : lambda x: subtitles[i],
            "description": lambda x: description,
            "facility" : lambda x: Facility.objects.get(id=id[i]),
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






def run_categories():
    seeder=Seed.seeder()
    categories = ["Luxury Hotels", "Restaurants", "Spa Center", "Health Club", "Industrial", "Uncategories"]

    for i in range(6):
        seeder.add_entity(Categories, 1, {
            "name" : lambda x: categories[i],
        })
        pks = seeder.execute()
        print(pks)

def run_tags():
    seeder=Seed.seeder()
    tags = ["Luxury Hotels", "Interior Design", "Spa Center", "Luxury Restaurant", "Luxury Hotel", "Health Club"]

    for i in range(6):
        seeder.add_entity(Tags, 1, {
            "name" : lambda x: tags[i],
        })
        pks = seeder.execute()
        print(pks)

def run_blogs():
    titles = ["How to Book a Room online Step by Step Guide",
            "How to Book a Room online Step by Step Guide",
            "5 Discount Period every year for Valuable Clients",
            "Luxury Hotel for Traveling Spot USA, California",
            "Luxury Hotel for Traveling Spot Europe, Berlin",
            "Top 10 Best Hotel & Resort in Sandigo, USA",
            "Best Hotels around Europe",
            "Best Hotel In Asia"
            ]
    textTitles = "Rapidiously myocardinate cross-platform intellectual capital after marketing model. Appropriately create interactive infrastructures after maintainable are Holisticly facilitate stand-alone inframe extend state of the art benefits via web-enabled value. Completely fabricate extensible infomediaries rather than reliable e-services. Dramatically whiteboard alternative\n\nConveniently fashion pandemic potentialities for team driven technologies. Proactively orchestrate robust systems rather than user-centric vortals. Distinctively seize top-line e-commerce with premier intellectual capital. Efficiently strategize goal-oriented"
    sb = "Rules & Regulations"
    sbText = "Collaboratively redefine cutting-edge infrastructures whereas open main convergence energistically simplify discover. Quickly leverage others collaborative innovation after next- generation applications."
    # sbList = ["Phosfluorescently envisioneer process done.", "Rapidiously deliver progressive experiences rather", "Professionally actualize intuitive products via multifunctiona.", "Conveniently extend covalent metrics."]
    sbTextTwo = "Interactively visualize top-line internal or organic sources rather than top-line niche markets. Continually unleash 24/7 opportunities after high standards in process improvements. Uniquely deploy impactful are methodologies with reliable information. Synergistically revolutionize fully researched manufactured items with optimal materials competently envisioneer.\n\nHolisticly innovate global ROI with user-centric total linkage. Collaboratively e-enable efficient markets with multifunctional e-business. Continually incentivize sustainable products for B2B"
    dates = ["2023-10-08", "2024-04-29", "2022-04-30", "2024-01-13","2023-07-02","2022-08-28","2023-09-11","2023-10-21"]
    images=[1,2,3,4,5,6,7,8]
    categories=[1,2,3,1,2,4,5,6]
    tags=[[1,2,3],[2,3,4],[3,4,5],[5,6,1],[1,5],[3,6],[4,2],[1]]


    for i in range(15):
        # print(random.randint(0, len(titles)-1))
        fake = Faker()
        b1 = Blog(
                title=titles[random.randint(0, len(titles)-1)],
                title_text = textTitles,
                subtitle = sb,
                subtitle_text = sbText,
                subtitle_text2 = sbTextTwo,
                subtitle_list1 = fake.paragraph(nb_sentences=1),
                subtitle_list2 = fake.paragraph(nb_sentences=1),
                subtitle_list3 = fake.paragraph(nb_sentences=1),
                subtitle_list4 = fake.paragraph(nb_sentences=1),
                date=dates[random.randint(0, len(titles)-1)],
                # image=BlogImg.objects.get(id=images[random.randint(0, len(titles)-1)]),
                category=Categories.objects.get(id=categories[random.randint(0, len(titles)-1)])
                )
        b1.save()
        random_tags = random.randint(0,7)
        for j in range(len(tags[random_tags])):
            t = Tags.objects.get(id=tags[random_tags][j])
            b1.tags.add(t)

def run_blogImg():
    seeder=Seed.seeder()
    
    for i in range(1,16):
        for j in range(3):
            seeder.add_entity(BlogImg, 1, {
                "blog" : lambda x : Blog.objects.get(id=i),
                "image" : lambda x : "blog/b"+str(random.randint(1, 8))+".jpg",
            })
            pks = seeder.execute()
            print(pks)

def run_comment():
    seeder=Seed.seeder()

    dates = ["2024-05-20", "2024-05-10", "2024-05-03", "2024-05-12", "2024-05-07"]
    
    for i in range(20):
        fake = Faker()
        name = fake.first_name()
        last_name = fake.last_name()
        sentences = random.randint(1,3)
        text = fake.paragraph(nb_sentences=sentences)

        seeder.add_entity(Comment, 1, {
            "blog" : lambda x : Blog.objects.get(id=random.randint(1,14)),
            "name" : lambda x :name+""+last_name,
            "email" : lambda x : name+"@mail.com",
            "date" : lambda x : dates[random.randint(0,4)],
            "text" : lambda x : text,
            "image" : lambda x : "user/u"+str(random.randint(1,3))+".png",
        })
        pks = seeder.execute()
        print(pks)

def run_reply():
    seeder=Seed.seeder()

    dates = ["2024-06-20", "2024-06-10", "2024-06-03", "2024-06-12", "2024-06-07"]
    
    for i in range(10):
        fake = Faker()
        name = fake.first_name()
        last_name = fake.last_name()
        sentences = random.randint(1,3)
        text = fake.paragraph(nb_sentences=sentences)

        seeder.add_entity(Reply, 1, {
            "comment" : lambda x : Comment.objects.get(id=random.randint(1,20)),
            "name" : lambda x :name+""+last_name,
            "email" : lambda x : name+"@mail.com",
            "date" : lambda x : dates[random.randint(0,4)],
            "text" : lambda x : text,
            "image" : lambda x : "user/u"+str(random.randint(1,3))+".png",
        })
        pks = seeder.execute()
        print(pks)
