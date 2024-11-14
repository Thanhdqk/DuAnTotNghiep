	package com.BaiTapLab.RestController;
	
	import java.io.File;
	import java.io.IOException;
	import java.util.HashMap;
	import java.util.List;
	import java.util.Map;
	import java.util.Optional;
	
	import org.slf4j.Logger;
	import org.slf4j.LoggerFactory;
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.http.HttpStatus;
	import org.springframework.http.ResponseEntity;
	import org.springframework.web.bind.annotation.*;
	import org.springframework.web.multipart.MultipartFile;

import com.BaiTapLab.DTO.UserDTO;
import com.BaiTapLab.Entity.DiaChi;
import com.BaiTapLab.Entity.HanhDong;
import com.BaiTapLab.Entity.Roles;
	import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.HanhDongReopository;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Service.UsersService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

	
	@RestController
	@RequestMapping("/api/users")
	@CrossOrigin(origins = { "http://localhost:3000" })
	public class UsersRestController {
	
		private static final Logger logger = LoggerFactory.getLogger(UsersRestController.class);
	
		@Autowired
		private UsersRepository userRepository;
	
		@Autowired	
		private UsersService usersService;
		
		@Autowired
		HanhDongReopository HanhDongReopository;
	
//		@GetMapping
//		public List<Users> getAllUsers() {
//			return userRepository.findUserByTrangThai();
//		}
		@GetMapping
		public List<Users> getAllUsers() {
			return userRepository.findAll();
		}
		@GetMapping("/delete/{id}")
		public void getAllAccountID(@PathVariable("id")String id) {
			Optional<Users> user = userRepository.findById(id);
			Users uservip = user.get();
			HanhDong hd = new HanhDong();
			hd.setUsers(uservip);
			hd.setTen_hanh_dong("Xóa");
			HanhDongReopository.save(hd);
			 userRepository.markAsDeleted(id);
		}
		
		@GetMapping("/back/{id}")
		public void back(@PathVariable("id")String id) {
			Optional<Users> user = userRepository.findById(id);
			Users uservip = user.get();
			HanhDong hd = new HanhDong();
			hd.setUsers(uservip);
			hd.setTen_hanh_dong("Reload");
			HanhDongReopository.save(hd);
			 userRepository.back(id);
		}
	
		@PostMapping
		public ResponseEntity<Map<String, Object>> createUserWithImageAndDetails(
				@RequestParam("accountID") String accountID, @RequestParam("password") String password,
				@RequestParam("hovaten") String hovaten, @RequestParam("so_dien_thoai") String soDienThoai,
				@RequestParam("vai_tro") String vaiTro, @RequestParam("dia_chi") String diaChi,
				@RequestParam("trang_thai_xoa") String trang_thai_xoa,
				@RequestParam(value = "hinh_anh", required = false) MultipartFile hinhAnh) throws IllegalStateException, IOException {
			Map<String, Object> response = new HashMap<>();
	
			// Validate required fields
			if (accountID == null || password == null || hovaten == null || soDienThoai == null || vaiTro == null
					|| diaChi == null) {
				response.put("message", "Tất cả các trường là bắt buộc!");
				return ResponseEntity.badRequest().body(response); // 400 Bad Request
			}
	
			// Create user entity
			Users user = new Users();
			user.setAccountID(accountID);
			user.setPassword(password);
			user.setHovaten(hovaten);
			user.setSo_dien_thoai(soDienThoai);
			user.setTrang_thai_xoa(null);
	
			// Create role and address entities
			Roles role = new Roles();
			role.setTen_vai_tro(vaiTro);
	
			DiaChi diaChiEntity = new DiaChi();
			
		
			
			diaChiEntity.setDia_chi(diaChi);
//			
//			if (hinhAnh != null && !hinhAnh.isEmpty()) {
//		    	// Lưu ảnh vào thư mục public/images (từ thư mục gốc của dự án)
//		        String filePath = "C:\\Users\\DELL\\Downloads\\LoiFrontend\\public\\images" + hinhAnh.getOriginalFilename();
//		        hinhAnh.transferTo(new File(filePath)); // Lưu ảnh vào server
//		        user.setHinh_anh(hinhAnh.getOriginalFilename()); // Lưu tên file vào cơ sở dữ liệu
//		    }
//			

			// Attempt to save user details with service
			try {
				Users createdUser = usersService.createUserWithImageAndDetails(user, role, diaChiEntity, hinhAnh);
				response.put("message", "Người dùng đã được tạo thành công!");
				response.put("user", createdUser); // Đảm bảo không tiết lộ mật khẩu
				return new ResponseEntity<>(response, HttpStatus.CREATED); // 201 Created
			} catch (IOException e) {
				logger.error("Error while saving user", e);
				response.put("message", "Không thể lưu người dùng!");
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response); // 500 Internal Server Error
			}
		}
		@PutMapping("/{accountId}")
		public ResponseEntity<Map<String, Object>> update2(
				@RequestParam("accountID") String accountID, @RequestParam("password") String password,
				@RequestParam("hovaten") String hovaten, @RequestParam("so_dien_thoai") String soDienThoai,
				@RequestParam("vai_tro") String vaiTro, @RequestParam("dia_chi") String diaChi,
				@RequestParam("trang_thai_xoa") String trang_thai_xoa,
				@RequestParam(value = "hinh_anh", required = false) MultipartFile hinhAnh) throws IllegalStateException, IOException {
			Map<String, Object> response = new HashMap<>();
			
			// Validate required fields
			if (accountID == null || password == null || hovaten == null || soDienThoai == null || vaiTro == null
					|| diaChi == null) {
				response.put("message", "Tất cả các trường là bắt buộc!");
				return ResponseEntity.badRequest().body(response); // 400 Bad Request
			}
				
			// Create user entity
			Users user = new Users();
			user.setAccountID(accountID);
			user.setPassword(password);
			user.setHovaten(hovaten);
			user.setSo_dien_thoai(soDienThoai);
			user.setTrang_thai_xoa(null);
	

			  // Nếu có ảnh, lấy tên ảnh và lưu vào đối tượng Users
		    if (hinhAnh != null && !hinhAnh.isEmpty()) {
		    	// Lưu ảnh vào thư mục public/images (từ thư mục gốc của dự án)
		        String filePath = "C:\\Users\\DELL\\Downloads\\LoiFrontend\\public\\images" + hinhAnh.getOriginalFilename();
		        hinhAnh.transferTo(new File(filePath)); // Lưu ảnh vào server
		        user.setHinh_anh(hinhAnh.getOriginalFilename()); // Lưu tên file vào cơ sở dữ liệu
		    }
			// Create role and address entities
			Roles role = new Roles();
			role.setTen_vai_tro(vaiTro);
			
			DiaChi diaChiEntity = new DiaChi();
			diaChiEntity.setDia_chi(diaChi);
			
			// Attempt to save user details with service
			try {
				Users createdUser = usersService.createUserWithImageAndDetailss(user, role, diaChiEntity, hinhAnh);
				response.put("message", "Người dùng đã được tạo thành công!");
				response.put("user", createdUser); // Đảm bảo không tiết lộ mật khẩu
				return new ResponseEntity<>(response, HttpStatus.CREATED); // 201 Created
			} catch (IOException e) {
				logger.error("Error while saving user", e);
				response.put("message", "Không thể lưu người dùng!");
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response); // 500 Internal Server Error
			}
		}
		
		@DeleteMapping("/{accountId}")
		public ResponseEntity<Void> deleteUser(@PathVariable String accountId) {
			if (!userRepository.existsById(accountId)) {
				return ResponseEntity.notFound().build();
			}
			userRepository.deleteById(accountId);
			return ResponseEntity.noContent().build();
		}
		
//		tab hanhdong
		@GetMapping("/gethanhdong")
		public List<UserDTO> getMethodName() {
			return HanhDongReopository.findUser();
		}
		
		
	}
