package com.example.Backend_SpringBoot.controller;

import com.example.Backend_SpringBoot.model.Role;
import com.example.Backend_SpringBoot.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired private AuthService authService;

    public static record SignupRequest(String username, String password, String fullName, String email, Role role) {}
    public static record LoginRequest(String username, String password) {}

    @PostMapping("/signup")
    public void signup(@Valid @RequestBody SignupRequest req) {
        Role role = req.role() == null ? Role.STUDENT : req.role();
        authService.signup(req.username(), req.password(), role, req.fullName(), req.email());
    }

    @PostMapping("/login")
    public Map<String,Object> login(@Valid @RequestBody LoginRequest req) {
        return authService.login(req.username(), req.password());
    }
}
