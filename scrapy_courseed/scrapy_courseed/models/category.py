from peewee import Model, CharField, BigAutoField
from ..database.mysql import database

class Category (Model):
    id = BigAutoField()
    name = CharField()
    
    class Meta:
        database = database
        db_table = "categories"