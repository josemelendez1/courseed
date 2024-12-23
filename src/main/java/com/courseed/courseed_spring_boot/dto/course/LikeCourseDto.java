package com.courseed.courseed_spring_boot.dto.course;

import java.io.Serializable;

import com.courseed.courseed_spring_boot.entity.Course;
import com.courseed.courseed_spring_boot.validator.annotation.ExistCourse;

import lombok.Data;

@Data
public class LikeCourseDto implements Serializable {

    @ExistCourse
    private Long courseId;

    private boolean like;

    public static LikeCourseDto fromEntity(Course course) {
        LikeCourseDto likeCourseDto = new LikeCourseDto();
        likeCourseDto.setCourseId(course.getId());
        likeCourseDto.setLike(true);
        return likeCourseDto;
    }
}
