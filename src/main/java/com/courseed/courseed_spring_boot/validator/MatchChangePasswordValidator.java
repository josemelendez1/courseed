package com.courseed.courseed_spring_boot.validator;

import com.courseed.courseed_spring_boot.dto.user.ChangeUserPasswordDto;
import com.courseed.courseed_spring_boot.validator.annotation.MatchChangePassword;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class MatchChangePasswordValidator implements ConstraintValidator<MatchChangePassword, ChangeUserPasswordDto> {

    @Override
    public boolean isValid(ChangeUserPasswordDto changeUserPasswordDto, ConstraintValidatorContext context) {
        boolean isValid = changeUserPasswordDto.getNewPassword() != null && 
        changeUserPasswordDto.getNewPassword().equals(changeUserPasswordDto.getConfirmNewPassword());

        if (!isValid) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate())
            .addPropertyNode("matchChangePassword")
            .addConstraintViolation();
        }

        return isValid;
    }
    
}
