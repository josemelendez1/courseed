package com.courseed.courseed_spring_boot.entity;

import jakarta.persistence.*;
import jakarta.validation.GroupSequence;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;

import com.courseed.courseed_spring_boot.annotation.UniqueEmail;
import com.courseed.courseed_spring_boot.annotation.UniqueUserName;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@GroupSequence({User.class, FirstValidation.class, SecondValidation.class, ThirdValidation.class, FourthValidation.class})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @UniqueUserName(groups = ThirdValidation.class)
    @Size(min = 10, max = 100, message = "Por favor, ingrese un valor entre 10 y 100 caracteres.", groups = SecondValidation.class)
    @NotBlank(message = "El nombre es obligatorio", groups = FirstValidation.class)
    @Column(unique = true, nullable = false)
    private String username;

    @UniqueEmail(groups = FourthValidation.class)
    @Email(message = "El correo no es valido", regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$", groups = ThirdValidation.class)
    @Size(min = 10, max = 100, message = "Por favor, ingrese un valor entre 10 y 100 caracteres.", groups = SecondValidation.class)
    @NotBlank(message = "El correo es obligatorio", groups = FirstValidation.class)
    @Column(unique = true, nullable = false)
    private String email;

    @Size(min = 10, max = 100, message = "Por favor, ingrese un valor entre 10 y 100 caracteres.", groups = SecondValidation.class)
    @NotBlank(message = "La contraseña es obligatoria", groups = FirstValidation.class)
    @Column(nullable = false)
    private String password;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "user_authority_mapping",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "authority")
    )
    private Set<Authority> authorities;
   
}

interface FirstValidation {}
interface SecondValidation {}
interface ThirdValidation {}
interface FourthValidation {}