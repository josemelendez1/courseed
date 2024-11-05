from typing import Iterable
import scrapy
from ..items import CourseItem

class UaoSpider(scrapy.Spider):
    name = "uao"
    large_name = "universidad autónoma de occidente"

    def start_requests(self):
        urls = ["https://estudiarvirtual.uao.edu.co/categoria/autogestionado/"]
        
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        next_page = response.css("a.next::attr(href)").get()
        courses = response.css("div.tc-cards-container div.virtual-program-card").getall()

        for course in courses:
            url = scrapy.Selector(text=course).css("a::attr(href)").get()
            category = scrapy.Selector(text=course).css("div.vpct-category::text").get()
            title = scrapy.Selector(text=course).css("p.vpcb-program::text").get()
            duration = scrapy.Selector(text=course).css("p.vpcb-duration::text").get()
            yield scrapy.Request(
                url=url,
                callback=self.parse_course,
                meta={
                    "title": title,
                    "category": category,
                    "duration": duration
                }
            )

        if next_page is not None:
            yield scrapy.Request(url=next_page, callback=self.parse)

    def parse_course(self, response):
        item = CourseItem()
        item["url"] = response.url
        item["title"] = response.meta.get("title")
        item["price"] = response.css("p:contains('Valor periodo académico')").xpath("following-sibling::p/text()").get()
        item["price"] = response.css("span.term::text").get() if not item["price"] else item["price"]
        item["duration"] = response.meta.get("duration")
        item["description"] = response.css("h2:contains('Dirigido a')").xpath("following-sibling::p/text()").get()
        item["description"] = response.css("h2:contains('¿Qué vas a obtener?')").xpath("following-sibling::p/text()").get() if not item["description"] else item["description"]
        item["description"] = response.css("h2:contains('¿Cómo vas a aprender?')").xpath("following-sibling::p/text()").get() if not item["description"] else item["description"]
        item["description"] = response.css("h2:contains('Metodología')").xpath("following-sibling::p/text()").get() if not item["description"] else item["description"]
        item["description"] = response.css("h2:contains('Metología')") if not item["description"] else item["description"]
        item["category_name"] = response.meta.get("category")
        item["institution_name"] = self.large_name
        item["about_description"] = response.css("h2:contains('¿Por qué tomar el Curso?')").xpath("following-sibling::p/text()").get()
        item["about_description"] = response.css("h2:contains('¿Por qué hacerlo?')").xpath("following-sibling::p/text()").get() if not item["about_description"] else item["about_description"]
        item["about_description"] = item["about_description"].replace("\xa0", "")
        item["about_level"] = "sin información"
        item["about_language"] = "ingles" if "english" in response.url else "español"
        item["contents"] = response.css("li.virtual-curriculum-item p::text").getall()
        item["image_urls"] = [response.css("img.wp-post-image::attr(src)").get()]

        yield item
