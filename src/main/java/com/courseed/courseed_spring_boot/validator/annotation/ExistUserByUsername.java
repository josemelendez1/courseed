package com.courseed.courseed_spring_boot.validator.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.courseed.courseed_spring_boot.validator.ExistUserByUsernameValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ExistUserByUsernameValidator.class)
public @interface ExistUserByUsername {
    String message() default "El usuario no se encuentra registrado, intente nuevamente.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};     
}
