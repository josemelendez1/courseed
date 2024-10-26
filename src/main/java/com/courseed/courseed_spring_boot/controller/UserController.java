package com.courseed.courseed_spring_boot.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import com.courseed.courseed_spring_boot.dto.user.ChangeUserPasswordDto;
import com.courseed.courseed_spring_boot.dto.user.LoginUserDto;
import com.courseed.courseed_spring_boot.dto.user.RegisterUserDto;
import com.courseed.courseed_spring_boot.dto.user.UpdateUserAuthorityDto;
import com.courseed.courseed_spring_boot.dto.user.UpdateUserPasswordDto;
import com.courseed.courseed_spring_boot.dto.user.UserDto;
import org.springframework.data.domain.Page;
import com.courseed.courseed_spring_boot.service.UserService;

import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<Page<UserDto>> getUsers(
        @RequestParam(defaultValue = "0") int pageNo,
        @RequestParam(defaultValue = "10") int pageSize
    ) {
        Page<UserDto> users = userService.getUsers(pageNo, pageSize);
        return new ResponseEntity<>(users, users != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/authenticated")
    public UserDto getUserAuthenticated(Authentication authentication) {
        return userService.getAuthenticatedUser(authentication);
    }
    
    @PostMapping("/register")
    public UserDto register(@Valid @RequestBody RegisterUserDto user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public ResponseEntity<Token> authenticate (@Valid @RequestBody LoginUserDto user) {
        String token = userService.loginAndGetToken(user.getUsername(), user.getPassword());
        if (token != null) {
            return new ResponseEntity<>(new Token(token), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Token("El nombre de usuario o la contraseña son incorrectas, intentelo nuevamente."), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/faker")
    public List<UserDto> faker() {
        return userService.faker();
    }

    @PutMapping("/update-password")
    public ResponseEntity<UserDto> updatePassword(
        @Valid @RequestBody UpdateUserPasswordDto updateUserPasswordDto,
        Authentication authentication
    ) {
        UserDto userDto = userService.updatePassword(authentication.getName(), updateUserPasswordDto.getNewPassword());
        return new ResponseEntity<>(userDto, userDto != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/update-authority")
    public ResponseEntity<UserDto> updateAuthority(
        @RequestBody UpdateUserAuthorityDto updateUserAuthorityDto
    ) {
        UserDto userDto = userService.updateAuthority(updateUserAuthorityDto.getUsername(), updateUserAuthorityDto.getRole());
        return new ResponseEntity<>(userDto, userDto != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/change-password")
    public ResponseEntity<UserDto> changePassword(
        @Valid @RequestBody ChangeUserPasswordDto changeUserPasswordDto
    ) {
        UserDto userDto = userService.updatePassword(changeUserPasswordDto.getUsername(), changeUserPasswordDto.getNewPassword());
        return new ResponseEntity<>(userDto, userDto != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
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
