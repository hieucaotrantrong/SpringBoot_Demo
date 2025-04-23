// package com.example.coffeeshop.service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.example.coffeeshop.entity.User;
// import com.example.coffeeshop.repository.UsersRepository;

// import java.util.List;

// /*---------------------------------------
//  * Create user
//  ---------------------------------------*/
// @Service
// public class UserService {
//     @Autowired
//     private UsersRepository userRepository;

//     /*---------------------------------------
//     * Create user
//     ---------------------------------------*/
//     public User register(User user) {
//         return userRepository.save(user);
//     }

//     /*---------------------------------------
//     * Get all user
//     ---------------------------------------*/
//     public List<User> getAll() {
//         return userRepository.findAll();
//     }

//     /*---------------------------------------
//     * Update  user
//     ---------------------------------------*/
//     public User updateUser(Long id, User userUpdate) {
//         User existingUser = userRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với id " + id));

//         existingUser.setUsername(userUpdate.getUsername());
//         existingUser.setPassword(userUpdate.getPassword());

//         return userRepository.save(existingUser);
//     }

//     /*---------------------------------------
//     * Delate user
//     ---------------------------------------*/
//     public void deleteUser(Long id) {
//         if (userRepository.existsById(id)) {
//             userRepository.deleteById(id);
//         } else {
//             throw new RuntimeException("Không thể xóa người dùng. Người dùng không tồn tại.");
//         }
//     }

// }
