package com.courseed.courseed_spring_boot.dto.comment;

import java.io.Serializable;

import com.courseed.courseed_spring_boot.validator.annotation.ExistComment;
import com.courseed.courseed_spring_boot.validator.annotation.OnlyCommentCreator;

import jakarta.validation.GroupSequence;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@GroupSequence({ UpdateCommentDto.class, FirstValidationUpdateCommentDto.class, SecondValidationUpdateCommentDto.class })
public class UpdateCommentDto implements Serializable {

    @NotBlank(message = "El contenido de un comentario es obligatorio, intente nuevamente.", groups = FirstValidationUpdateCommentDto.class)
    @Size(min = 5, max = 500, message = "Por favor, ingrese un valor entre 5 y 500 caracteres.", groups = SecondValidationUpdateCommentDto.class)
    private String content;

    @ExistComment(groups = FirstValidationUpdateCommentDto.class)
    @OnlyCommentCreator(groups = SecondValidationUpdateCommentDto.class)
    private Long commentId;
}

interface FirstValidationUpdateCommentDto {};
interface SecondValidationUpdateCommentDto {};