package com.courseed.courseed_spring_boot.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.courseed.courseed_spring_boot.entity.User;
import com.courseed.courseed_spring_boot.service.UserService;
import com.courseed.courseed_spring_boot.validator.annotation.CheckAuthPassword;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Optional;

@Component
public class CheckAuthPasswordValidator implements ConstraintValidator<CheckAuthPassword, String> {
    
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        if (userService == null) {
            return true;
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<User> users = userService.findByUserName(authentication.getName());

        return users.isPresent() && passwordEncoder.matches(password, users.get().getPassword());
    }
}
