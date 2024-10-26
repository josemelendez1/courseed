package com.courseed.courseed_spring_boot.dto.course;

import com.courseed.courseed_spring_boot.entity.Category;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryDto {
    private String name;

    public static CategoryDto fromEntity(Category category) {
        CategoryDto categoryDto = new CategoryDto(category.getName());
        
        return categoryDto;
    }
}
