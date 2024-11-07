from typing import Iterable
import scrapy
from ..items import CourseItem

class UnimagdalenaSpider(scrapy.Spider):
    name = "unimagdalena"

    def start_requests(self):
        urls = ["https://bloque10.unimagdalena.edu.co/diplomados-ciencias-basicas/"]

        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        next_page = response.css("span.page-numbers.current").xpath("following-sibling::a/@href").get()
        current_category = response.meta.get("category") if response.meta.get("category") else response.css("li.current-menu-item a::text").get()
        next_category = response.css("li.current-menu-item").xpath("following-sibling::li/a/@href").get()
        courses = response.css("article.elementor-grid-item").getall()

        for course in courses:
            title = scrapy.Selector(text=course).css("h3.elementor-post__title a::text").get()
            url = scrapy.Selector(text=course).css("a.elementor-post__thumbnail__link::attr(href)").get()
            yield scrapy.Request(
                url=url, 
                callback=self.parse_course, 
                meta={
                    "title": title,
                    "category": current_category
                }
            )

        if next_page is not None:
            yield scrapy.Request(
                url=next_page, 
                callback=self.parse, 
                meta={
                    "category": current_category
                }
            )

        if next_category is not None:
            yield scrapy.Request(url=next_category, callback=self.parse)

    def parse_course(self, response):
        item = CourseItem()
        item["url"] = response.url
        item["title"] = response.meta.get("title")
        item["institution_name"] = self.name
        item["category_name"] = response.meta.get("category")
        item["description"] = "".join(response.css("div#objetivos-tab *::text").getall())
        item["price"] = response.css("span:contains('Valor')::text").get()
        item["duration"] = response.css("span:contains('Duración')::text").get()
        item["about_description"] = "".join(response.css("div.bb-elementor-custom-line-height *::text").getall())
        item["about_description"] = item["about_description"] + " " + "".join(response.css("div#contenido-curricular-tab *::text").getall()).strip()
        item["about_description"] = item["about_description"].replace("\t", "").replace("\xa0", "")
        item["about_level"] = "introductorio"
        item["about_language"] = "español"
        item["contents"] = response.css("div.elementor-button-wrapper span.elementor-button-text::text").getall()
        item["image_urls"] = [response.css("meta[property='og:image']::attr(content)").get()]
 
        yield item