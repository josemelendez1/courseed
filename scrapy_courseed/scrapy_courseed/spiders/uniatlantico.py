import scrapy
from ..items import CourseItem

class UniatlanticoSpider(scrapy.Spider):
    name = "uniatlantico"
    start_url = "https://www.uniatlantico.edu.co/departamento-de-extension-y-proyeccion-social/diplomados/"
    
    def start_requests(self):
        yield scrapy.Request(url=self.start_url, callback=self.parse)

    def parse(self, response):
        urls = response.css("img.attachment-large.size-large").xpath("../@href").getall()
        
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse_faculty)

    def parse_faculty(self, response):
        urls = response.css("img.attachment-large.size-large").xpath("../@href").getall()
        urls = list(filter(lambda i : not i.endswith(".pdf"), urls))

        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse_course, meta={"category":self.get_category(url=response.url)})
        
    def parse_course(self, response):
        item = CourseItem()

        item["institution_name"] = "uniatlantico"
        item["category_name"] = response.meta.get("category")
        item["url"] = response.url
        item["title"] = response.css("h1.heading::text").get()
        item["description"] = response.css("h2.elementor-heading-title.elementor-size-default:contains('Dirigido a')").xpath("../../../../../../following-sibling::section/following-sibling::section").get()
        item["description"] = "".join(scrapy.Selector(text=item["description"]).css("p *::text").getall())
        item["price"] = "Sin información"
        item["duration"] = response.css("strong:contains('Duración')").xpath("following-sibling::text()").get()
        item["duration"] = item["duration"] if item["duration"] else "sin información"
        item["about_description"] = response.css("img.attachment-large.size-large").xpath("../../../../following-sibling::div//p").get()
        item["about_description"] = "".join(scrapy.Selector(text=item["about_description"]).css("*::text").getall()).replace("\xa0", "")
        item["about_level"] = "introductorio"
        item["about_language"] = "ingles" if "Inglés" in item["title"] else "español"
        item["contents"] = response.css("h2.elementor-heading-title.elementor-size-default:contains('Contenido')").xpath("../../../../../../following-sibling::section/following-sibling::section").get()
        item["contents"] = [i.replace("\xa0", "").replace("\u200b", "") for i in scrapy.Selector(text=item["contents"]).css("*::text").getall()]
        item["image_urls"] = [response.css("img.attachment-large.size-large::attr(src)").get()]

        yield item

    def get_category(self, url):
        category = url.replace(self.start_url, "")
        category = category.replace("diplomados", "")
        category = category.replace("facultad", "")
        category = category.replace("de", "")
        category = category.replace("-", " ")
        category = category.replace("/", " ")
        return category
