from peewee import Model, CharField, TextField, BigAutoField, BigIntegerField
from ..database.mysql import database

class Content (Model):
    id = BigAutoField()
    name = TextField()
    course_id = BigIntegerField()
    
    class Meta:
        database = database
        db_table = "contents"