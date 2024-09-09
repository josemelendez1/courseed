package com.courseed.courseed_spring_boot.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import com.courseed.courseed_spring_boot.entity.User;
import com.courseed.courseed_spring_boot.model.UserLogin;
import com.courseed.courseed_spring_boot.service.UserService;

import jakarta.validation.Valid;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users/register")
    public User register(@Valid @RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/users/login")
    public ResponseEntity<Token> authenticate (@Valid @RequestBody UserLogin user) {
        String token = userService.loginAndGetToken(user.getUsername(), user.getPassword());
        if (token != null) {
            return new ResponseEntity<>(new Token(token), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Token("El nombre o la contraseña son invalidos"), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}

class Token {
    private String token;

    Token(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
