package com.example.coffeeshop.controller;

import com.example.coffeeshop.entity.User;
import com.example.coffeeshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    // Tạo người dùng mới
    @PostMapping("/create")
    public User createUser(@RequestBody User user) {
        return userService.register(user);
    }

    // Lấy danh sách tất cả người dùng
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAll();
    }

    // Sửa thông tin người dùng
    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User userUpdate) {
        return userService.updateUser(id, userUpdate);
    }

    // Xóa người dùng
    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
