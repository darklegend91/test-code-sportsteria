package com.example.Backend_SpringBoot.service;

import com.example.Backend_SpringBoot.model.User;
import com.example.Backend_SpringBoot.model.Role;
import com.example.Backend_SpringBoot.repository.UserRepository;
import com.example.Backend_SpringBoot.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.HashMap;

@Service
public class AuthService {

    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtTokenProvider jwtTokenProvider;

    public void signup(String username, String rawPassword, Role role, String fullName, String email) {
        if (userRepository.existsByUsername(username)) throw new RuntimeException("Username exists");
        User u = new User();
        u.setUsername(username);
        u.setPassword(passwordEncoder.encode(rawPassword));
        u.setRole(role);
        u.setFullName(fullName);
        u.setEmail(email);
        userRepository.save(u);
    }

    public Map<String, Object> login(String username, String rawPassword) {
        User u = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("Invalid credentials"));
        if (!passwordEncoder.matches(rawPassword, u.getPassword())) throw new RuntimeException("Invalid credentials");
        String token = jwtTokenProvider.generateToken(u.getUsername(), u.getRole().name());
        Map<String,Object> res = new HashMap<>();
        // hide password in response
        u.setPassword(null);
        res.put("token", token);
        res.put("user", u);
        return res;
    }
}
