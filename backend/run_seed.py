import django
django.setup()
from app import seed

if __name__ == "__main__":
    
    seed.run_roles()
    seed.run_user_images()
    seed.run_users()

    seed.run_Room()
    seed.run_RoomImg()
    seed.run_banner()

    seed.run_hotelResort()
    seed.run_hotelResortImg()

    seed.run_facilityImg()
    seed.run_facilityIcon()
    seed.run_facility()
    seed.run_facilitySection()

    seed.run_employeesImg()
    seed.run_employee()
    seed.run_managerImg()
    seed.run_manager()