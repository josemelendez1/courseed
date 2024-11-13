package com.courseed.courseed_spring_boot.dto.review;

import java.io.Serializable;

import com.courseed.courseed_spring_boot.validator.annotation.ExistReview;
import com.courseed.courseed_spring_boot.validator.annotation.ReviewOwnerAuthorization;

import jakarta.validation.GroupSequence;
import lombok.Data;

@Data
@GroupSequence({ DeleteReviewDto.class, FirstValidationDeleteReviewDto.class, SecondValidationDeleteReviewDto.class })
public class DeleteReviewDto implements Serializable {
    
    @ExistReview(groups = FirstValidationDeleteReviewDto.class)
    @ReviewOwnerAuthorization(groups = SecondValidationDeleteReviewDto.class)
    private Long id;

}

interface FirstValidationDeleteReviewDto {};
interface SecondValidationDeleteReviewDto {};