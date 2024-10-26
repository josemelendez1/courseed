package com.courseed.courseed_spring_boot.dto.comment;

import com.courseed.courseed_spring_boot.validator.annotation.ExistComment;
import com.courseed.courseed_spring_boot.validator.annotation.OnlyCommentCreator;

import jakarta.validation.GroupSequence;
import lombok.Data;

@Data
@GroupSequence({DeleteCommentDto.class, FirstValidationDeleteCommentDto.class, SecondValidationDeleteCommentDto.class})
public class DeleteCommentDto {

    @ExistComment(groups = FirstValidationDeleteCommentDto.class)
    @OnlyCommentCreator(groups = SecondValidationDeleteCommentDto.class)
    private Long commentId;
}

interface FirstValidationDeleteCommentDto {};
interface SecondValidationDeleteCommentDto {};
