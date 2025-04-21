package com.example.coffeeshop.controller;

import com.example.coffeeshop.entity.User;
import com.example.coffeeshop.repository.UserRepository;
import com.example.coffeeshop.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Đăng ký
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Username already exists");
        }
        // Mã hóa password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    // Đăng nhập
    // @PostMapping("/login")
    // public ResponseEntity<String> login(@RequestBody User loginRequest) {
    // Optional<User> optionalUser =
    // userRepository.findByUsername(loginRequest.getUsername());

    // if (optionalUser.isPresent() &&
    // passwordEncoder.matches(loginRequest.getPassword(),
    // optionalUser.get().getPassword())) {

    // String token = jwtUtil.generateToken(optionalUser.get().getUsername());
    // return ResponseEntity.ok("{\"token\": \"" + token + "\"}");

    // } else {
    // return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
    // .body("{\"error\": \"Invalid credentials\"}");
    // }
    // }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User loginRequest) {
        Optional<User> optionalUser = userRepository.findByUsername(loginRequest.getUsername());

        if (optionalUser.isPresent() &&
                passwordEncoder.matches(loginRequest.getPassword(), optionalUser.get().getPassword())) {

            User user = optionalUser.get();
            // Truyền username và role gốc vào
            String token = jwtUtil.generateToken(user.getUsername(), user.getRole());

            return ResponseEntity.ok(token);

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("{\"error\": \"Invalid credentials\"}");
        }
    }

}
