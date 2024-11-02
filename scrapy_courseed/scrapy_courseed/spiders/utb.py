from pathlib import Path
from ..items import CourseItem

import scrapy

class QuotesSpider(scrapy.Spider):
    name = "utb"

    def start_requests(self):
        urls = [
            "https://www.utb.edu.co/cursos-diplomados-y-talleres",
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        courses = response.css("div[data-elementor-type='jet-listing-items']")

        for course in courses:
            category = course.css("div.elementor-element.elementor-element-539fa14.elementor-widget.elementor-widget-heading span::text").get()
            url = course.css("div.elementor-element.elementor-element-db465cf.elementor-widget.elementor-widget-heading a::attr(href)").get() 
            yield scrapy.Request(url=url, callback=self.parse_course, meta={"category": category})

    def parse_course(self, response):
        item = CourseItem()

        item["url"] = response.url
        item["category_name"] = response.meta.get('category')
        item["institution_name"] = self.name.upper()
        item["title"] = response.css("h1.elementor-heading-title.elementor-size-default::text").get()
        item["price"] = response.css("div.elementor-element.elementor-align-left.elementor-icon-list--layout-traditional.elementor-list-item-link-full_width.elementor-widget.elementor-widget-icon-list b:contains(Inversión)")
        item["price"] = item["price"].xpath("../descendant-or-self::*/text()")[1] if item["price"] else "$0"
        item["duration"] = response.css("div.elementor-element.elementor-align-left.elementor-icon-list--layout-traditional.elementor-list-item-link-full_width.elementor-widget.elementor-widget-icon-list b:contains(Duración)")
        item["duration"] = item["duration"].xpath("../descendant-or-self::*/text()")[1] if item["duration"] else "Sin información"
        item["description"] = response.css("div.jet-accordion__inner div.jet-toggle__label-text:contains('Objetivos de Estudio')").xpath("../..").css("div.jet-toggle__content-inner li::text").get()
        item["description"] = "".join(response.css("div.jet-accordion__inner div.jet-toggle__label-text:contains('Objetivos de Estudio')").xpath("../..").css("div.jet-toggle__content-inner *::text").getall()) if item["description"] is None else item["description"]
        # item["about_description"] = "".join([i.replace('\n', '') for i in response.css("div.jet-accordion__inner div.jet-toggle__label-text:contains('Por qué estudiar')").xpath("../..").css("div.jet-toggle__content-inner *::text").getall()])
        # item["about_level"] = "Introductorio"
        # item["about_language"] = "Español"
        item["contents"] = response.css("div.jet-accordion__inner div.jet-toggle__label-text:contains('Plan de Estudios')").xpath("../..").css("li::text").getall()
        item["image_urls"] = [response.css("div.elementor-widget.elementor-widget-image[data-element_type='widget'][data-widget_type='image.default'] img.attachment-full.size-full::attr(src)").get()]

        self.logger.info("\n" + "{\n" + 
            f"url: {item['url']}\n" +
            f"title: {item['title']}\n" +
            f"description: {item['description']}\n" +
            f"price: {item['price']}\n" +
            f"duration: {item['duration']}\n" +
            f"category: {item['category_name']}\n" +
            f"institution: {item['institution_name']}\n"
            # f"about_description: {item['about_description']}\n" + 
            # f"about_level: {item['about_level']}\n" +
            # f"about_language: {item['about_language']}\n" + 
            f"contents: {item['contents']}\n" + 
            f"image_urls: {item['image_urls']}\n" +
        "}")