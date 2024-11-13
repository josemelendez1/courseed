package com.courseed.courseed_spring_boot.dto.review;

import java.io.Serializable;

import com.courseed.courseed_spring_boot.validator.annotation.ExistReview;
import com.courseed.courseed_spring_boot.validator.annotation.ReviewOwnerAuthorization;

import jakarta.validation.GroupSequence;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@GroupSequence({ UpdateReviewDto.class, FirstValidationUpdateReviewDto.class, SecondValidationUpdateReviewDto.class })
public class UpdateReviewDto implements Serializable {

    @ExistReview(groups = FirstValidationUpdateReviewDto.class)
    @ReviewOwnerAuthorization(message = "No puedes actualizar esta reseña. Solo el creador original tiene permiso para hacerlo.",groups = SecondValidationUpdateReviewDto.class)
    private Long id;

    @NotBlank(message = "La descripción de una reseña es obligatoria, intente nuevamente.", groups = FirstValidationUpdateReviewDto.class)
    @Size(min = 5, max = 500, message = "Por favor, ingrese un valor entre 5 y 500 caracteres.", groups = SecondValidationUpdateReviewDto.class)
    private String description;

    @Min(value = 1, message = "La calificación debe ser al menos 1.", groups = FirstValidationUpdateReviewDto.class)
    @Max(value = 5, message = "La calificación no puede ser mayor a 5.", groups = SecondValidationUpdateReviewDto.class)
    private int rating;
}

interface FirstValidationUpdateReviewDto {};
interface SecondValidationUpdateReviewDto {};
