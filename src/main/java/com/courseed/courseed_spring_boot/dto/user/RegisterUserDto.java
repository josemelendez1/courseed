package com.courseed.courseed_spring_boot.dto.user;

import java.io.Serializable;

import com.courseed.courseed_spring_boot.validator.annotation.AlphabeticalUsername;
import com.courseed.courseed_spring_boot.validator.annotation.MatchPassword;
import com.courseed.courseed_spring_boot.validator.annotation.UniqueUserName;

import jakarta.validation.GroupSequence;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@GroupSequence({RegisterUserDto.class, FirstValidationRegisterUserDto.class, SecondValidationRegisterUserDto.class, ThirdValidationRegisterUserDto.class, FourthValidationRegisterUserDto.class})
@MatchPassword(groups = ThirdValidationRegisterUserDto.class)
public class RegisterUserDto implements Serializable {

    @NotBlank(message = "El nombre de usuario es obligatorio.", groups = FirstValidationRegisterUserDto.class)
    @Size(min = 10, max = 100, message = "Por favor, ingrese un valor entre 10 y 100 caracteres.", groups = SecondValidationRegisterUserDto.class)
    @UniqueUserName(groups = ThirdValidationRegisterUserDto.class)
    @AlphabeticalUsername(groups = FourthValidationRegisterUserDto.class)
    private String username;

    @NotBlank(message = "La contraseña es obligatoria.", groups = FirstValidationRegisterUserDto.class)
    @Size(min = 10, max = 100, message = "Por favor, ingrese un valor entre 10 y 100 caracteres.", groups = SecondValidationRegisterUserDto.class)
    private String password;

    @NotBlank(message = "La confirmación de contraseña es obligatoria.", groups = FirstValidationRegisterUserDto.class)
    @Size(min = 10, max = 100, message = "Por favor, ingrese un valor entre 10 y 100 caracteres.", groups = SecondValidationRegisterUserDto.class)
    private String confirmPassword;
}

interface FirstValidationRegisterUserDto {}
interface SecondValidationRegisterUserDto {}
interface ThirdValidationRegisterUserDto {}
interface FourthValidationRegisterUserDto {}