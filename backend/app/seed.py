from django_seed import Seed
from .models import *
import random


# roles
def run_roles():
    roles = ["admin","user","receptionist","editor","webmaster"]
    seeder = Seed.seeder()

    for r in roles:
        seeder.add_entity(Role, 1, {
            "name" :  lambda x : r
        })
        pks = seeder.execute()
        print(pks)



# 