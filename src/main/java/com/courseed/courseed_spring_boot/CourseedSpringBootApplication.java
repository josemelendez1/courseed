package com.courseed.courseed_spring_boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class CourseedSpringBootApplication {

	public static void main(String[] args) {
		SpringApplication.run(CourseedSpringBootApplication.class, args);
	}

}
