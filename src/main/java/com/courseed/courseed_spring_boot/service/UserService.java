package com.courseed.courseed_spring_boot.service;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.courseed.courseed_spring_boot.dto.course.LikeCourseDto;
import com.courseed.courseed_spring_boot.dto.user.RegisterUserDto;
import com.courseed.courseed_spring_boot.dto.user.UserDto;
import com.courseed.courseed_spring_boot.entity.Authority;
import com.courseed.courseed_spring_boot.entity.User;
import com.courseed.courseed_spring_boot.repository.AuthorityRepository;
import com.courseed.courseed_spring_boot.repository.UserRepository;
import com.courseed.courseed_spring_boot.security.TokenProvider;
import com.github.javafaker.Faker;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.List;
import java.util.Locale;

@Service
@AllArgsConstructor
public class UserService {

    private static final String AUTHORITY_USER = "ROLE_USER";

    public static final String AUTHORITY_ADMIN = "ROLE_ADMIN";

    private final UserRepository userRepository;

    private final AuthorityRepository authorityRepository;

    private final PasswordEncoder passwordEncoder;

    private final TokenProvider tokenProvider;

    private final AuthenticationManager authenticationManager;

    public Page<UserDto> getUsers(int pageNo, int pageSize) {
        return userRepository.findAll(PageRequest.of(pageNo, pageSize)).map(UserDto::fromEntity);
    }

    public UserDto register(RegisterUserDto registerUserDto) {
        User user = new User();
        user.setUsername(registerUserDto.getUsername());
        user.setPassword(passwordEncoder.encode(registerUserDto.getPassword()));

        Set<Authority> Authorities = new HashSet<>(Arrays.asList(getAuthority(AUTHORITY_USER)));
        user.setAuthorities(Authorities);

        User savedUser = userRepository.save(user);

        return new UserDto(savedUser.getUsername(), registerUserDto.getPassword());
    }

    public Optional<User> findByUserName(String name) {
        return this.userRepository.findByUsername(name);
    }

    public String loginAndGetToken(String username, String password) {
        try {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            return tokenProvider.createToken(authentication);
        } catch (AuthenticationException e) {
            return null;
        }
    }

    public UserDto getAuthenticatedUser(Authentication authentication) {
        User user = findByUserName(authentication.getName()).get();
        if (user != null) {
            UserDto userDto = new UserDto(user.getUsername(), user.getPassword());
            userDto.setRoles(user.getAuthorities());
            userDto.setLikes(user.getInterestedCourses().stream().map(LikeCourseDto::fromEntity).toList());
            return userDto;
        } else {
            return null;
        }
    }

    public UserDto updatePassword(String username, String newPassword) {
        Optional<User> users = userRepository.findByUsername(username);

        if (users.isPresent()) {
            User user = users.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            User savedUser = userRepository.save(user);
            return UserDto.fromEntity(savedUser);
        } else {
            return null;
        }
    }

    public UserDto updateAuthority(String username, String newAuthority) {
        Optional<User> users = userRepository.findByUsername(username);

        if (users.isPresent()) {
            User user = users.get();
            Set<Authority> authorities = new HashSet<>(Arrays.asList(getAuthority(newAuthority)));
            user.setAuthorities(authorities);

            User savedUser = userRepository.save(user);
            return UserDto.fromEntity(savedUser);
        } else {
            return null;
        }
    }

    public List<UserDto> faker() {
        Faker faker = new Faker(new Locale("es", "ES"));
        String username;
        String authority;
        List<UserDto> userDtos = new ArrayList<>();

        for (int i = 0; i < 10; i++) {
            username = faker.name().fullName();
            authority = (i < 5) ? "ROLE_USER" : "ROLE_ADMIN";
            if (userRepository.findByUsername(username).isEmpty()) {
                User user = new User();
                user.setUsername(username);
                user.setPassword(passwordEncoder.encode(username));

                Set<Authority> Authorities = new HashSet<>(Arrays.asList(getAuthority(authority)));
                user.setAuthorities(Authorities);

                User savedUser = userRepository.save(user);

                UserDto userDto = new UserDto(savedUser.getUsername(), savedUser.getUsername());
                userDto.setRoles(savedUser.getAuthorities());

                userDtos.add(userDto);
            }
        }

        return userDtos;
    } 

    private Authority getAuthority(String authority) {
        Authority enAuthority = authorityRepository.findByAuthority(authority);
        if (enAuthority != null) {
            return enAuthority;
        } else {
            return authorityRepository.save(new Authority(authority));
        }
    }
}