package com.BaiTapLab.RestController;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.BaiTapLab.DTO.ThuongHieuDTO;
import com.BaiTapLab.Entity.HanhDong;
import com.BaiTapLab.Entity.NhaCungCap;
import com.BaiTapLab.Entity.ThuongHieu;
import com.BaiTapLab.Repository.HanhDongRepository;
import com.BaiTapLab.Repository.NhaCungCapRepository;
import com.BaiTapLab.Repository.ThuongHieuRepository;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Service.ThuongHieuService;

@RestController
public class ThuongHieuRestController {
    @Autowired
    ThuongHieuService thuonghieuService;
    
    @Autowired
    ThuongHieuRepository thuonghieuRepository;
    
    @Autowired
    UsersRepository userRepository;
    
    
    @Autowired
	HanhDongRepository HanhDongRepository;
    
    @Autowired
    ThuongHieuService thuongHieuService;
    
    @GetMapping("/loadThuongHieu")
    public ResponseEntity<List<ThuongHieu>> getThuongHieu(){
		List<ThuongHieu> listThuongHieu = thuonghieuRepository.findAll();
		System.out.println(listThuongHieu);
		return ResponseEntity.ok(listThuongHieu);
	}
    

    
    @GetMapping("/thuonghieu/getNewThuongHieuID")
    public ResponseEntity<String> getNewThuongHieuId(){
        String latestThuongHieuId = getLatestThuongHieuId();
        
        String newThuongHieuId = generateNewThuongHieuId(latestThuongHieuId);
        
        return ResponseEntity.ok(newThuongHieuId);
    }

    private String getLatestThuongHieuId() {
        // Lấy mã mới nhất từ cơ sở dữ liệu
        List<String> latestThuongHieuIds = thuonghieuRepository.getLatestThuongHieuId(PageRequest.of(0, 1));
        if (latestThuongHieuIds.isEmpty()) {
            return "ThuongHieu001";  // Nếu không có bản ghi, trả về mã mặc định
        }
        String latestThuongHieuId = latestThuongHieuIds.get(0);
        System.out.println("Latest ThuongHieuId: " + latestThuongHieuId); // In để kiểm tra
        return latestThuongHieuId;
    }
    
    private String generateNewThuongHieuId(String latestThuongHieuId) {
        // Kiểm tra xem mã cũ có hợp lệ không
        if (latestThuongHieuId != null && latestThuongHieuId.startsWith("ThuongHieu")) {
            try {
                // Lấy phần số từ mã (tách sau "ThuongHieu")
                String numberPart = latestThuongHieuId.substring("ThuongHieu".length()); 
                System.out.println("Number part before increment: " + numberPart); // Debug

                // Chuyển phần số thành integer và tăng lên 1
                int newIdNumber = Integer.parseInt(numberPart) + 1;

                // Định dạng lại số mới để luôn có 3 chữ số
                String formattedId = String.format("%03d", newIdNumber); // Đảm bảo luôn có 3 chữ số

                System.out.println("Formatted new ID: " + formattedId); // Debug

                // Trả về mã mới, ví dụ: ThuongHieu010
                return "ThuongHieu" + formattedId;
            } catch (NumberFormatException e) {
                // Xử lý lỗi nếu phần số không hợp lệ
                return "ThuongHieu001"; // Trả về mã mặc định nếu có lỗi
            }
        }
        return "ThuongHieu001"; // Nếu mã cũ không hợp lệ, trả về mã mặc định
    }
    
