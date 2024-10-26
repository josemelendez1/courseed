package com.courseed.courseed_spring_boot.dto.user;

import com.courseed.courseed_spring_boot.validator.annotation.ExistUserByUsername;

import jakarta.validation.GroupSequence;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@GroupSequence({UpdateUserPasswordDto.class, FirstValidationUpdateUserPasswordDto.class, SecondValidationUpdateUserAuthorityDto.class})
public class UpdateUserAuthorityDto {

    @NotBlank(message = "El nombre de usuario es obligatorio, intenta nuevamente.", groups = FirstValidationUpdateUserPasswordDto.class)
    @ExistUserByUsername(groups = SecondValidationUpdateUserAuthorityDto.class)
    private String username;

    @NotBlank(message = "La rol de usuario es obligatoria, intenta nuevamente.", groups = FirstValidationUpdateUserPasswordDto.class)
    private String role;
}

interface FirstValidationUpdateUserAuthorityDto {}
interface SecondValidationUpdateUserAuthorityDto {}