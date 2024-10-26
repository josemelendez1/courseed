package com.courseed.courseed_spring_boot.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.courseed.courseed_spring_boot.entity.Comment;
import com.courseed.courseed_spring_boot.entity.User;
import com.courseed.courseed_spring_boot.service.CommentService;
import com.courseed.courseed_spring_boot.service.UserService;
import com.courseed.courseed_spring_boot.validator.annotation.OnlyCommentCreator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.Optional;

@Component
public class OnlyCommentCreatorValidator implements ConstraintValidator<OnlyCommentCreator, Long> {

    @Autowired
    private UserService userService;

    @Autowired
    private CommentService commentService;

    @Override
    public boolean isValid(Long id, ConstraintValidatorContext context) {
        boolean isValid = true;
        
        if (userService == null || commentService == null) {
            return isValid;
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Optional<User> users = userService.findByUserName(authentication.getName());
        Optional<Comment> comments = commentService.findById(id);

        if (users.isEmpty() || comments.isEmpty() || users.get().getId() != comments.get().getUser().getId()) {
            isValid = false;
        }

        return isValid;
    }
    
}
