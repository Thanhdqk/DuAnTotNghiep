package com.BaiTapLab.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.DiaChi;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.DiaChiRepository;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Security.JwtUtil;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("api/users")
public class LoginControllerQuang {

	@Autowired
	UsersRepository userRepository;
	@Autowired
	JwtUtil jwtUtil ;
	@PostMapping("/login")
	public ResponseEntity<?> saveUser(
	        @RequestParam("accountID") String accountID,
	        @RequestParam("hovaten") String hovaten,
	        @RequestParam("hinh_anh") String hinhAnh,
	        @RequestParam("so_dien_thoai") String soDienThoai,
	        @RequestParam("hoat_dong") String hoatDong,
	        @RequestParam("email") String email) {

	    Users user = new Users();
	    user.setAccountID(accountID);
	    user.setHovaten(hovaten);
	    user.setHinh_anh(hinhAnh);
	    user.setSo_dien_thoai(soDienThoai);
	    user.setHoat_dong(hoatDong);
	    user.setAccountID(email);

	    if (!userRepository.existsById(user.getAccountID())) {
	        Users savedUser = userRepository.save(user);
	        return ResponseEntity.ok(savedUser);
	    }

	    	 Users savedUser = userRepository.findByAccountID(accountID);

	    return ResponseEntity.ok(savedUser);
	}

	@PostMapping("login/github")
	public ResponseEntity<?> postMethodName(@RequestBody String entity) {
	    //TODO: process POST request

	    return ResponseEntity.ok("User already exists");
	}

	@GetMapping("/spotifylogin")
	public String spotifyLogin(@RequestParam String username, @RequestParam String email) {
	    // Kiểm tra các tham số
	    System.out.println("Username: " + username);
	    System.out.println("Email: " + email);

	    // Tạo JWT cho người dùng
	    String token = jwtUtil.generateToken(email);
	    System.out.println("Email: " + token);

	    Users user = new Users();

	    user.setHovaten(username);

	    user.setHoat_dong("On");
	    user.setAccountID(email);

	    if (!userRepository.existsById(user.getAccountID())) {
	        Users savedUser = userRepository.save(user);

	    }

	    // Trả về JWT trong phản hồi
	    return token;
	}

}