package com.BaiTapLab.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.BaiTapLab.Entity.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, String> {
    boolean existsByAccountID(String accountID); // Thêm phương thức kiểm tra sự tồn tại của accountID
    Optional<Users> findByAccountIDAndPassword(String accountID, String password); // Thêm phương thức tìm theo accountID và password
}
