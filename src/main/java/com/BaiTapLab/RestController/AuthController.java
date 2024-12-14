package com.BaiTapLab.RestController;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.BaiTapLab.Entity.DiaChi;
import com.BaiTapLab.Entity.UserWallet;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Service.UsersService;
import com.BaiTapLab.Service.WalletService;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST,
		RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/auth")
public class AuthController implements WebMvcConfigurer {

	@Autowired
	private UsersService userService;
	@Autowired
	private WalletService walletService;

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/images/**").addResourceLocations("file:images/uploads/");
	}
	
	@PostMapping("/checkEmail")
	public ResponseEntity<String> checkEmail(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		boolean exists = userService.emailExists(email);
		if (exists) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Email đã tồn tại vui lòng sử dụng email khác");
		}
		return ResponseEntity.ok("Email is available.");
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

		// Giữ nguyên hình ảnh nếu không có hình ảnh mới
		String currentImage = user.getHinh_anh();
		String newImage = request.get("hinh_anh");
		user.setHinh_anh(newImage != null && !newImage.isEmpty() ? newImage : currentImage);

		user.setHovaten(request.get("hovaten"));
		user.setSo_dien_thoai(request.get("so_dien_thoai"));

		userService.updateUser(user);
		return ResponseEntity.ok("User updated successfully.");
	}

	@GetMapping("/users/{id}/addresses")
	public ResponseEntity<List<DiaChi>> getUserAddresses(@PathVariable String id) {
		try {
			List<DiaChi> addresses = userService.getUserAddresses(id);
			return ResponseEntity.ok(addresses);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
	}

	@PutMapping("/users/{id}/address")
	public ResponseEntity<String> updateUserAddress(@PathVariable String id, @RequestBody Map<String, Object> payload) {
		try {
			System.out.println("Payload nhận được: " + payload);

			DiaChi newAddress = new DiaChi();
			newAddress.setDia_chi((String) payload.get("dia_chi"));
			newAddress.setPhuong((String) payload.get("phuong"));
			newAddress.setQuan((String) payload.get("quan"));
			newAddress.setThanh_pho((String) payload.get("thanh_pho"));

			Users user = userService.getUserById(id).orElseThrow(() -> new RuntimeException("User not found"));
			newAddress.setUsers(user);

			userService.addOrUpdateUserAddress(id, newAddress);
			return ResponseEntity.ok("Address updated successfully.");
		} catch (Exception e) {
			System.err.println("Lỗi xảy ra: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi xử lý địa chỉ.");
		}
	}

	@PutMapping("/users/{id}/addresses/{addressId}")
	public ResponseEntity<String> editAddress(@PathVariable String id, @PathVariable int addressId,
			@RequestBody Map<String, String> payload) {
		try {
			System.out.println("Payload nhận được từ client: " + payload);

			DiaChi address = userService.getAddressById(addressId)
					.orElseThrow(() -> new RuntimeException("Address not found."));

			if (!address.getUsers().getAccountID().equals(id)) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized to edit this address.");
			}

			address.setDia_chi(payload.get("dia_chi"));
			address.setPhuong(payload.get("phuong"));
			address.setQuan(payload.get("quan"));
			address.setThanh_pho(payload.get("thanh_pho"));

			userService.saveAddress(address);
			return ResponseEntity.ok("Address updated successfully.");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Failed to update address: " + e.getMessage());
		}
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		String password = request.get("password");

		Users user = userService.login(email, password);

		Map<String, Object> response = new HashMap<>();

		if (user != null) {
			// Kiểm tra trạng thái xóa (khóa tài khoản)
			if ("Ban".equalsIgnoreCase(user.getTrang_thai_xoa())) {
				response.put("success", false);
				response.put("message", "Your account has been locked.");
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
			}

			// Đăng nhập thành công
			response.put("success", true);
			response.put("userId", user.getAccountID());
			return ResponseEntity.ok(response);
		} else {
			// Sai email hoặc mật khẩu
			response.put("success", false);
			response.put("message", "Invalid email or password");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		}
	}

	@PutMapping("/users/{id}/changePassword")
	public ResponseEntity<String> changePassword(@PathVariable String id, @RequestBody Map<String, String> request) {
		Optional<Users> userOptional = userService.getUserById(id);
		if (!userOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy người dùng.");
		}

		Users user = userOptional.get();

		// Check if the current password matches (no encryption needed)
		if (!request.get("currentPassword").equals(user.getPassword())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mật khẩu hiện tại không đúng.");
		}

		// Set the new password (plain text)
		user.setPassword(request.get("newPassword"));
		userService.updateUser(user);
		return ResponseEntity.ok("Đã thay đổi mật khẩu thành công.");
	}

	// API để lấy thông tin ví của người dùng theo ID
	@GetMapping("/{userId}")
	public ResponseEntity<UserWallet> getWalletByUserId(@PathVariable String userId) {
		Optional<UserWallet> wallet = walletService.getWalletByUserId(userId);
		return wallet.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
	}

}