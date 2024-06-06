import django
django.setup()
from app import seed

if __name__ == "__main__":
    # seed.run_roles()
    # seed.run_user_images()
    seed.run_users()