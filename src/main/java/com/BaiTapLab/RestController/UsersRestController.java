package com.BaiTapLab.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.Roles;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.UsersRepository;

@CrossOrigin("origins = http://localhost:5173")
@RestController
public class UsersRestController {
	@Autowired
	UsersRepository usersRepository;
	
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestParam String accountID, @RequestParam String password) {
	    Optional<Users> user = usersRepository.findByAccountIDAndPassword(accountID, password);
	    
	    Map<String, Object> response = new HashMap<>();

	    if (user.isPresent()) {
	        response.put("message", "Đăng nhập thành công!"); 
	        //response.put(user.get().getHinh_anh(), response);
	        response.put("roles", user.get().getRoles().stream()
	                .map(Roles::getTen_vai_tro)
	                .collect(Collectors.toList())); // Thêm vai trò vào phản hồi
	        return ResponseEntity.ok(response);
	    } else {
	        response.put("message", "Sai tài khoản hoặc mật khẩu!");
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
	    }
	}




}
