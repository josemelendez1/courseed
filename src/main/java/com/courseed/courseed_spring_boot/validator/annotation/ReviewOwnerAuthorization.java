package com.courseed.courseed_spring_boot.validator.annotation;

import java.lang.annotation.Target;

import com.courseed.courseed_spring_boot.validator.ReviewOwnerAuthorizationValidator;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ReviewOwnerAuthorizationValidator.class)
public @interface ReviewOwnerAuthorization {
    String message() default "No puedes eliminar esta reseña. Solo el creador original tiene permiso para hacerlo.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
