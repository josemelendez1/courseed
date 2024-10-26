package com.courseed.courseed_spring_boot.validator;

import com.courseed.courseed_spring_boot.dto.user.UpdateUserPasswordDto;
import com.courseed.courseed_spring_boot.validator.annotation.MatchUpdatePassword;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class MatchUpdatePasswordValidator implements ConstraintValidator<MatchUpdatePassword, UpdateUserPasswordDto> {

    @Override
    public boolean isValid(UpdateUserPasswordDto updateUserPasswordDto, ConstraintValidatorContext context) {
        boolean isValid = updateUserPasswordDto.getNewPassword() != null && 
        updateUserPasswordDto.getNewPassword().equals(updateUserPasswordDto.getConfirmNewPassword());

        if (!isValid) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate())
            .addPropertyNode("matchUpdatePassword")
            .addConstraintViolation();
        }

        return isValid;
    }
    
}
