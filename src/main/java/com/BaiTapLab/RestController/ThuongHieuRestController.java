//package com.BaiTapLab.RestController;
//
//import java.io.File;
//import java.io.IOException;
//import java.time.LocalDate;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.format.annotation.DateTimeFormat;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.BaiTapLab.Entity.ThuongHieu;
//import com.BaiTapLab.Repository.ThuongHieuRepository;
//import com.BaiTapLab.Repository.UsersRepository;
//import com.BaiTapLab.Service.ThuongHieuService;
//
//@RestController
//@CrossOrigin("*")
//@RequestMapping("api")
//public class ThuongHieuRestController {
//	@Autowired
//    ThuongHieuService thuonghieuService;
//    
//    @Autowired
//    ThuongHieuRepository thuonghieuRepository;
//    
//    @Autowired
//    UsersRepository userRepository;
//    
//    @GetMapping("/thuonghieu/loadAll")
//    public ResponseEntity<List<ThuongHieu>> getThuongHieu(){
//		List<ThuongHieu> listThuongHieu = thuonghieuRepository.findAll();
//		System.out.println(listThuongHieu);
//		return ResponseEntity.ok(listThuongHieu);
//	}
//    
//
//    @PostMapping("/thuonghieu/add")
//	public ResponseEntity<?> addThuongHieu(
//	        @RequestParam("thuong_hieuID") String thuong_hieuID,
//	        @RequestParam("ten_thuong_hieu") String ten_thuong_hieu,
//	        @RequestParam("ngay_tao") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate ngay_tao,
//	        @RequestParam("hoat_dong") String hoat_dong,
//	        @RequestParam("trang_thai_xoa") String trang_thai_xoa,
//	        @RequestParam(value = "hinh_anh", required = false) MultipartFile[] hinh_anh,
//    		@RequestParam("accountID") String accountID){
//
//	    try {
//	        // Tạo đối tượng Thương Hiệu từ các tham số
//	        ThuongHieu thuonghieu = new ThuongHieu();
//	        thuonghieu.setThuong_hieuID(thuong_hieuID);
//	        thuonghieu.setTen_thuong_hieu(ten_thuong_hieu);
//	        thuonghieu.setNgay_tao(ngay_tao);
//	        thuonghieu.setHoat_dong(hoat_dong);
//	        thuonghieu.setTrang_thai_xoa(trang_thai_xoa);
//	        thuonghieu.setUsers(userRepository.findByAccountID(accountID));
//	        // Xử lý file ảnh nếu được upload
//	        if (hinh_anh != null && hinh_anh.length > 0) {
//	            String tenHinhAnh = hinh_anh[0].getOriginalFilename();
//	            String uploadDir = System.getProperty("user.dir") + "/uploads/images/";
//
//	            // Tạo thư mục nếu chưa tồn tại
//	            File hinhFile = new File(uploadDir + tenHinhAnh);
//	            if (!hinhFile.getParentFile().exists()) {
//	                hinhFile.getParentFile().mkdirs();
//	            }
//
//	            // Lưu file ảnh vào thư mục
//	            hinh_anh[0].transferTo(hinhFile);
//
//	            // Tạo URL để truy cập ảnh và lưu vào đối tượng Voucher
//	            String imageUrl = "http://localhost:8080/images/" + tenHinhAnh;
//	            thuonghieu.setHinh_anh(tenHinhAnh);
//	        }
//
//	        // Lưu voucher vào DB qua service
//	        ThuongHieu savedThuongHieu = thuonghieuService.createThuongHieu(thuonghieu);
//
//	        // Trả về thông tin voucher đã lưu
//	        return ResponseEntity.ok(savedThuongHieu);
//
//	    } catch (IOException e) {
//	        // Xử lý lỗi IO
//	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//	                .body("Lỗi khi lưu file: " + e.getMessage());
//	    } catch (Exception e) {
//	        // Xử lý lỗi chung
//	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//	                .body("Lỗi khi tạo thương hiệu: " + e.getMessage());
//	    }
//	}
//    
//
//    @PutMapping("/thuonghieu/update/{thuong_hieuID}")
//	public ResponseEntity<?> updateThuongHieu(
//	        @PathVariable String thuong_hieuID,
//	        @RequestParam("ten_thuong_hieu") String ten_thuong_hieu,
//	        @RequestParam("ngay_tao") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate ngay_tao,
//	        @RequestParam("hoat_dong") String hoat_dong,
//	        @RequestParam("trang_thai_xoa") String trang_thai_xoa,
//	        @RequestParam(value = "hinh_anh", required = false) MultipartFile[] hinh_anh,
//    		@RequestParam("accountID") String accountID) {
//
//	    try {
//	        // Tìm voucher theo ID
//	        ThuongHieu thuonghieu = thuonghieuService.findByThuongHieuID(thuong_hieuID);
//	        
//	        // Cập nhật các thuộc tính của voucher
//	        thuonghieu.setThuong_hieuID(thuong_hieuID);
//	        thuonghieu.setTen_thuong_hieu(ten_thuong_hieu);
//	        thuonghieu.setNgay_tao(ngay_tao);
//	        thuonghieu.setHoat_dong(hoat_dong);
//	        thuonghieu.setTrang_thai_xoa(trang_thai_xoa);
//	        thuonghieu.setUsers(userRepository.findByAccountID(accountID));
//
//	        // Xử lý file ảnh nếu được upload
//	        if (hinh_anh != null && hinh_anh.length > 0) {
//	            String tenHinhAnh = hinh_anh[0].getOriginalFilename();
//	            String uploadDir = System.getProperty("user.dir") + "/uploads/images/";
//
//	            // Tạo thư mục nếu chưa tồn tại
//	            File hinhFile = new File(uploadDir + tenHinhAnh);
//	            if (!hinhFile.getParentFile().exists()) {
//	                hinhFile.getParentFile().mkdirs();
//	            }
//
//	            // Lưu file ảnh vào thư mục
//	            hinh_anh[0].transferTo(hinhFile);
//
//	            // Tạo URL để truy cập ảnh và lưu vào đối tượng Voucher
//	            String imageUrl = "http://localhost:8080/images/" + tenHinhAnh;
//	            thuonghieu.setHinh_anh(tenHinhAnh);
//	        }
//
//	        // Lưu voucher vào DB qua service
//	        ThuongHieu updatedThuongHieu = thuonghieuService.updateThuongHieu(thuonghieu);
//
//	        // Trả về thông tin voucher đã lưu
//	        return ResponseEntity.ok(updatedThuongHieu);
//
//	    } catch (IOException e) {
//	        // Xử lý lỗi IO
//	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//	                .body("Lỗi khi lưu file: " + e.getMessage());
//	    } catch (Exception e) {
//	        // Xử lý lỗi chung
//	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//	                .body("Lỗi khi cập nhật voucher: " + e.getMessage());
//	    }
//	}
//
//    @DeleteMapping("/thuonghieu/delete/{thuong_hieuID}")
//	public ResponseEntity<?> deleteThuongHieu(@PathVariable String thuong_hieuID) {
//	    try {
//	        // Tìm voucher theo ID
//	        ThuongHieu thuonghieu = thuonghieuService.findByThuongHieuID(thuong_hieuID);
//	        if (thuonghieu != null) {
//	            // Xóa voucher
//	            thuonghieuService.deleteThuongHieu(thuong_hieuID);
//	            return ResponseEntity.ok("Thương hiệu đã được xóa thành công!");
//	        } else {
//	            return ResponseEntity.status(HttpStatus.NOT_FOUND)
//	                    .body("Không tìm thấy thương hiệu với ID: " + thuong_hieuID);
//	        }
//	    } catch (Exception e) {
//	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//	                .body("Lỗi khi xóa voucher: " + e.getMessage());
//	    }
//	}
//}
