package com.courseed.courseed_spring_boot.validator.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.courseed.courseed_spring_boot.validator.ExistReviewValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ExistReviewValidator.class)
public @interface ExistReview {
    String message() default "La reseña no se encuentra registrada, intente nuevamente.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {}; 
}
