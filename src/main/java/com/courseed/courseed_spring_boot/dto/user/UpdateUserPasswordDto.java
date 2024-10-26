package com.courseed.courseed_spring_boot.dto.user;

import com.courseed.courseed_spring_boot.validator.annotation.CheckAuthPassword;
import com.courseed.courseed_spring_boot.validator.annotation.MatchUpdatePassword;

import jakarta.validation.GroupSequence;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@GroupSequence({UpdateUserPasswordDto.class, FirstValidationUpdateUserPasswordDto.class, SecondValidationUpdateUserPasswordDto.class})
@MatchUpdatePassword(groups = SecondValidationUpdateUserPasswordDto.class)
public class UpdateUserPasswordDto {
    
    @NotBlank(message = "La contraseña actual es obligatoria, intenta nuevamente.", groups = FirstValidationUpdateUserPasswordDto.class)
    @CheckAuthPassword(groups = SecondValidationUpdateUserPasswordDto.class)
    private String currentPassword;

    @NotBlank(message = "La nueva contraseña es obligatoria, intenta nuevamente.", groups = FirstValidationUpdateUserPasswordDto.class)
    @Size(min = 10, max = 100, message = "Por favor, ingrese una nueva contraseña entre 10 y 100 caracteres.", groups = SecondValidationUpdateUserPasswordDto.class)
    private String newPassword;
    
    @NotBlank(message = "La confirmación de contraseña es obligatoria, intenta nuevamente.", groups = FirstValidationUpdateUserPasswordDto.class)
    private String confirmNewPassword;    
}

interface FirstValidationUpdateUserPasswordDto {}
interface SecondValidationUpdateUserPasswordDto {}
interface ThirdValidationUpdateUserPasswordDto {}