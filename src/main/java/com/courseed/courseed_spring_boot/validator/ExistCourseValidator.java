package com.courseed.courseed_spring_boot.validator;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.courseed.courseed_spring_boot.entity.Course;
import com.courseed.courseed_spring_boot.service.CourseService;
import com.courseed.courseed_spring_boot.validator.annotation.ExistCourse;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@Component
public class ExistCourseValidator implements ConstraintValidator<ExistCourse, Long> {
    
    @Autowired
    private CourseService courseService;

    @Override
    public boolean isValid(Long id, ConstraintValidatorContext context) {
        if (courseService == null) {
            return true;
        }    

        if (id == null) {
            return false;
        }

        Optional<Course> courses = courseService.findById(id);
        return !courses.isEmpty();
    }
}
