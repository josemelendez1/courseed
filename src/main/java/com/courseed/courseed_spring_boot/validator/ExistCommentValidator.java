package com.courseed.courseed_spring_boot.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.courseed.courseed_spring_boot.entity.Comment;
import com.courseed.courseed_spring_boot.service.CommentService;
import com.courseed.courseed_spring_boot.validator.annotation.ExistComment;

import java.util.Optional;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@Component
public class ExistCommentValidator implements ConstraintValidator<ExistComment, Long>  {

    @Autowired
    private CommentService commentService;

    @Override
    public boolean isValid(Long id, ConstraintValidatorContext context) {
        if (commentService == null) {
            return true;
        }
        
        if (id == null) {
            return false;
        }

        Optional<Comment> comments = commentService.findById(id);

        return comments.isPresent();
    }

    
}
