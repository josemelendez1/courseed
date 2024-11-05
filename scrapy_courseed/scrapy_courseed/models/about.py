from peewee import Model, CharField, TextField, BigAutoField, BigIntegerField
from ..database.mysql import database

class About (Model):
    id = BigAutoField()
    description = TextField()
    level = CharField()
    language = CharField()
    course_id = BigIntegerField()
    
    class Meta:
        database = database
        db_table = "abouts"