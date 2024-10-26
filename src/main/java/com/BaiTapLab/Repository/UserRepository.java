package com.BaiTapLab.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.BaiTapLab.Entity.Users;

public interface UserRepository extends JpaRepository<Users, String> {
     Users findByAccountID(String accountID);
}
