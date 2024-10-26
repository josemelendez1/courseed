package com.courseed.courseed_spring_boot.dto.user;

import com.courseed.courseed_spring_boot.validator.annotation.ExistUserByUsername;
import com.courseed.courseed_spring_boot.validator.annotation.MatchChangePassword;

import jakarta.validation.GroupSequence;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@GroupSequence({ChangeUserPasswordDto.class, FirstValidationChangeUserPasswordDto.class, SecondValidationChangeUserPasswordDto.class, ThirdValidationChangeUserPasswordDto.class})
@MatchChangePassword(groups = ThirdValidationChangeUserPasswordDto.class)
public class ChangeUserPasswordDto {

    @NotBlank(message = "El nombre de usuario es obligatorio, intenta nuevamente.", groups = FirstValidationChangeUserPasswordDto.class)
    @ExistUserByUsername(groups = SecondValidationChangeUserPasswordDto.class)
    private String username;

    @NotBlank(message = "La nueva contraseña es obligatoria, intenta nuevamente.", groups = FirstValidationChangeUserPasswordDto.class)
    @Size(min = 10, max = 100, message = "Por favor, ingrese un valor entre 10 y 100 caracteres.", groups = SecondValidationChangeUserPasswordDto.class)
    private String newPassword;

    @NotBlank(message = "La confirmación de contraseña es obligatoria, intenta nuevamente.", groups = FirstValidationChangeUserPasswordDto.class)
    @Size(min = 10, max = 100, message = "Por favor, ingrese un valor entre 10 y 100 caracteres.", groups = SecondValidationChangeUserPasswordDto.class)
    private String confirmNewPassword;
}

interface FirstValidationChangeUserPasswordDto {}
interface SecondValidationChangeUserPasswordDto {}
interface ThirdValidationChangeUserPasswordDto {}