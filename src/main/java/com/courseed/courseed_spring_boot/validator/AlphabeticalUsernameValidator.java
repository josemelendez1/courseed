package com.courseed.courseed_spring_boot.validator;

import com.courseed.courseed_spring_boot.validator.annotation.AlphabeticalUsername;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class AlphabeticalUsernameValidator implements ConstraintValidator<AlphabeticalUsername, String> {

    @Override
    public boolean isValid(String username, ConstraintValidatorContext context) {
        return username.matches("[a-z]+");
    }
    
}
