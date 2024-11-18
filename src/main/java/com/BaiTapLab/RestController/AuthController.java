package com.BaiTapLab.RestController;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.BaiTapLab.Entity.DiaChi;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Service.UsersService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController implements WebMvcConfigurer {

	@Autowired
	private UsersService userService;

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/images/**").addResourceLocations("file:images/uploads/");
	}

	// Endpoint to send OTP for verification
	@PostMapping("/sendOtp")
	public ResponseEntity<String> sendOtp(@RequestBody Map<String, String> request) {
		String result = userService.sendOtp(request.get("email"));
		return result.equals("OTP sent successfully") ? ResponseEntity.ok(result)
				: ResponseEntity.status(HttpStatus.CONFLICT).body(result);
	}

	// Endpoint to verify OTP
	@PostMapping("/verifyOtp")
	public ResponseEntity<String> verifyOtp(@RequestBody Map<String, String> request) {
		String result = userService.verifyOtp(request.get("email"), request.get("otp"));
		return result.equals("OTP verified successfully") ? ResponseEntity.ok(result)
				: ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
	}

	// Endpoint to register a new user
	// Endpoint to register a new user with additional details
	@PostMapping("/register")
	public ResponseEntity<Users> registerUser(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		String password = request.get("password");
		String fullName = request.get("fullName");
		String phoneNumber = request.get("phoneNumber");
		String address = request.get("address");

		Users newUser = userService.registerUser(email, password, fullName, phoneNumber, address);
		return newUser != null ? ResponseEntity.ok(newUser) : ResponseEntity.status(HttpStatus.CONFLICT).body(null);
	}

	// Endpoint to get user details by ID
	@GetMapping("/users/{id}")
	public ResponseEntity<Users> getUserById(@PathVariable String id) {
		Optional<Users> user = userService.getUserById(id);
		return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
	}

	@PostMapping("/users/{id}/upload")
	public ResponseEntity<String> uploadImage(@PathVariable String id, @RequestParam("hinh_anh") MultipartFile file) {
		Optional<Users> userOptional = userService.getUserById(id);
		if (!userOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
		}

		Users user = userOptional.get();
		String uploadDir = "images/uploads/"; // Đường dẫn để lưu hình ảnh
		File dir = new File(uploadDir);

		// Tạo thư mục nếu chưa tồn tại
		if (!dir.exists()) {
			dir.mkdirs();
		}

		try {
			String filename = file.getOriginalFilename();
			Path path = Paths.get(uploadDir + filename);

			// Kiểm tra xem file đã tồn tại và tạo tên file duy nhất
			if (new File(path.toString()).exists()) {
				String baseName = filename.substring(0, filename.lastIndexOf('.'));
				String extension = filename.substring(filename.lastIndexOf('.'));
				filename = baseName + "_" + System.currentTimeMillis() + extension; // Thêm timestamp vào tên file
				path = Paths.get(uploadDir + filename);
			}

			// Lưu file hình ảnh vào thư mục
			Files.write(path, file.getBytes());
			user.setHinh_anh(filename); // Lưu tên file vào đối tượng người dùng
			userService.updateUser(user); // Cập nhật thông tin người dùng

			// Tạo URL để truy cập hình ảnh
			String imageUrl = "http://localhost:8080/images/uploads/" + filename;

			return ResponseEntity.ok("Image uploaded successfully: " + imageUrl);
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image.");
		}
	}

	@PutMapping("/users/{id}/update")
	public ResponseEntity<String> updateUser(@PathVariable String id, @RequestBody Map<String, String> request) {
		Optional<Users> userOptional = userService.getUserById(id);
		if (!userOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
		}

		Users user = userOptional.get();
		user.setHinh_anh(request.get("hinh_anh")); // Đảm bảo bạn lấy tên file hình ảnh từ request
		user.setHovaten(request.get("hovaten"));
		user.setSo_dien_thoai(request.get("so_dien_thoai"));

		userService.updateUser(user);
		return ResponseEntity.ok("User updated successfully.");
	}

	// Endpoint để cập nhật địa chỉ người dùng
	@PutMapping("/users/{id}/address")
	public ResponseEntity<String> updateUserAddress(@PathVariable String id, @RequestBody DiaChi newAddress) {
		Optional<Users> userOptional = userService.getUserById(id);
		if (!userOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
		}

		Users user = userOptional.get();
		userService.updateUserAddress(user.getAccountID(), newAddress);
		return ResponseEntity.ok("User address updated successfully.");
	}

	// Endpoint to get user address by ID
	@GetMapping("/users/{id}/address")
	public ResponseEntity<DiaChi> getUserAddress(@PathVariable String id) {
		Optional<DiaChi> address = userService.getUserAddress(id);
		return address.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
	}

	// Endpoint to log in
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		String password = request.get("password");

		Users user = userService.login(email, password);

		if (user != null) {
			Map<String, Object> response = new HashMap<>();
			response.put("success", true);
			response.put("userId", user.getAccountID()); // Return accountID as the user's ID
			return ResponseEntity.ok(response);
		} else {
			Map<String, Object> response = new HashMap<>();
			response.put("success", false);
			response.put("message", "Invalid email or password");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		}
	}

	@PutMapping("/users/{id}/changePassword")
	public ResponseEntity<String> changePassword(@PathVariable String id, @RequestBody Map<String, String> request) {
		Optional<Users> userOptional = userService.getUserById(id);
		if (!userOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
		}

		Users user = userOptional.get();

		// Check if the current password matches (no encryption needed)
		if (!request.get("currentPassword").equals(user.getPassword())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Current password is incorrect.");
		}

		// Set the new password (plain text)
		user.setPassword(request.get("newPassword"));
		userService.updateUser(user);
		return ResponseEntity.ok("Password changed successfully.");
	}
}
