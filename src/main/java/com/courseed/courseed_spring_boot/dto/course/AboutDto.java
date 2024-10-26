package com.courseed.courseed_spring_boot.dto.course;

import com.courseed.courseed_spring_boot.entity.About;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AboutDto {
    private String description;
    private String language;
    private String level;
    private String prerequisites;
    
    public static AboutDto fromEntity(About about) {
        return new AboutDto(
            about.getDescription(),
            about.getLanguage(),
            about.getLevel(),
            about.getPrerequisites()
        );
    }
}
