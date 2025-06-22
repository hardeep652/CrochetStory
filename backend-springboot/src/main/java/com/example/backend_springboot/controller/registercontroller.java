package com.example.backend_springboot.controller;

import com.example.backend_springboot.model.register;
import com.example.backend_springboot.service.registerservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class registercontroller {

    @Autowired
    private registerservice obj;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody register r) {
        try {
            register savedUser = obj.adduser(r);
            return ResponseEntity.ok("User registered successfully: " + savedUser.getEmail());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }
}