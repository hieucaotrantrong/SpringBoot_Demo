package com.example.coffeeshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.coffeeshop.entity.User;
import com.example.coffeeshop.repository.UsersRepository;
import com.example.coffeeshop.security.JwtService;

import jakarta.annotation.PostConstruct;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@CrossOrigin(origins = "http://localhost:3000") 
@RestController
@RequestMapping("/api")
public class UserRestController {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostConstruct
    public void initAdmin() {
        if (usersRepository.findByUsername("admin").isEmpty()) {
            User admin = new User("admin", passwordEncoder.encode("admin123"),
                    "ROLE_ADMIN", "Admin", 20, "Da Nang");
            usersRepository.save(admin);
        }
    }

    @PostMapping("/generateToken")
    public ResponseEntity<String> generateToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

        if (authentication.isAuthenticated()) {
            User user = usersRepository.findByUsername(authRequest.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            Map<String, Object> claims = new HashMap<>();
            claims.put("roles", user.getRole()); // Thêm dòng này

            return ResponseEntity.ok(jwtService.generateToken(authRequest.getUsername(), claims));
        } else {
            throw new UsernameNotFoundException("Invalid credentials");
        }
    }

    @PostMapping("/admin/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");
        usersRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }



    @PutMapping("/user/update")
    public ResponseEntity<String> updateUserProfile(Authentication authentication, @RequestBody User updatedUser) {
        User user = usersRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setName(updatedUser.getName());
        user.setAge(updatedUser.getAge());
        user.setAddress(updatedUser.getAddress());
        usersRepository.save(user);
        return ResponseEntity.ok("Profile updated successfully");
    }

    @GetMapping("/admin/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(usersRepository.findAll());
    }

    @PutMapping("/admin/users/{id}")
    public ResponseEntity<String> updateUserByAdmin(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = usersRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setUsername(updatedUser.getUsername());
        user.setName(updatedUser.getName());
        user.setAge(updatedUser.getAge());
        user.setAddress(updatedUser.getAddress());
        user.setRole(updatedUser.getRole());
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }
        usersRepository.save(user);
        return ResponseEntity.ok("User updated by admin");
    }

    @DeleteMapping("/admin/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        usersRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }
        
    static class AuthRequest {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
