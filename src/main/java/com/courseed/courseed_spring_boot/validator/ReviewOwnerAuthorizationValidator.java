package com.courseed.courseed_spring_boot.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.courseed.courseed_spring_boot.dto.review.ReviewDto;
import com.courseed.courseed_spring_boot.service.ReviewService;
import com.courseed.courseed_spring_boot.validator.annotation.ReviewOwnerAuthorization;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@Component
public class ReviewOwnerAuthorizationValidator implements ConstraintValidator<ReviewOwnerAuthorization, Long> {

    @Autowired
    private ReviewService reviewService;

    @Override
    public boolean isValid(Long id, ConstraintValidatorContext context) {
        if (reviewService == null) return true;
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        ReviewDto reviewDto = reviewService.findById(id);
        
        return reviewDto != null && reviewDto.getUsername().equals(authentication.getName());
    }   
}