    @GetMapping("/edit/thuonghieu/{thuong_hieuID}")
	public ResponseEntity<ThuongHieu> getSanPhamById(@PathVariable String thuong_hieuID){
		Optional<ThuongHieu> thuonghieu = thuonghieuRepository.findById(thuong_hieuID);
	    return thuonghieu.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

    @PostMapping("/thuonghieu/add")
	public ResponseEntity<?> addThuongHieu(
			@RequestParam(value = "thuong_hieuID", required = false) String thuong_hieuID,
	        @RequestParam("ten_thuong_hieu") String ten_thuong_hieu,
	        @RequestParam("ngay_tao") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate ngay_tao,
	        @RequestParam("hoat_dong") String hoat_dong,
	        @RequestParam(value = "hinh_anh", required = false) MultipartFile[] hinh_anh,
    		@RequestParam("accountID") String accountID){
    		
    		HanhDong hd = new HanhDong();

	    try {
	    	
	    	if (thuonghieuRepository.existsByTenThuongHieu(ten_thuong_hieu)) {
	    	    return ResponseEntity.badRequest().body("Tên thương hiệu đã tồn tại!");
	    	}
	    	
	        // Tạo đối tượng Thương Hiệu từ các tham số
	        ThuongHieu thuonghieu = new ThuongHieu();
	        thuonghieu.setThuong_hieuID(thuong_hieuID);
	        thuonghieu.setTen_thuong_hieu(ten_thuong_hieu);
	        thuonghieu.setNgay_tao(ngay_tao);
	        thuonghieu.setHoat_dong(hoat_dong);
	        thuonghieu.setUsers(userRepository.findByAccountID(accountID));
	        
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
	        
	        hd.setThuonghieu(thuonghieu);
	        hd.setTen_hanh_dong("Thêm");
	        
	        hd.setNgay_hanh_dong(LocalDate.now());
	        HanhDongRepository.save(hd);

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
    		@RequestParam("accountID") String accountID) {
    		
    		HanhDong hd = new HanhDong();

	    try {
	        // Tìm thuonghieu theo ID
	        ThuongHieu thuonghieu = thuonghieuService.findByThuongHieuID(thuong_hieuID);
	        
	        if (thuonghieuRepository.existsByTenThuongHieu(ten_thuong_hieu) &&
	                !thuonghieu.getTen_thuong_hieu().equals(ten_thuong_hieu)) {
	            return ResponseEntity.badRequest().body("Tên thương hiệu đã tồn tại!");
	        }
	        
	        // Cập nhật các thuộc tính của thuonghieu
	        thuonghieu.setThuong_hieuID(thuong_hieuID);
	        thuonghieu.setTen_thuong_hieu(ten_thuong_hieu);
	        thuonghieu.setNgay_tao(ngay_tao);
	        thuonghieu.setHoat_dong(hoat_dong);
	        thuonghieu.setUsers(userRepository.findByAccountID(accountID));

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

	            // Tạo URL để truy cập ảnh và lưu vào đối tượng ThuongHieu
	            String imageUrl = "http://localhost:8080/images/" + tenHinhAnh;
	            thuonghieu.setHinh_anh(tenHinhAnh);
	        }

	        // Lưu thương hiệu vào DB qua service
	        ThuongHieu updatedThuongHieu = thuonghieuService.updateThuongHieu(thuonghieu);
	        
	        hd.setThuonghieu(thuonghieu);
	        hd.setTen_hanh_dong("Cập nhật");
	        
	        hd.setNgay_hanh_dong(LocalDate.now());
	        HanhDongRepository.save(hd);

	        // Trả về thông tin thương hiệu đã lưu
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

    
    @PutMapping("/thuonghieu/deleteToGarbage/{thuong_hieuID}")
	public ResponseEntity<Object> deleteThuongHieuToGarbage(@PathVariable String thuong_hieuID) {
	    boolean isDeleted = thuonghieuService.deleteThuongHieuById(thuong_hieuID);
	    if (isDeleted) {
	    	HanhDong hd = new HanhDong();
	    	ThuongHieu thuonghieu = thuonghieuService.findByThuongHieuID(thuong_hieuID);
	    	hd.setThuonghieu(thuonghieu);
	    	hd.setTen_hanh_dong("Xóa");
	    	hd.setNgay_hanh_dong(LocalDate.now());
	    	HanhDongRepository.save(hd);
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
	    	HanhDong hd = new HanhDong();
	    	ThuongHieu thuonghieu = thuonghieuService.findByThuongHieuID(thuong_hieuID);
	    	hd.setThuonghieu(thuonghieu);
	    	hd.setTen_hanh_dong("Phục hồi");
	    	hd.setNgay_hanh_dong(LocalDate.now());
	    	HanhDongRepository.save(hd);
	        // Trả về một đối tượng JSON
	        return ResponseEntity.ok(Collections.singletonMap("message", "Thương hiệu đã được cập nhật trạng thái chưa xóa"));
	    } else {
	        // Trả về một đối tượng JSON chứa thông báo lỗi
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "Không tìm thấy thương hiệu với ID: " + thuong_hieuID));
	    }
	}
	
	@GetMapping("thuonghieu/gethanhdong")
	public List<ThuongHieuDTO> getMethodName() {
		return HanhDongRepository.findThuongHieu();
	}
}
