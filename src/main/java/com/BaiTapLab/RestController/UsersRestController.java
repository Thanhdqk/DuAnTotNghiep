package com.BaiTapLab.RestController;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.BaiTapLab.Entity.DiaChi;
import com.BaiTapLab.Entity.Roles;
import com.BaiTapLab.Entity.Shipper;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.ShipperRepository;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Security.JwtUtil;
import com.BaiTapLab.Service.UsersService;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000, http://192.168.137.1:3000"})
public class UsersRestController {
	@Autowired
	UsersRepository usersRepository;
	
	@Autowired
	UsersService usersService;
	
	@Autowired
	ShipperRepository shipperRepository;
	
	@Autowired
    private JwtUtil jwtUtil;
	
	@PostMapping("/login/mobile")
	public ResponseEntity<Map<String, Object>> loginMobile(@RequestBody Map<String, String> loginRequest) {
		 System.out.println("Login Request: " + loginRequest);
		String shipperid = loginRequest.get("shipperid");
	    String password = loginRequest.get("password");
	    System.out.println("Shipperid 1: " + shipperid);  // In ra để kiểm tra
	    System.out.println("Password: " + password); 
	    Map<String, Object> response = new HashMap<>();
	    try {
	        Optional<Shipper> user = shipperRepository.findByShipperIDAndPassword(shipperid, password);
	        if (user.isPresent()) {
	            String token = jwtUtil.generateToken(user.get().getShipperID());
	            response.put("message", "Đăng nhập thành công!");
	            response.put("token", token);
	            response.put("shipperid", user.get().shipperID);
	            response.put("hinhAnh", user.get().getHinh_anh());
	            response.put("hovaten", user.get().getHovaten());
	            response.put("vaitro", user.get().getVai_tro());
	            return ResponseEntity.ok(response);
	        } else {
	            response.put("message", "Sai tài khoản hoặc mật khẩu!");
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
	        }
	    } catch (Exception e) {
	        response.put("message", "Lỗi hệ thống: " + e.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	    }
	}
	
	@GetMapping("/list/users")
	public List<Map<String, Object>> getUsers() {
        return usersService.listUsers().stream().map(user -> Map.of(
            "accountID", user[0],
            "hinh_anh", user[1],
            "hoat_dong", user[2],
            "hovaten", user[3],
            "password", user[4],
            "so_dien_thoai", user[5],
            "dia_chi", user[6],
            "ten_vai_tro", user[7]
        )).collect(Collectors.toList());
    }
	
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginRequest) {
	    String accountID = loginRequest.get("accountID");
	    String password = loginRequest.get("password");

	    Map<String, Object> response = new HashMap<>();
	    try {
	        Optional<Users> user = usersRepository.findByAccountIDAndPassword(accountID, password);

	        if (user.isPresent()) {
	            String token = jwtUtil.generateToken(user.get().getAccountID());
	            response.put("message", "Đăng nhập thành công!");
	            response.put("token", token);
	            response.put("accountID", user.get().accountID);
	            response.put("hinhAnh", user.get().getHinh_anh());
	            response.put("hovaten", user.get().getHovaten());
	            response.put("roles", user.get().getRoles().stream()
	                .map(Roles::getTen_vai_tro)
	                .collect(Collectors.toList()));
	            return ResponseEntity.ok(response);
	        } else {
	            response.put("message", "Sai tài khoản hoặc mật khẩu!");
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
	        }
	    } catch (Exception e) {
	        response.put("message", "Lỗi hệ thống: " + e.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	    }
	}

	
	
	@PostMapping("/add/users")
	public ResponseEntity<Map<String, Object>> createUserWithImageAndDetails(
			@RequestParam("accountID") String accountID, @RequestParam("password") String password,
			@RequestParam("hovaten") String hovaten, @RequestParam("so_dien_thoai") String so_dien_thoai,
			@RequestParam("ten_vai_tro") String ten_vai_tro, @RequestParam("dia_chi") String dia_chi,
			@RequestParam("hoat_dong") String hoat_dong,
			@RequestParam(value = "hinh_anh", required = false) MultipartFile hinh_anh) throws IllegalStateException, IOException {
		Map<String, Object> response = new HashMap<>();

		// Validate required fields
		if (accountID == null || password == null || hovaten == null || so_dien_thoai == null || ten_vai_tro == null
				|| dia_chi == null) {
			response.put("message", "Tất cả các trường là bắt buộc!");
			return ResponseEntity.badRequest().body(response); // 400 Bad Request
		}

		 if (usersService.existsByAccountID(accountID)) { // Phương thức existsByAccountID phải được định nghĩa trong usersService
		        response.put("message", "Tài khoản đã tồn tại, không thể thêm mới!");
		        return ResponseEntity.status(HttpStatus.CONFLICT).body(response); // 409 Conflict
		 }
		// Create user entity
		Users user = new Users();
		user.setAccountID(accountID);
		user.setPassword(password);
		user.setHovaten(hovaten);
		user.setHoat_dong(hoat_dong);
		user.setSo_dien_thoai(so_dien_thoai);

		// Create role and address entities
		Roles role = new Roles();
		role.setTen_vai_tro(ten_vai_tro);

		DiaChi diaChiEntity = new DiaChi();
		diaChiEntity.setDia_chi(dia_chi);

		if (hinh_anh != null) {
            String tenHinhAnh = hinh_anh.getOriginalFilename();
            String uploadDir = System.getProperty("user.dir") + "/uploads/images/";

            // Tạo thư mục nếu chưa tồn tại
            File hinhFile = new File(uploadDir + tenHinhAnh);
            if (!hinhFile.getParentFile().exists()) {
                hinhFile.getParentFile().mkdirs();
            }

            // Lưu file ảnh vào thư mục
            hinh_anh.transferTo(hinhFile);

            // Tạo URL để truy cập ảnh và lưu vào đối tượng Voucher
            String imageUrl = "http://localhost:8080/images/" + tenHinhAnh;
            user.setHinh_anh(tenHinhAnh);
        }
		// Attempt to save user details with service
		try {
			Users createdUser = usersService.createUserWithImageAndDetails(user, role, diaChiEntity, hinh_anh);
			response.put("message", "Người dùng đã được tạo thành công!");
			response.put("user", createdUser); // Đảm bảo không tiết lộ mật khẩu
			return new ResponseEntity<>(response, HttpStatus.CREATED); // 201 Created
		} catch (IOException e) {
			response.put("message", "Không thể lưu người dùng!");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response); // 500 Internal Server Error
		}
	}
	
