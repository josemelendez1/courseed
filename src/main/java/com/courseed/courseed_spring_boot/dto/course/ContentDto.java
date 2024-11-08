package com.courseed.courseed_spring_boot.dto.course;

import java.io.Serializable;

import com.courseed.courseed_spring_boot.entity.Content;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContentDto implements Serializable {
    private String name;

    public static ContentDto fromEntity(Content content) {
        ContentDto contentDto = new ContentDto(content.getName());
        
        return contentDto;
    }
}