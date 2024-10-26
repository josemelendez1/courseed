package com.courseed.courseed_spring_boot.validator.annotation;

import java.lang.annotation.Target;

import com.courseed.courseed_spring_boot.validator.OnlyCommentCreatorValidator;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;


@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = OnlyCommentCreatorValidator.class)
public @interface OnlyCommentCreator {
    String message() default "Solo el usuario que creó el comentario tiene la autorización para realizar cambios.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
