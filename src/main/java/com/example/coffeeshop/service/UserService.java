package com.example.coffeeshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.coffeeshop.entity.User;
import com.example.coffeeshop.repository.UsersRepository;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UsersRepository userRepository;

    // Đăng ký người dùng mới
    public User register(User user) {
        return userRepository.save(user);
    }

    // Lấy tất cả người dùng
    public List<User> getAll() {
        return userRepository.findAll();
    }

    // Cập nhật thông tin người dùng
    public User updateUser(Long id, User userUpdate) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với id " + id));

        existingUser.setUsername(userUpdate.getUsername()); // Cập nhật các thông tin khác nếu cần
        existingUser.setPassword(userUpdate.getPassword()); // Giả sử bạn cập nhật mật khẩu

        return userRepository.save(existingUser);
    }

    // Xóa người dùng
    public void deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new RuntimeException("Không thể xóa người dùng. Người dùng không tồn tại.");
        }
    }
}