	@PutMapping("/update/users/{accountID}")
	public ResponseEntity<Map<String, Object>> update2(
			@RequestParam("accountID") String accountID, @RequestParam("password") String password,
			@RequestParam("hovaten") String hovaten, @RequestParam("so_dien_thoai") String so_dien_thoai,
			@RequestParam("ten_vai_tro") String ten_vai_tro, @RequestParam("dia_chi") String dia_chi,
			@RequestParam("hoat_dong") String hoat_dong,
			@RequestParam(value = "hinh_anh", required = false) MultipartFile hinh_anh) throws IllegalStateException, IOException {
		Map<String, Object> response = new HashMap<>();

		// Validate required fields
		if (accountID == null || password == null || hovaten == null || so_dien_thoai == null || ten_vai_tro == null
				|| dia_chi == null) {
			response.put("message", "Tất cả các trường là bắt buộc!");
			return ResponseEntity.badRequest().body(response); // 400 Bad Request
		}

		// Create user entity
		Users user = new Users();
		user.setAccountID(accountID);
		user.setPassword(password);
		user.setHovaten(hovaten);
		user.setHoat_dong(hoat_dong);
		user.setSo_dien_thoai(so_dien_thoai);

		// Create role and address entities
		Roles role = new Roles();
		role.setTen_vai_tro(ten_vai_tro);

		DiaChi diaChiEntity = new DiaChi();
		diaChiEntity.setDia_chi(dia_chi);

		if (hinh_anh != null) {
            String tenHinhAnh = hinh_anh.getOriginalFilename();
            String uploadDir = System.getProperty("user.dir") + "/uploads/images/";

            // Tạo thư mục nếu chưa tồn tại
            File hinhFile = new File(uploadDir + tenHinhAnh);
            if (!hinhFile.getParentFile().exists()) {
                hinhFile.getParentFile().mkdirs();
            }

            // Lưu file ảnh vào thư mục
            hinh_anh.transferTo(hinhFile);

            // Tạo URL để truy cập ảnh và lưu vào đối tượng Voucher
            String imageUrl = "http://localhost:8080/images/" + tenHinhAnh;
            user.setHinh_anh(tenHinhAnh);
        }
		// Attempt to save user details with service
		try {
			Users createdUser = usersService.createUserWithImageAndDetails(user, role, diaChiEntity, hinh_anh);
			response.put("message", "Người dùng đã được tạo thành công!");
			response.put("user", createdUser); // Đảm bảo không tiết lộ mật khẩu
			return new ResponseEntity<>(response, HttpStatus.CREATED); // 201 Created
		} catch (IOException e) {
			response.put("message", "Không thể lưu người dùng!");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response); // 500 Internal Server Error
		}
	}
	
	@DeleteMapping("/delete/users/{accountID}")
	public ResponseEntity<Void> deleteUser(@PathVariable String accountID) {
		if (!usersRepository.existsById(accountID)) {
			return ResponseEntity.notFound().build();
		}
		usersRepository.deleteById(accountID);
		return ResponseEntity.noContent().build();
	}

