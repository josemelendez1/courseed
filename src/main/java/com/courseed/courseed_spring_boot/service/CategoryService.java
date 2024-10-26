package com.courseed.courseed_spring_boot.service;

import org.springframework.stereotype.Service;

import com.courseed.courseed_spring_boot.dto.course.CategoryDto;
import com.courseed.courseed_spring_boot.entity.Category;
import com.courseed.courseed_spring_boot.repository.CategoryRepository;

import lombok.AllArgsConstructor;
import java.util.List;

@Service
@AllArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public List<CategoryDto> getCategories() {
        return categoryRepository.findAll().stream().map(CategoryDto::fromEntity).toList();
    }

    public List<Category> getCategoriesByNameIn(List<String> categoryNames) {
        return categoryRepository.findByNameIn(categoryNames);
    }
}
