package com.courseed.courseed_spring_boot.dto.course;

import java.io.Serializable;

import com.courseed.courseed_spring_boot.entity.About;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AboutDto implements Serializable {
    private String description;
    private String language;
    private String level;
    
    public static AboutDto fromEntity(About about) {
        return new AboutDto(
            about.getDescription(),
            about.getLanguage(),
            about.getLevel()
        );
    }
}
