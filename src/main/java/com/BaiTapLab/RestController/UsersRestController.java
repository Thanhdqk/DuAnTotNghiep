package com.BaiTapLab.RestController;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.catalina.User;
import org.aspectj.apache.bcel.classfile.Module.Uses;
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
import com.BaiTapLab.Entity.MailInfo;
import com.BaiTapLab.Entity.Roles;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.HanhDongReopository;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Service.MailerService;
import com.BaiTapLab.Service.UsersService;
import com.google.cloud.storage.Acl;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

import jakarta.mail.MessagingException;
import jakarta.servlet.ServletContext;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = { "http://localhost:3000" })
public class UsersRestController {
	
	@Autowired
	MailerService mailerService;

	private static final Logger logger = LoggerFactory.getLogger(UsersRestController.class);
 
	
	@Autowired
	private UsersRepository userRepository;

	@Autowired
	private UsersService usersService;

	@Autowired
	HanhDongReopository HanhDongReopository;

	@Autowired
	ServletContext context;

	
	public List<Map<String, Object>> MapToData(List<Object[]> results) {
		List<Map<String, Object>> sanPhamList = new ArrayList<>();

		for (Object[] row : results) {
			Map<String, Object> sanPham = new HashMap<>();
			sanPham.put("accountID", row[0]);
			sanPham.put("hovaten", row[3]);
			sanPham.put("ten_vai_tro", row[2]);
			sanPham.put("hinh_anh", row[5]);
			sanPham.put("so_dien_thoai", row[4]);
			sanPham.put("dia_chi", row[1]);
			sanPham.put("hoat_dong", row[6]);
			sanPham.put("password", row[7]);
		
			
		
			sanPhamList.add(sanPham);
		}

		return sanPhamList;
	}
	
	@GetMapping("/testtest")
	public ResponseEntity<List<Object[]>> listTest(){
		List<Object[]> list = userRepository.listVaiTroUser();
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("getUser")
	public List<Map<String, Object>> getMethodName2() {
		List<Object[]> listNhanVienUser = userRepository.listVaiTroUser();
		return MapToData(listNhanVienUser);
	}
	@GetMapping("getNhanVien")
	public  List<Map<String, Object>>  getMethodNhanVien() {
		List<Object[]> listNhanVienUser = userRepository.listVaiTroNhanVien();
		return  MapToData(listNhanVienUser);
	}
	

	@GetMapping
	public List<Users> getAllUsers() {
		return userRepository.findAll();
	}

	@GetMapping("/trung")
	public List<Users> getAllUserss(@RequestParam("accountID") String accountID) {
		return userRepository.findUserByVPP(accountID);
	}
	
	@GetMapping("/delete/{id}")
	public void getAllAccountID(@PathVariable("id") String id) {
		Optional<Users> user = userRepository.findById(id);
		Users uservip = user.get();
		HanhDong hd = new HanhDong();
		hd.setUsers(uservip);
		hd.setNgay_hanh_dong(LocalDate.now());
		hd.setTen_hanh_dong("Xóa");
		HanhDongReopository.save(hd);
		userRepository.markAsDeleted(id);
	}
	
	@PutMapping("/vipham/{id}")
	public void mark(@PathVariable("id") String id) throws MessagingException {
		context.setAttribute("method", "ban");
		userRepository.mark(id);
		Map<String, Object> model = new HashMap();
		model.put("user", id);
		model.put("donhangid", id);
		try {
			MailInfo mail1 = new MailInfo(id, "Thông báo tài khoản của bạn đã bị khóa ",
					mailerService.bodyTemplate(model));
			mailerService.send(mail1);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@GetMapping("/path")
	public List<Users> getMethod() {
		return usersService.findByVP();
	}

	@GetMapping("/back/{id}")
	public void back(@PathVariable("id") String id) {
		Optional<Users> user = userRepository.findById(id);
		context.setAttribute("method", "back");
		Users uservip = user.get();
		HanhDong hd = new HanhDong();
		hd.setNgay_hanh_dong(LocalDate.now());
		hd.setUsers(uservip);
		hd.setTen_hanh_dong("Reload");

		Map<String, Object> model = new HashMap();
		model.put("user", id);

		try {
			MailInfo mail1 = new MailInfo(id, "Tài khoản được khôi phục ", mailerService.bodyTemplate(model));
			mailerService.send(mail1);
		} catch (Exception e) {
			e.printStackTrace();
		}
		HanhDongReopository.save(hd);
		userRepository.back(id);
	}

	@PostMapping("/add")
	public ResponseEntity<Map<String, Object>> createUserWithImageAndDetails(
			@RequestParam("accountID") String accountID, @RequestParam("password") String password,
			@RequestParam("hovaten") String hovaten, @RequestParam("so_dien_thoai") String soDienThoai,
			@RequestParam("vai_tro") String vaiTro, @RequestParam("dia_chi") String diaChi,
			@RequestParam("trang_thai_xoa") String trang_thai_xoa,
			@RequestParam(value = "hinh_anh", required = false) MultipartFile hinhAnh)
			throws IllegalStateException, IOException {
		context.setAttribute("method", "add");
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
		Map<String, Object> model = new HashMap();
		model.put("user", accountID);

		try {
			MailInfo mail1 = new MailInfo(accountID, "asdass ", mailerService.bodyTemplate(model));
			mailerService.send(mail1);
		} catch (Exception e) {
			e.printStackTrace();
		}
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

	@PutMapping("/put/{accountId}")
	public ResponseEntity<Map<String, Object>> createUserWithImageAndDetailss(
			@RequestParam("accountID") String accountID, @RequestParam("password") String password,
			@RequestParam("hovaten") String hovaten, @RequestParam("so_dien_thoai") String soDienThoai,
			
			@RequestParam("vai_tro") String vaiTro, @RequestParam("dia_chi") String diaChi,
			@RequestParam(value = "trang_thai_xoa",required = false) String trang_thai_xoa,
			@RequestParam(value = "hoat_dong",required = false) String hoat_dong,
			@RequestParam(value = "hinh_anh", required = false) MultipartFile hinhAnh)
	
			throws IllegalStateException, IOException {
		Map<String, Object> response = new HashMap<>();
		
		System.out.println("Role : " + vaiTro);
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
		user.setHoat_dong(hoat_dong);
		System.out.println("Users : " + user);

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
//			response.put("message", "Người dùng đã được tạo thành công!");
//			response.put("user", createdUser); // Đảm bảo không tiết lộ mật khẩu
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

	@GetMapping("/vipham")
	public List<Users> findByViPham() {
		return usersService.findByViPham();
	}

}
