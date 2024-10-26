package com.courseed.courseed_spring_boot.validator.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.courseed.courseed_spring_boot.validator.MatchPasswordValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import static java.lang.annotation.ElementType.TYPE;

@Target({TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = MatchPasswordValidator.class)
public @interface MatchPassword {
    String message() default "Las contraseñas ingresadas no son iguales. Verifica y prueba nuevamente.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
