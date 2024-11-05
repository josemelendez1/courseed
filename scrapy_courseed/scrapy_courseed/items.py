# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy

class CourseItem (scrapy.Item):
    #Category
    category_name = scrapy.Field()

    #Institution
    institution_name = scrapy.Field()

    #Course
    url = scrapy.Field()
    title = scrapy.Field()
    description = scrapy.Field()
    price = scrapy.Field()
    duration = scrapy.Field()
    video = scrapy.Field()

    #About
    about_description = scrapy.Field()
    about_level = scrapy.Field()
    about_language = scrapy.Field()

    #Contents
    contents = scrapy.Field()

    #Image
    image_urls = scrapy.Field()
    images = scrapy.Field()
    pass