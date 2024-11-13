package com.courseed.courseed_spring_boot.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.courseed.courseed_spring_boot.service.ReviewService;
import com.courseed.courseed_spring_boot.validator.annotation.ExistReview;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@Component
public class ExistReviewValidator implements ConstraintValidator<ExistReview, Long> {

    @Autowired
    private ReviewService reviewService;

    @Override
    public boolean isValid(Long id, ConstraintValidatorContext arg1) {
        if (reviewService == null) return true;
        return id != null && reviewService.findById(id) != null;
    }
    
}
