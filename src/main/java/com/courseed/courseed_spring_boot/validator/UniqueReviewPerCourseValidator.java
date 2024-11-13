package com.courseed.courseed_spring_boot.validator;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.courseed.courseed_spring_boot.dto.review.ReviewDto;
import com.courseed.courseed_spring_boot.service.ReviewService;
import com.courseed.courseed_spring_boot.validator.annotation.UniqueReviewPerCourse;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@Component
public class UniqueReviewPerCourseValidator implements ConstraintValidator<UniqueReviewPerCourse, Long> {

    @Autowired
    private ReviewService reviewService;

    @Override
    public boolean isValid(Long courseId, ConstraintValidatorContext context) {
        if (reviewService == null) return true;

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List<ReviewDto> reviews = reviewService.findByUsername(authentication.getName());

        return reviews != null && !reviews.stream().anyMatch(review -> review.getId() == courseId);
    }
}
