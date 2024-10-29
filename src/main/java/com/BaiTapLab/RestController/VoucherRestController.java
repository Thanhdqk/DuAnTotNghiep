package com.BaiTapLab.RestController;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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

import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Entity.Voucher;
import com.BaiTapLab.Repository.VoucherRepository;
import com.BaiTapLab.Service.VoucherService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class VoucherRestController {
	@Autowired
	VoucherRepository voucherRepository;
	
	@Autowired
	VoucherService voucherService;
	
	@GetMapping("/listVoucher")
	public ResponseEntity<List<Voucher>> getVoucher(){
		List<Voucher> listVoucher = voucherRepository.findAll();
		System.out.println(listVoucher);
		return ResponseEntity.ok(listVoucher);
	}

	@GetMapping("/edit/voucher/{voucherID}")
	public ResponseEntity<Voucher> getSanPhamById(@PathVariable String voucherID){
		Optional<Voucher> voucher = voucherRepository.findById(voucherID);
	    return voucher.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	@PostMapping("/voucher/add")
	public ResponseEntity<?> addVoucher(
	        @RequestParam("voucherID") String voucherID,
	        @RequestParam("dieu_kien") String dieu_kien,
	        @RequestParam("don_hang_toi_thieu") int don_hang_toi_thieu,
	        @RequestParam("han_su_dung") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate han_su_dung,
	        @RequestParam("hoat_dong") String hoat_dong,
	        @RequestParam("so_luong") int so_luong,
	        @RequestParam("so_luot_SD") int so_luot_SD,
	        @RequestParam("so_tien_giam") int so_tien_giam,
	        @RequestParam(value = "hinh_anh", required = false) MultipartFile[] hinh_anh) {

	    try {
	        // Tạo đối tượng Voucher từ các tham số
	        Voucher voucher = new Voucher();
	        voucher.setVoucherID(voucherID);
	        voucher.setDieu_kien(dieu_kien);
	        voucher.setDon_hang_toi_thieu(don_hang_toi_thieu);
	        voucher.setHan_su_dung(han_su_dung);
	        voucher.setHoat_dong(hoat_dong);
	        voucher.setSo_luong(so_luong);
	        voucher.setSo_luot_SD(so_luot_SD);
	        voucher.setSo_tien_giam(so_tien_giam);

	        // Xử lý file ảnh nếu được upload
	        if (hinh_anh != null && hinh_anh.length > 0) {
	            String tenHinhAnh = hinh_anh[0].getOriginalFilename();
	            String uploadDir = System.getProperty("user.dir") + "/uploads/images/";

	            // Tạo thư mục nếu chưa tồn tại
	            File hinhFile = new File(uploadDir + tenHinhAnh);
	            if (!hinhFile.getParentFile().exists()) {
	                hinhFile.getParentFile().mkdirs();
	            }

	            // Lưu file ảnh vào thư mục
	            hinh_anh[0].transferTo(hinhFile);

	            // Tạo URL để truy cập ảnh và lưu vào đối tượng Voucher
	            String imageUrl = "http://localhost:8080/images/" + tenHinhAnh;
	            voucher.setHinh_anh(tenHinhAnh);
	        }

	        // Lưu voucher vào DB qua service
	        Voucher savedVoucher = voucherService.createVoucher(voucher);

	        // Trả về thông tin voucher đã lưu
	        return ResponseEntity.ok(savedVoucher);

	    } catch (IOException e) {
	        // Xử lý lỗi IO
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Lỗi khi lưu file: " + e.getMessage());
	    } catch (Exception e) {
	        // Xử lý lỗi chung
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Lỗi khi tạo voucher: " + e.getMessage());
	    }
	}
	
	@PutMapping("/voucher/update/{voucherID}")
	public ResponseEntity<?> updateVoucher(
	        @PathVariable String voucherID,
	        @RequestParam("dieu_kien") String dieu_kien,
	        @RequestParam("don_hang_toi_thieu") int don_hang_toi_thieu,
	        @RequestParam("han_su_dung") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate han_su_dung,
	        @RequestParam("hoat_dong") String hoat_dong,
	        @RequestParam("so_luong") int so_luong,
	        @RequestParam("so_luot_SD") int so_luot_SD,
	        @RequestParam("so_tien_giam") int so_tien_giam,
	        @RequestParam(value = "hinh_anh", required = false) MultipartFile[] hinh_anh) {

	    try {
	        // Tìm voucher theo ID
	        Voucher voucher = voucherService.findByVoucherID(voucherID);
	        
	        // Cập nhật các thuộc tính của voucher
	        voucher.setDieu_kien(dieu_kien);
	        voucher.setDon_hang_toi_thieu(don_hang_toi_thieu);
	        voucher.setHan_su_dung(han_su_dung);
	        voucher.setHoat_dong(hoat_dong);
	        voucher.setSo_luong(so_luong);
	        voucher.setSo_luot_SD(so_luot_SD);
	        voucher.setSo_tien_giam(so_tien_giam);

	        // Xử lý file ảnh nếu được upload
	        if (hinh_anh != null && hinh_anh.length > 0) {
	            String tenHinhAnh = hinh_anh[0].getOriginalFilename();
	            String uploadDir = System.getProperty("user.dir") + "/uploads/images/";

	            // Tạo thư mục nếu chưa tồn tại
	            File hinhFile = new File(uploadDir + tenHinhAnh);
	            if (!hinhFile.getParentFile().exists()) {
	                hinhFile.getParentFile().mkdirs();
	            }

	            // Lưu file ảnh vào thư mục
	            hinh_anh[0].transferTo(hinhFile);

	            // Tạo URL để truy cập ảnh và lưu vào đối tượng Voucher
	            String imageUrl = "http://localhost:8080/images/" + tenHinhAnh;
	            voucher.setHinh_anh(tenHinhAnh);
	        }

	        // Lưu voucher vào DB qua service
	        Voucher updatedVoucher = voucherService.updateVoucher(voucher);

	        // Trả về thông tin voucher đã lưu
	        return ResponseEntity.ok(updatedVoucher);

	    } catch (IOException e) {
	        // Xử lý lỗi IO
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Lỗi khi lưu file: " + e.getMessage());
	    } catch (Exception e) {
	        // Xử lý lỗi chung
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Lỗi khi cập nhật voucher: " + e.getMessage());
	    }
	}

	@DeleteMapping("/voucher/delete/{voucherID}")
	public ResponseEntity<?> deleteVoucher(@PathVariable String voucherID) {
	    try {
	        // Tìm voucher theo ID
	        Voucher voucher = voucherService.findByVoucherID(voucherID);
	        if (voucher != null) {
	            // Xóa voucher
	            voucherService.deleteVoucher(voucherID);
	            return ResponseEntity.ok("Voucher đã được xóa thành công!");
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                    .body("Không tìm thấy voucher với ID: " + voucherID);
	        }
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Lỗi khi xóa voucher: " + e.getMessage());
	    }
	}
	
	@PutMapping("/voucher/deleteToGarbage/{voucherID}")
	public ResponseEntity<Object> deleteVoucherToGarbage(@PathVariable String voucherID) {
	    boolean isDeleted = voucherService.deleteVoucherById(voucherID);
	    if (isDeleted) {
	        // Trả về một đối tượng JSON
	        return ResponseEntity.ok(Collections.singletonMap("message", "Voucher đã được cập nhật trạng thái xóa."));
	    } else {
	        // Trả về một đối tượng JSON chứa thông báo lỗi
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "Không tìm thấy voucher với ID: " + voucherID));
	    }
	}

	@PutMapping("/voucher/reloadFromGarbage/{voucherID}")
	public ResponseEntity<Object> deleteVoucherToGarbageNull(@PathVariable String voucherID) {
	    boolean isDeleted = voucherService.reloadVoucherById(voucherID);
	    if (isDeleted) {
	        // Trả về một đối tượng JSON
	        return ResponseEntity.ok(Collections.singletonMap("message", "Voucher đã được cập nhật trạng thái xóa."));
	    } else {
	        // Trả về một đối tượng JSON chứa thông báo lỗi
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "Không tìm thấy voucher với ID: " + voucherID));
	    }
	}
	
}
