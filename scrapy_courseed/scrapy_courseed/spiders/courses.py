import scrapy
import json
from ..items import CourseItem
from scrapy.exceptions import CloseSpider

class ToScrapeCSSSpider(scrapy.Spider):
    name = "courses"
    handle_httpstatus_list = [404]
    page_count = 500
    page_url = "https://www.edx.org"

    def start_requests(self):
        params = {"requests":[{"indexName":"product","params":"clickAnalytics=true&facetFilters=%5B%22product%3ACourse%22%5D&facets=%5B%22availability%22%2C%22language%22%2C%22learning_type%22%2C%22level%22%2C%22partner%22%2C%22product%22%2C%22program_type%22%2C%22skills.skill%22%2C%22subject%22%5D&filters=(product%3A%22Course%22%20OR%20product%3A%22Program%22%20OR%20product%3A%22Executive%20Education%22%20OR%20product%3A%22Boot%20Camp%22%20OR%20product%3A%222U%20Degree%22)%20AND%20NOT%20blocked_in%3A%22CO%22%20AND%20(allowed_in%3A%22null%22%20OR%20allowed_in%3A%22CO%22)&hitsPerPage=24&page=0&query=&tagFilters="}]}

        yield scrapy.Request(
            url="https://igsyv1z1xi-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.23.3)%3B%20Browser%20(lite)%3B%20JS%20Helper%20(3.14.0)&x-algolia-api-key=1f72394b5b49fc876026952685f5defe&x-algolia-application-id=IGSYV1Z1XI", 
            method="POST",
            body=json.dumps(params),
            callback=self.parse
        )

    def parse(self, response):
        def create_course_link(course):
            marketing_url = str(course["marketing_url"])
            path = marketing_url.replace(self.page_url, "")
            return "https://www.edx.org/page-data" + path + "/page-data.json"
        
        if response.status == 404:
            raise CloseSpider('Recieve 404 response')
        
        json_response = response.json()
        courses = json_response["results"][0]["hits"]
        courses_links = list(map(create_course_link, courses))

        yield from response.follow_all(courses_links, self.parse_item, meta={"page": response.url})
        
        self.page_count += 1
        params = {"requests":[{"indexName":"product","params":f"clickAnalytics=true&facetFilters=%5B%22product%3ACourse%22%5D&facets=%5B%22availability%22%2C%22language%22%2C%22learning_type%22%2C%22level%22%2C%22partner%22%2C%22product%22%2C%22program_type%22%2C%22skills.skill%22%2C%22subject%22%5D&filters=(product%3A%22Course%22%20OR%20product%3A%22Program%22%20OR%20product%3A%22Executive%20Education%22%20OR%20product%3A%22Boot%20Camp%22%20OR%20product%3A%222U%20Degree%22)%20AND%20NOT%20blocked_in%3A%22CO%22%20AND%20(allowed_in%3A%22null%22%20OR%20allowed_in%3A%22CO%22)&hitsPerPage=24&page={self.page_count}&query=&tagFilters="}]}
        yield scrapy.Request(
            url="https://igsyv1z1xi-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.23.3)%3B%20Browser%20(lite)%3B%20JS%20Helper%20(3.14.0)&x-algolia-api-key=1f72394b5b49fc876026952685f5defe&x-algolia-application-id=IGSYV1Z1XI",
            method="POST",
            body=json.dumps(params),
            callback=self.parse
        )
            

    def parse_item(self, response):
        json_response = response.json()

        course = json_response["result"]["pageContext"]["course"]
        
        item = CourseItem()

        # Category
        item["category_name"] = course["subjects"][0]["name"]

        # Institution
        item["institution_name"] = course["owners"][0]["key"]

        # Course
        item["url"] = response.url
        item["title"] = course["title"]
        item["description"] = course["shortDescription"]
        item["price"] = course["activeCourseRun"]["seats"][0]["price"]
        item["duration"] = str(course["activeCourseRun"]["weeksToComplete"]) + " weeks"
        item["video"] = course["video"]["src"] if course["video"] is not None else None
 
        #About
        item["about_description"] = course["fullDescription"]
        item["about_level"] = course["levelType"]
        item["about_prerequisites"] = course["prerequisitesRaw"] 
        item["about_language"] = json_response["result"]["pageContext"]["language"]

        #Contents
        item["contents"] = course["outcome"]

        #Image
        item["image_urls"] = [course["originalImage"]["src"]]

        yield item