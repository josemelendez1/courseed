package com.courseed.courseed_spring_boot.dto.user;

import java.io.Serializable;

import jakarta.validation.GroupSequence;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@GroupSequence({LoginUserDto.class, FirstValidation.class, SecondValidation.class})
public class LoginUserDto implements Serializable {
    
    @Size(min = 10, max = 100, message = "Por favor, ingrese un valor entre 10 y 100 caracteres.", groups = SecondValidation.class)
    @NotBlank(message = "El nombre de usuario es obligatorio.", groups = FirstValidation.class)
    private String username;

    @Size(min = 10, max = 100, message = "Por favor, ingrese un valor entre 10 y 100 caracteres.", groups = SecondValidation.class)
    @NotBlank(message = "La contraseña es obligatoria.", groups = FirstValidation.class)
    private String password;

}

interface FirstValidation {}
interface SecondValidation {}