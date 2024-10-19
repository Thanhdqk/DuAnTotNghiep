package com.BaiTapLab.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.BaiTapLab.Entity.Users;

public interface UserRepository extends JpaRepository<Users, String> {
    // Các phương thức tùy chỉnh nếu cần
}