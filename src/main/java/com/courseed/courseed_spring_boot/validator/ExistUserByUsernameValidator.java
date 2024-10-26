package com.courseed.courseed_spring_boot.validator;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.courseed.courseed_spring_boot.entity.User;
import com.courseed.courseed_spring_boot.service.UserService;
import com.courseed.courseed_spring_boot.validator.annotation.ExistUserByUsername;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@Component
public class ExistUserByUsernameValidator implements ConstraintValidator<ExistUserByUsername, String> {
    
    @Autowired
    private UserService userService;

    @Override
    public boolean isValid(String username, ConstraintValidatorContext context) {
        if (userService == null) return true; 
        if (username == null) return false;

        Optional<User> users = userService.findByUserName(username);
        return users.isPresent();
    }
}
