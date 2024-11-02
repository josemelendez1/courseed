# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from googletrans import Translator
from .models.category import Category
from .models.institution import Institution
from .models.course import Course
from .models.about import About
from .models.content import Content
from scrapy.selector import Selector

class TransformPipeline:
    def process_item(self, item, spider):
        adapter = ItemAdapter(item)

        #Category
        adapter["category_name"] = adapter.get("category_name").strip() if adapter.get("category_name") is not None else ""

        #Institution
        adapter["institution_name"] = adapter.get("institution_name").strip() if adapter.get("institution_name") is not None else ""

        #Courses
        adapter["title"] = adapter.get("title").strip() if adapter.get("title") is not None else ""
        adapter["description"] = adapter.get("description").strip() if adapter.get("description") is not None else ""
        adapter["price"] = adapter.get("price").strip() if adapter.get("price") is not None else ""
        adapter["duration"] = adapter.get("duration").strip() if adapter.get("duration") is not None else ""

        #About
        adapter["about_description"] = adapter.get("about_description").strip() if adapter.get("about_description") is not None else ""
        adapter["about_level"] = adapter.get("about_level").strip() if adapter.get("about_level") is not None else ""
        adapter["about_prerequisites"] = adapter.get("about_prerequisites").strip() if adapter.get("about_prerequisites") is not None else ""
        adapter["about_language"] = adapter.get("about_language").strip() if adapter.get("about_language") is not None else ""

        #Contents
        transform_contents = []
        if (isinstance(adapter.get("contents"), list)):
            for text in adapter.get("contents"):
                if text is not None and text.strip() != "":
                    transform_contents.append(text.strip())

        adapter["contents"] = transform_contents

        return item
    
class MigratePipeline:
    def process_item(self, item, spider):
        adapter = ItemAdapter(item)

        #Category
        category, category_created = Category.get_or_create(name = adapter.get("category_name"))

        #Institution
        institution, institution_created = Institution.get_or_create(name = adapter.get("institution_name"))

        #Course
        course, course_created = Course.get_or_create(
            title = adapter.get("title"),
            defaults = {
                "url": adapter.get("url"),
                "description": adapter.get("description"),
                "image": adapter.get("images")[0]["path"],
                "video": adapter.get("video"),
                "price": adapter.get("price"),
                "duration": adapter.get("duration"),
                "category_id": category.id if category is not None else category_created.id,
                "institution_id": institution.id if institution is not None else institution_created.id
            }
        )

        #About
        About.get_or_create(
            course_id = course.id if course is not None else course_created.id,
            defaults = {
                "description": adapter.get("about_description"),
                "level": adapter.get("about_level"),
                "prerequisites": adapter.get("about_prerequisites"),
                "language": adapter.get("about_language") 
            }    
        )

        #Contents
        for text in adapter.get("contents"):
            Content.get_or_create(
                name = text,
                course_id = course.id if course is not None else course_created.id
            )

        return item