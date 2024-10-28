package com.BaiTapLab.RestController;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
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
	
//	@PostMapping("/voucher/add")
//	public ResponseEntity<Voucher> addVoucher(
//	        @RequestParam("voucherID") String voucherID,
//	        @RequestParam("dieu_kien") String dieu_kien,
//	        @RequestParam("don_hang_toi_thieu") int don_hang_toi_thieu,
//	        @RequestParam("han_su_dung") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate han_su_dung,
//	        @RequestParam("hoat_dong") String hoat_dong,
//	        @RequestParam("so_luong") int so_luong,
//	        @RequestParam("so_luot_SD") int so_luot_SD,
//	        @RequestParam("so_tien_giam") int so_tien_giam,
//	        @RequestParam("hinh_anh") MultipartFile[] hinh_anh) throws IllegalStateException, IOException { // Sử dụng MultipartFile cho hình ảnh
//
//	    // Tạo đối tượng Voucher từ các tham số
//	    Voucher voucher = new Voucher();
//	    voucher.setVoucherID(voucherID);
//	    voucher.setDieu_kien(dieu_kien);
//	    voucher.setDon_hang_toi_thieu(don_hang_toi_thieu);
//	    voucher.setHan_su_dung(han_su_dung);
//	    voucher.setHoat_dong(hoat_dong);
//	    voucher.setSo_luong(so_luong);
//	    voucher.setSo_luot_SD(so_luot_SD);
//	    voucher.setSo_tien_giam(so_tien_giam);
//	    // Xử lý file hình ảnh nếu cần
//
////	    if (hinh_anh.length > 0) {
////	        for (MultipartFile file : hinh_anh) {
////	            String tenHinhAnh = file.getOriginalFilename(); // Lấy tên hình ảnh
////	            // Lưu tên hình ảnh vào Voucher
////	            voucher.setHinh_anh(tenHinhAnh);
////	            // Lưu file vào hệ thống file nếu cần
////	            file.transferTo(new File("src/main/resources/images/" + tenHinhAnh));
////	        }
////	    }
//	    if (hinh_anh.length > 0) {
//	    	String tenHinhAnh = hinh_anh[0].getOriginalFilename();
//	        String uploadDir = System.getProperty("user.dir") + "/uploads/images/";
//
//	        // Tạo thư mục nếu chưa tồn tại
//	        File hinhFile = new File(uploadDir + tenHinhAnh);
//	        if (!hinhFile.getParentFile().exists()) {
//	            hinhFile.getParentFile().mkdirs();
//	        }
//
//	        // Lưu file ảnh
//	        hinh_anh[0].transferTo(hinhFile);
//
//	        // Tạo URL để truy cập ảnh
//	        String imageUrl = "http://localhost:8080/images/" + tenHinhAnh;
//	    }
//	    Voucher saveVoucher = voucherService.createVoucher(voucher);
//	    return ResponseEntity.ok(saveVoucher);
//	}

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

	
	
}
