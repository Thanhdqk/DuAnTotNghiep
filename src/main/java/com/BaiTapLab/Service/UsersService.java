package com.BaiTapLab.Service;


import org.springframework.beans.factory.annotation.Autowired;

import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.UsersRepository;


public class UsersService {
	@Autowired
	private UsersRepository userRepository;

	public Users save(Users user) {
		return userRepository.save(user);
	}
}
