import scrapy
import json
from ..items import CourseItem

class JaverianaSpider(scrapy.Spider):
    name = "javeriana"
    page_url = "https://educacionvirtual.javeriana.edu.co"

    def start_requests(self):
        params = {
            "query": "",
            "visibilidad": "yes",
            "tipoPrograma": "",
            "areas": "",
            "facultad": "",
            "modalidad": "",
            "nivel": "",
            "tipoTutoria": "",
            "responsable": "EDUCON"
        }
        urls = ["https://educacionvirtual.javeriana.edu.co/prg-api/searchpuj/general-search-program"]
        
        for url in urls:
            yield scrapy.Request(
                url=url, 
                method="POST", 
                body=json.dumps(params), 
                callback=self.parse, 
                headers={'Content-Type':'application/json'}
            )

    def parse(self, response):
        json_response = response.json()

        for course in json_response:
            if course["areas"]:
                yield scrapy.Request(
                    url=self.get_absolute_url(url=course["urlPrograma"]), 
                    callback=self.parse_item, 
                    meta={
                        "category": course["areas"][0],
                        "title": course["nombre"],
                        "url_image": self.get_absolute_url(url=course["urlImagenPrograma"]),
                        "description": course["descripcion"]
                    }
                )
                
    def parse_item(self, response):
        item = CourseItem()
        item["url"] = response.url
        item["title"] = response.meta.get("title")
        item["description"] = [i.strip() for i in response.css("div.course-wrapper-content--objectives-general *::text").getall()]
        item["description"] = list(filter(lambda i : i != "Objetivos generales" , item["description"]))
        item["description"] = list(filter(lambda i : i != "Objetivo general" , item["description"]))
        item["description"] = "".join(item["description"])
        item["price"] = [i.strip() for i in response.css("div.course-wrapper-sidebar--prices-cop h2 *::text").getall()]
        item["price"] = "".join(item["price"])
        item["duration"] = [i.strip() for i in response.css("div.course-wrapper-sidebar--table-time *::text").getall()]
        item["duration"] = list(filter(lambda i : i != "DURACIÓN", item["duration"]))
        item["duration"] = "".join(item["duration"]).lower()
        item["about_description"] = response.meta.get("description")
        item["about_level"] = [i.strip() for i in response.css("div.course-wrapper-sidebar--table-level *::text").getall()]
        item["about_level"] = list(filter(lambda i : i != "NIVEL", item["about_level"]))
        item["about_level"] = "".join(item["about_level"]).lower()
        item["about_language"] = "español"
        item["contents"] = response.css("div.course-wrapper-content--academic li::text").getall()
        item["category_name"] = response.meta.get("category")
        item["institution_name"] = "javeriana"
        item["image_urls"] = [response.meta.get("url_image")]
 
        yield item
    
    def get_absolute_url(self, url):
        relative_url = url if url[0] == "/" or self.page_url in url or url.startswith("http") else f"/{url}"
        return relative_url if self.page_url in relative_url or url.startswith("http") else self.page_url + relative_url
