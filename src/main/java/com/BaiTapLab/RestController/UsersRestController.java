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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.BaiTapLab.Entity.DiaChi;
import com.BaiTapLab.Entity.Roles;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Security.JwtUtil;
import com.BaiTapLab.Service.UsersService;


@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")
public class UsersRestController {
	@Autowired
	UsersRepository usersRepository;
	
	@Autowired
	UsersService usersService;
	
	@Autowired
    private JwtUtil jwtUtil;
	
	@GetMapping("/getUserAndAddress")
	public List<Map<String, Object>> getUsersWithAddress() {
	    List<Object[]> results = usersRepository.findAllUserWithAddress();
	    
	    List<Map<String, Object>> response = new ArrayList <>();
	    
	    for (Object[] row : results) {
	        Map<String, Object> userAddress = new HashMap<>();
	        userAddress.put("accountID", row[0]);
	        userAddress.put("hovaten", row[1]);
	        userAddress.put("soDienThoai", row[2]);
	        userAddress.put("hoatDong", row[3]);
	        userAddress.put("diaChi", row[4]);
	        userAddress.put("diaChiID", row[5]);

	        response.add(userAddress);
	    }
	    return response;
	}
	
    @GetMapping("/test")
    public List<Users> test() {
        return usersRepository.findAll();
    }
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



}
