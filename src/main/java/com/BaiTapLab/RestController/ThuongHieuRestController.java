package com.BaiTapLab.RestController;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.BaiTapLab.Entity.ThuongHieu;
import com.BaiTapLab.Repository.NhaCungCapRepository;
import com.BaiTapLab.Repository.ThuongHieuRepository;
import com.BaiTapLab.Repository.UserRepository;
import com.BaiTapLab.Service.ThuongHieuService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class ThuongHieuRestController {
    @Autowired
    ThuongHieuService thuonghieuService;
    
    @Autowired
    ThuongHieuRepository thuonghieuRepository;
    
    @Autowired
    UserRepository userRepository;
    
    @Autowired
    NhaCungCapRepository nhaCungCapRepository;
    
    @GetMapping("/loadAll")
    public ResponseEntity<List<ThuongHieu>> getThuongHieu(){
		List<ThuongHieu> listThuongHieu = thuonghieuRepository.findAll();
		System.out.println(listThuongHieu);
		return ResponseEntity.ok(listThuongHieu);
	}
    
    @GetMapping("/edit/thuonghieu/{thuong_hieuID}")
	public ResponseEntity<ThuongHieu> getSanPhamById(@PathVariable String thuong_hieuID){
		Optional<ThuongHieu> thuonghieu = thuonghieuRepository.findById(thuong_hieuID);
	    return thuonghieu.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

    @PostMapping("/thuonghieu/add")
	public ResponseEntity<?> addThuongHieu(
	        @RequestParam("thuong_hieuID") String thuong_hieuID,
	        @RequestParam("ten_thuong_hieu") String ten_thuong_hieu,
	        @RequestParam("ngay_tao") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate ngay_tao,
	        @RequestParam("hoat_dong") String hoat_dong,
	        @RequestParam(value = "hinh_anh", required = false) MultipartFile[] hinh_anh,
    		@RequestParam("accountID") String accountID,
    		@RequestParam("nha_cung_capID") String nha_cung_capID){

	    try {
	        // Tạo đối tượng Thương Hiệu từ các tham số
	        ThuongHieu thuonghieu = new ThuongHieu();
	        thuonghieu.setThuong_hieuID(thuong_hieuID);
	        thuonghieu.setTen_thuong_hieu(ten_thuong_hieu);
	        thuonghieu.setNgay_tao(ngay_tao);
	        thuonghieu.setHoat_dong(hoat_dong);
	        thuonghieu.setUsers(userRepository.findByAccountID(accountID));
	        thuonghieu.setNhacungcap(nhaCungCapRepository.findByNha_cung_capID(nha_cung_capID));
	        thuonghieu.setHanh_dong("Thêm");
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
	            thuonghieu.setHinh_anh(tenHinhAnh);
	        }

	        // Lưu voucher vào DB qua service
	        ThuongHieu savedThuongHieu = thuonghieuService.createThuongHieu(thuonghieu);

	        // Trả về thông tin voucher đã lưu
	        return ResponseEntity.ok(savedThuongHieu);

	    } catch (IOException e) {
	        // Xử lý lỗi IO
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Lỗi khi lưu file: " + e.getMessage());
	    } catch (Exception e) {
	        // Xử lý lỗi chung
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Lỗi khi tạo thương hiệu: " + e.getMessage());
	    }
	}
    

    @PutMapping("/thuonghieu/update/{thuong_hieuID}")
	public ResponseEntity<?> updateThuongHieu(
	        @PathVariable String thuong_hieuID,
	        @RequestParam("ten_thuong_hieu") String ten_thuong_hieu,
	        @RequestParam("ngay_tao") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate ngay_tao,
	        @RequestParam("hoat_dong") String hoat_dong,
	        @RequestParam(value = "hinh_anh", required = false) MultipartFile[] hinh_anh,
    		@RequestParam("accountID") String accountID,
    		@RequestParam("nha_cung_capID") String nha_cung_capID) {

	    try {
	        // Tìm voucher theo ID
	        ThuongHieu thuonghieu = thuonghieuService.findByThuongHieuID(thuong_hieuID);
	        
	        // Cập nhật các thuộc tính của voucher
	        thuonghieu.setThuong_hieuID(thuong_hieuID);
	        thuonghieu.setTen_thuong_hieu(ten_thuong_hieu);
	        thuonghieu.setNgay_tao(ngay_tao);
	        thuonghieu.setHoat_dong(hoat_dong);
	        thuonghieu.setUsers(userRepository.findByAccountID(accountID));
	        thuonghieu.setNhacungcap(nhaCungCapRepository.findByNha_cung_capID(nha_cung_capID));
	        thuonghieu.setHanh_dong("Cập nhật");

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
	            thuonghieu.setHinh_anh(tenHinhAnh);
	        }

	        // Lưu voucher vào DB qua service
	        ThuongHieu updatedThuongHieu = thuonghieuService.updateThuongHieu(thuonghieu);

	        // Trả về thông tin voucher đã lưu
	        return ResponseEntity.ok(updatedThuongHieu);

	    } catch (IOException e) {
	        // Xử lý lỗi IO
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Lỗi khi lưu file: " + e.getMessage());
	    } catch (Exception e) {
	        // Xử lý lỗi chung
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Lỗi khi cập nhật thương hiệu: " + e.getMessage());
	    }
	}

    @DeleteMapping("/thuonghieu/delete/{thuong_hieuID}")
	public ResponseEntity<?> deleteThuongHieu(@PathVariable String thuong_hieuID) {
	    try {
	        // Tìm voucher theo ID
	        ThuongHieu thuonghieu = thuonghieuService.findByThuongHieuID(thuong_hieuID);
	        if (thuonghieu != null) {
	            // Xóa voucher
	            thuonghieuService.deleteThuongHieu(thuong_hieuID);
	            return ResponseEntity.ok("Thương hiệu đã được xóa thành công!");
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                    .body("Không tìm thấy thương hiệu với ID: " + thuong_hieuID);
	        }
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Lỗi khi xóa voucher: " + e.getMessage());
	    }
	}
    
    @PutMapping("/thuonghieu/deleteToGarbage/{thuong_hieuID}")
	public ResponseEntity<Object> deleteThuongHieuToGarbage(@PathVariable String thuong_hieuID) {
	    boolean isDeleted = thuonghieuService.deleteThuongHieuById(thuong_hieuID);
	    if (isDeleted) {
	        // Trả về một đối tượng JSON
	        return ResponseEntity.ok(Collections.singletonMap("message", "Thương hiệu đã được cập nhật trạng thái xóa"));
	    } else {
	        // Trả về một đối tượng JSON chứa thông báo lỗi
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "Không tìm thấy thương hiệu với ID: " + thuong_hieuID));
	    }
	}

	@PutMapping("/thuonghieu/reloadFromGarbage/{thuong_hieuID}")
	public ResponseEntity<Object> deleteThuongHieuToGarbageNull(@PathVariable String thuong_hieuID) {
	    boolean isDeleted = thuonghieuService.reloadThuongHieuById(thuong_hieuID);
	    if (isDeleted) {
	        // Trả về một đối tượng JSON
	        return ResponseEntity.ok(Collections.singletonMap("message", "Thương hiệu đã được cập nhật trạng thái chưa xóa"));
	    } else {
	        // Trả về một đối tượng JSON chứa thông báo lỗi
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "Không tìm thấy thương hiệu với ID: " + thuong_hieuID));
	    }
	}
}
