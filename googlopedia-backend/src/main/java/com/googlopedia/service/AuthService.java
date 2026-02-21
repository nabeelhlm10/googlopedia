package com.googlopedia.service;

import com.googlopedia.config.JwtService;
import com.googlopedia.dto.AuthResponse;
import com.googlopedia.dto.LoginRequest;
import com.googlopedia.model.User;
import com.googlopedia.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AuthService {
        private final UserRepository repository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;

        public AuthService(UserRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService,
                        AuthenticationManager authenticationManager) {
                this.repository = repository;
                this.passwordEncoder = passwordEncoder;
                this.jwtService = jwtService;
                this.authenticationManager = authenticationManager;
        }

        public AuthResponse register(User request) {
                var user = new User();
                user.setUsername(request.getUsername());
                user.setEmail(request.getEmail());
                user.setPassword(passwordEncoder.encode(request.getPassword()));
                user.setRole(request.getRole() != null ? request.getRole() : User.Role.USER);
                repository.save(user);

                var userDetails = new org.springframework.security.core.userdetails.User(
                                user.getUsername(),
                                user.getPassword(),
                                Collections.singletonList(new SimpleGrantedAuthority(user.getRole().name())));
                var jwtToken = jwtService.generateToken(userDetails);
                return new AuthResponse(jwtToken, user.getUsername(), user.getRole().name());
        }

        public AuthResponse login(LoginRequest request) {
                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getUsername(),
                                                request.getPassword()));
                var user = repository.findByUsername(request.getUsername())
                                .orElseThrow();
                var userDetails = new org.springframework.security.core.userdetails.User(
                                user.getUsername(),
                                user.getPassword(),
                                Collections.singletonList(new SimpleGrantedAuthority(user.getRole().name())));
                var jwtToken = jwtService.generateToken(userDetails);
                return new AuthResponse(jwtToken, user.getUsername(), user.getRole().name());
        }
}
