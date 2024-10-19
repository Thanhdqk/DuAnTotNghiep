package com.BaiTapLab.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Lấy tất cả người dùng
    public List<Users> findAll() {
        return userRepository.findAll();
    }

    // Lưu hoặc cập nhật người dùng
    public Users save(Users user) {
        return userRepository.save(user);
    }

    // Xóa người dùng theo ID
    public void deleteById(String accountId) {
        userRepository.deleteById(accountId);
    }

    // Tìm người dùng theo ID
    public Users findById(String accountId) {
        Optional<Users> user = userRepository.findById(accountId);
        return user.orElseThrow(() -> new RuntimeException("User not found"));
    }
}