//	@GetMapping("/getUserAndAddress")
//	public List<Map<String, Object>> getUsersWithAddress() {
//	    List<Object[]> results = usersRepository.findAllUserWithAddress();
//	    
//	    List<Map<String, Object>> response = new ArrayList <>();
//	    
//	    for (Object[] row : results) {
//	        Map<String, Object> userAddress = new HashMap<>();
//	        userAddress.put("accountID", row[0]);
//	        userAddress.put("hovaten", row[1]);
//	        userAddress.put("soDienThoai", row[2]);
//	        userAddress.put("hoatDong", row[3]);
//	        userAddress.put("diaChi", row[4]);
//	        userAddress.put("diaChiID", row[5]);
//
//	        response.add(userAddress);
//	    }
//	    return response;
//	}
//	
//    @GetMapping("/test")
//    public List<Users> test() {
//        return usersRepository.findAll();
//    }
//	@PostMapping("/login")
//	public ResponseEntity<Map<String, Object>> login(@RequestParam String email, @RequestParam String password) {
//	    Optional<Users> user = usersRepository.findByEmailAndPassword(email, password);
//	    
//	    Map<String, Object> response = new HashMap<>();
//
//	    if (user.isPresent()) {
//	        response.put("message", "Đăng nhập thành công!"); 
//	        //response.put(user.get().getHinh_anh(), response);
////	        response.put("roles", user.get().getRoles().stream()
////	                .map(Roles::getTen_vai_tro)
////	                .collect(Collectors.toList())); // Thêm vai trò vào phản hồi
//	        return ResponseEntity.ok(response);
//	    } else {
//	        response.put("message", "Sai tài khoản hoặc mật khẩu!");
//	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//	    }
//	}

	
//	@PostMapping("/create")
//	public Users createUserWithImageAndDetails(
//	    @RequestParam("accountID") String accountID,
//	    @RequestParam("password") String password,
//	    @RequestParam("hovaten") String hovaten,
//	    @RequestParam("email") String email,
//	    @RequestParam("so_dien_thoai") String soDienThoai,
//	    @RequestParam("vai_tro") String vaiTro,
//	    @RequestParam("dia_chi") String diaChi,
//	    @RequestParam(value = "hinh_anh", required = false) MultipartFile hinhAnh
//	) throws IOException {
//	    Users user = new Users();
//	    user.setAccountID(accountID);
//	    user.setPassword(password);
//	    user.setHovaten(hovaten);
//	    user.setEmail(email);
//	    user.setSo_dien_thoai(soDienThoai);
//
//	    // Nếu có ảnh, lấy tên ảnh và lưu vào đối tượng Users
//	    if (hinhAnh != null && !hinhAnh.isEmpty()) {
//	    	// Lưu ảnh vào thư mục public/images (từ thư mục gốc của dự án)
//	        String filePath = "D:\\DuAnTotNghiep\\Khanhfrontedn\\public\\images\\" + hinhAnh.getOriginalFilename();
//	        hinhAnh.transferTo(new File(filePath)); // Lưu ảnh vào server
//	        user.setHinh_anh(hinhAnh.getOriginalFilename()); // Lưu tên file vào cơ sở dữ liệu
//	    }
//
//	    Roles role = new Roles();
//	    role.setTen_vai_tro(vaiTro);
//
//	    DiaChi diaChiEntity = new DiaChi();
//	    diaChiEntity.setDia_chi(diaChi);
//
//	    // Gọi service để lưu thông tin người dùng, vai trò và địa chỉ
//	    return usersService.createUserWithImageAndDetails(user, role, diaChiEntity, hinhAnh);
//	}

}
