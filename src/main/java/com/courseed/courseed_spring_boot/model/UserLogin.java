package com.courseed.courseed_spring_boot.model;

import jakarta.validation.GroupSequence;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@GroupSequence({UserLogin.class, FirstValidation.class, SecondValidation.class})
public class UserLogin {
    
    @Size(min = 10, max = 100, message = "Por favor, ingrese un valor entre 10 y 100 caracteres.", groups = SecondValidation.class)
    @NotBlank(message = "El nombre es obligatorio", groups = FirstValidation.class)
    private String username;

    @Size(min = 10, max = 100, message = "Por favor, ingrese un valor entre 10 y 100 caracteres.", groups = SecondValidation.class)
    @NotBlank(message = "La contraseña es obligatoria", groups = FirstValidation.class)
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

interface FirstValidation {}
interface SecondValidation {}