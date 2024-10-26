package com.courseed.courseed_spring_boot.validator;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.courseed.courseed_spring_boot.annotation.UniqueEmail;
import com.courseed.courseed_spring_boot.entity.User;
import com.courseed.courseed_spring_boot.service.UserService;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@Component
public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {
    
    @Autowired
    private UserService userService;
    
    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        if (userService == null) {
            return true;
        }
        
        if (email == null) {
            return false;
        }

        Optional<User> user = userService.findByEmail(email);
        return user.isEmpty();
    }
}