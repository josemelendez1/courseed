package com.courseed.courseed_spring_boot.validator.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.courseed.courseed_spring_boot.validator.AlphabeticalUsernameValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = AlphabeticalUsernameValidator.class)

public @interface AlphabeticalUsername {
    String message() default "Asegúrate de que tu nombre de usuario esté en minúsculas y no contenga espacios ni símbolos. Solo se permiten letras.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
