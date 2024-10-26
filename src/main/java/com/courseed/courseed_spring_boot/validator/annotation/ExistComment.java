package com.courseed.courseed_spring_boot.validator.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.courseed.courseed_spring_boot.validator.ExistCommentValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ExistCommentValidator.class)
public @interface ExistComment {
    String message() default "El comentario no se encuentra registrado, intente nuevamente.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};  
}
