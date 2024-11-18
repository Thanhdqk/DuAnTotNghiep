package com.BaiTapLab.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.BaiTapLab.Entity.UserWallet;
import com.BaiTapLab.Entity.Users;

public interface UserWalletRepository extends JpaRepository<UserWallet, Integer>{
	UserWallet findByUsers(Users users);
}
