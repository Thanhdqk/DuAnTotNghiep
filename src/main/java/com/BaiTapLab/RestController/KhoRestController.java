package com.BaiTapLab.RestController;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Repository.SanPhamRepository;

@RestController
@RequestMapping("/api/kho")
@CrossOrigin(origins = "http://localhost:3000")
public class KhoRestController {
	@Autowired
    private SanPhamRepository sanPhamRepository; // Hoặc tên repository của bạn

	@GetMapping("/newProductId")
    public ResponseEntity<String> getNewProductId() {
        // Lấy mã sản phẩm mới nhất
        String latestProductId = getLatestProductId();
        
        // Tăng mã sản phẩm lên 1
        String newProductId = generateNewProductId(latestProductId);
        
        return ResponseEntity.ok(newProductId);
    }

    private String getLatestProductId() {
        List<String> latestProductIds = sanPhamRepository.getLatestProductId(PageRequest.of(0, 1));
        return latestProductIds.isEmpty() ? "SP000" : latestProductIds.get(0);
    }

    private String generateNewProductId(String latestProductId) {
        // Kiểm tra xem mã sản phẩm mới nhất có hợp lệ không
        if (latestProductId != null && latestProductId.startsWith("SP")) {
            // Tách phần số từ mã sản phẩm
            String numberPart = latestProductId.substring(2); // Lấy phần số sau "SP"
            int newIdNumber = Integer.parseInt(numberPart) + 1; // Tăng lên 1
            return "SP" + String.format("%03d", newIdNumber); // Trả về mã mới với định dạng SP### (3 chữ số)
        }
        return "SP000"; // Trả về mã mặc định nếu không có mã mới nhất
    }
    
//    @PostMapping(value = "/addSanPham", consumes = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<?> addSanPham(@RequestBody SanPham sanpham) {
//    	System.out.println("Đã nhận sản phẩm: " + sanpham);
//        // Kiểm tra và xử lý ngày tạo
//        if (sanpham.getNgay_tao() == null) {
//            sanpham.setNgay_tao(LocalDate.now()); // Nếu không có ngày, thiết lập ngày hiện tại
//        }
//        sanPhamRepository.save(sanpham);
//        return ResponseEntity.ok(sanpham);
//    }
    
    @PostMapping("/addSanPham")
    public ResponseEntity<?> addSanPham(
    		@RequestParam("san_phamId") String san_phamId,
    		@RequestParam("ten_san_pham") String ten_san_pham,
    		@RequestParam("so_luong") Integer so_luong,
    		@RequestParam("ngay_tao") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate ngay_tao) {
    	SanPham sanpham = new SanPham();
    	sanpham.setSan_phamId(san_phamId);
    	sanpham.setTen_san_pham(ten_san_pham);
    	sanpham.setSo_luong(so_luong);
    	sanpham.setNgay_tao(ngay_tao);
    	sanPhamRepository.save(sanpham);
        return ResponseEntity.ok(sanpham);
    }

}
