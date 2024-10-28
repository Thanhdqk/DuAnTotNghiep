package com.BaiTapLab.Service;

import org.springframework.data.jpa.repository.JpaRepository;

import com.BaiTapLab.Entity.Users;

public interface UsersService  extends JpaRepository<Users, String>{

}
