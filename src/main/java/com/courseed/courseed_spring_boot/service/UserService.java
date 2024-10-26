package com.courseed.courseed_spring_boot.service;

import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.courseed.courseed_spring_boot.entity.Authority;
import com.courseed.courseed_spring_boot.entity.User;
import com.courseed.courseed_spring_boot.repository.AuthorityRepository;
import com.courseed.courseed_spring_boot.repository.UserRepository;
import com.courseed.courseed_spring_boot.security.TokenProvider;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class UserService {

    private static final String AUTHORITY_USER = "ROLE_USER";

    private final UserRepository userRepository;

    private final AuthorityRepository authorityRepository;

    private final PasswordEncoder passwordEncoder;

    private final TokenProvider tokenProvider;

    private final AuthenticationManager authenticationManager;

    public User registerUser(User user) {
        Set<Authority> authorities = new HashSet<>(Arrays.asList(getAuthority(AUTHORITY_USER)));
        user.setAuthorities(authorities);
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        return userRepository.save(user);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findByUserName(String name) {
        return this.userRepository.findByUsername(name);
    }

    public Optional<User> findByEmail(String email) {
        return this.userRepository.findByEmail(email);
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

    private Authority getAuthority(String authority) {
        Authority enAuthority = authorityRepository.findByAuthority(authority);
        if (enAuthority != null) {
            return enAuthority;
        } else {
            return authorityRepository.save(new Authority(authority));
        }
    }
}