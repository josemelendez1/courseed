package com.courseed.courseed_spring_boot.dto.course;

import com.courseed.courseed_spring_boot.entity.Course;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseDto {
    private Long id;
    private String url;
    private String image;
    private String video;
    private String title;
    private String description;
    private Float price;
    private String duration;
    private String category;
    private String institution;
    private AboutDto about;
    private List<ContentDto> contents;
    private int likes;

    public static CourseDto fromEntity(Course course) {
        CourseDto courseDto = new CourseDto(
            course.getId(),
            course.getUrl(), 
            course.getImage(),
            course.getVideo(),
            course.getTitle(),
            course.getDescription(),
            course.getPrice(),
            course.getDuration(),
            course.getCategory().getName(),
            course.getInstitution().getName(),
            AboutDto.fromEntity(course.getAbout()),
            course.getContents().stream().map(ContentDto::fromEntity).toList(),
            course.getInterestedUsers().size()
        );
        
        return courseDto;
    }
}
