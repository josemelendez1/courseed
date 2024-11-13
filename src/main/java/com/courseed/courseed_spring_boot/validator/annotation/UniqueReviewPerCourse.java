package com.courseed.courseed_spring_boot.validator.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.courseed.courseed_spring_boot.validator.UniqueReviewPerCourseValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UniqueReviewPerCourseValidator.class)
public @interface UniqueReviewPerCourse {
    String message() default "Solo puedes dejar una reseña por curso. Ya has escrito una reseña para este curso.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}