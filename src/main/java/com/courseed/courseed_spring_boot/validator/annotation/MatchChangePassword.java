package com.courseed.courseed_spring_boot.validator.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.courseed.courseed_spring_boot.validator.MatchChangePasswordValidator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import static java.lang.annotation.ElementType.TYPE;

@Target({TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = MatchChangePasswordValidator.class)
public @interface MatchChangePassword {
    String message() default "La confirmación de contraseña no coincide con la contraseña ingresada. Verifica e intenta nuevamente.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
