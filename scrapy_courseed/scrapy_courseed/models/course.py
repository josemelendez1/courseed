from peewee import Model, CharField, TextField, BigAutoField, BigIntegerField
from ..database.mysql import database

class Course (Model):
    id = BigAutoField()
    url = TextField()
    image = TextField()
    video = TextField()
    title = CharField()
    description = TextField()
    price = TextField()
    duration = CharField()
    category_id = BigIntegerField()
    institution_id = BigIntegerField()
    
    class Meta:
        database = database
        db_table = "courses"