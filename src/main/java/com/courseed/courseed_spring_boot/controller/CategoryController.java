package com.courseed.courseed_spring_boot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.courseed.courseed_spring_boot.dto.course.CategoryDto;
import com.courseed.courseed_spring_boot.service.CategoryService;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;


@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryDto>> getCategories() {
        List<CategoryDto> categories = categoryService.getCategories();
        return ResponseEntity.ok(categories);
    }
}
