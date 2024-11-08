package com.courseed.courseed_spring_boot.dto.comment;

import java.io.Serializable;

import com.courseed.courseed_spring_boot.validator.annotation.ExistCourse;

import jakarta.validation.GroupSequence;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@GroupSequence({ CreateCommentDto.class, FirstValidationCreateCommentDto.class, SecondValidationCreateCommentDto.class })
public class CreateCommentDto implements Serializable {
    @NotBlank(message = "El contenido de un comentario es obligatorio, intente nuevamente.", groups = FirstValidationCreateCommentDto.class)
    @Size(min = 5, max = 500, message = "Por favor, ingrese un valor entre 5 y 500 caracteres.", groups = SecondValidationCreateCommentDto.class)
    private String content;

    @ExistCourse(groups = FirstValidationCreateCommentDto.class)
    private Long courseId;
}

interface FirstValidationCreateCommentDto {};
interface SecondValidationCreateCommentDto {};