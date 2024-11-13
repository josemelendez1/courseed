package com.courseed.courseed_spring_boot.dto.review;

import java.io.Serializable;

import com.courseed.courseed_spring_boot.validator.annotation.ExistCourse;
import com.courseed.courseed_spring_boot.validator.annotation.UniqueReviewPerCourse;

import jakarta.validation.GroupSequence;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@GroupSequence({ CreateReviewDto.class, FirstValidationCreateReviewDto.class, SecondValidationCreateReviewDto.class })
public class CreateReviewDto implements Serializable {
    @NotBlank(message = "La descripción de una reseña es obligatoria, intente nuevamente.", groups = FirstValidationCreateReviewDto.class)
    @Size(min = 5, max = 500, message = "Por favor, ingrese un valor entre 5 y 500 caracteres.", groups = SecondValidationCreateReviewDto.class)
    private String description;
    
    @Min(value = 1, message = "La calificación debe ser al menos 1.", groups = FirstValidationCreateReviewDto.class)
    @Max(value = 5, message = "La calificación no puede ser mayor a 5.", groups = SecondValidationCreateReviewDto.class)
    private int rating;

    @ExistCourse(groups = FirstValidationCreateReviewDto.class)
    @UniqueReviewPerCourse(groups = FirstValidationCreateReviewDto.class)
    private Long courseId;
}

interface FirstValidationCreateReviewDto {};
interface SecondValidationCreateReviewDto {};