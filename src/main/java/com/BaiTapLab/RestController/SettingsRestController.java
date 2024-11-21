package com.BaiTapLab.RestController;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.BaiTapLab.Entity.HanhDong;
import com.BaiTapLab.Entity.Settings;
import com.BaiTapLab.Repository.SettingsRepository;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Service.SettingService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SettingsRestController {
	@Autowired
	SettingService settingService;
	
	@Autowired
	SettingsRepository settingsRepository;
	
	@Autowired
    UsersRepository userRepository;
	
	@GetMapping("/loadSettings")
    public ResponseEntity<List<Settings>> getSettings(){
		List<Settings> listSettings = settingsRepository.findAll();
		System.out.println(listSettings);
		return ResponseEntity.ok(listSettings);
	}
	
	@PutMapping("/setting/update/{settingid}")
	public ResponseEntity<?> updateSettings(
	        @PathVariable("settingid") String settingid,
	        @RequestParam("ten_cua_hang") String ten_cua_hang,
	        @RequestParam("so_dien_thoai") String so_dien_thoai,
	        @RequestParam(value = "faviicon", required = false) MultipartFile[] faviicon,
	        @RequestParam(value = "logo", required = false) MultipartFile[] logo,
    		@RequestParam("accountID") String accountID,
    		@RequestParam("dia_chi_cua_hang") String dia_chi_cua_hang) {
    		

	    try {
	        // Tìm setting theo ID
	        Settings setting = settingService.findBySettingsID(settingid);
	        
	        // Cập nhật các thuộc tính của setting
	        setting.setTen_cua_hang(ten_cua_hang);
	        setting.setSo_dien_thoai(so_dien_thoai);
	        setting.setDia_chi_cua_hang(dia_chi_cua_hang);
	        setting.setUsers(userRepository.findByAccountID(accountID));

	        // Xử lý file ảnh nếu được upload
	        if (faviicon != null && faviicon.length > 0) {
	            String tenFaviicon = faviicon[0].getOriginalFilename();
	            String uploadDir = System.getProperty("user.dir") + "/uploads/images/";

	            // Tạo thư mục nếu chưa tồn tại
	            File hinhFile = new File(uploadDir + tenFaviicon);
	            if (!hinhFile.getParentFile().exists()) {
	                hinhFile.getParentFile().mkdirs();
	            }

	            // Lưu file ảnh vào thư mục
	            faviicon[0].transferTo(hinhFile);

	            // Tạo URL để truy cập ảnh và lưu vào đối tượng ThuongHieu
	            String imageUrl = "/uploads/images/" + tenFaviicon;
	            setting.setFaviicon(tenFaviicon);
	        }
	        
	     // Xử lý file logo nếu được upload
	        if (logo != null && logo.length > 0) {
	            String tenLogo = logo[0].getOriginalFilename();
	            String uploadDir = System.getProperty("user.dir") + "/uploads/images/";

	            // Tạo thư mục nếu chưa tồn tại
	            File logoFile = new File(uploadDir + tenLogo);
	            if (!logoFile.getParentFile().exists()) {
	                logoFile.getParentFile().mkdirs();
	            }

	         // Lưu logo vào thư mục
	            logo[0].transferTo(logoFile);
	            String logoUrl = "/uploads/images/" + tenLogo; // Không thêm http://localhost:8080 ở đây
	            setting.setLogo(tenLogo);

	        }

	        // Lưu thương hiệu vào DB qua service
	        Settings updatedSettings = settingService.updateSettings(setting);

	        // Trả về thông tin thương hiệu đã lưu
	        return ResponseEntity.ok(updatedSettings);

	    } catch (IOException e) {
	        // Xử lý lỗi IO
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Lỗi khi lưu file: " + e.getMessage());
	    } catch (Exception e) {
	        // Xử lý lỗi chung
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Lỗi khi cập nhật setting: " + e.getMessage());
	    }
	}
}
