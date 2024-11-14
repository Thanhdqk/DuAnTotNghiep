package com.BaiTapLab.RestController;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.DonHang;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Repository.DonHangRepository;
import com.BaiTapLab.Service.DonHangService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class DonHangRestController {
	@Autowired
	DonHangService donhangService;
	
	@Autowired
	DonHangRepository donhangRepository;
	
	@GetMapping("/donhang/getAll")
	public ResponseEntity<List<DonHang>> getAllList(){
		List<DonHang> donhang = donhangRepository.findAll();
		return ResponseEntity.ok(donhang);
	}
	
	@GetMapping("/getTotal")
	public ResponseEntity<Integer> getTotal() {
		Integer total = donhangService.getTotalDonHang();
		return ResponseEntity.ok(total);
	}
	
	@GetMapping("/getDoanhThu")
	public ResponseEntity<Double> getDoanhThu() {
		Double total = donhangService.getDoanhThu();
		return ResponseEntity.ok(total);
	}
	
	@GetMapping("/getKhachHang")
	public ResponseEntity<Integer> getKhachHang() {
		Integer total = donhangService.getKhachHang();
		return ResponseEntity.ok(total);
	}
	
	@GetMapping("/getLoiNhuan")
	public ResponseEntity<Double> getLoiNhuan() {
		Double total = donhangService.getLoiNhuan();
		return ResponseEntity.ok(total);
	}
	
	@GetMapping("/getDoanhThuChart")
	public ResponseEntity<Double[]> getDoanhThuChart(@RequestParam("year") int year) {
	    Double[] monthlyRevenues = new Double[12];
	    String trangThai = "Đã giao";
	    // Lặp qua từng tháng để lấy doanh thu
	    for (int month = 1; month <= 12; month++) {
	        monthlyRevenues[month - 1] = donhangRepository.getDoanhThuByMonthAndYear(month, year, trangThai);
	    }
	    
	    return ResponseEntity.ok(monthlyRevenues);
	}

	@GetMapping("/getTrangThaiDonHang")
	public ResponseEntity<Map<String, Long>> getTrangThaiDonHang(
	        @RequestParam int month, 
	        @RequestParam int year) {
	    try {
	        List<Object[]> results = donhangRepository.countByTrangThaiAndMonthAndYear(month, year);
	        Map<String, Long> statusCount = new HashMap<>();
	        
	        for (Object[] result : results) {
	            String status = (String) result[0];
	            Long count = (Long) result[1];
	            statusCount.put(status, count);
	        }
	        
	        return ResponseEntity.ok(statusCount);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}
	
	@GetMapping("/getDoanhThuDateToDate")
	public ResponseEntity<List<Map<String, Object>>> getDoanhThu(
	        @RequestParam("startDate") LocalDate startDate,
	        @RequestParam("endDate") LocalDate endDate,
	        @RequestParam("trangThai") String trangThai) {
	    List<Map<String, Object>> doanhThuList = donhangRepository.getDoanhThuByDateRange(startDate, endDate, trangThai);
	    return ResponseEntity.ok(doanhThuList);
	}
	
	@GetMapping("/edit/donhang/{don_hangid}")
	public List<Object[]> getDonHangDetailsById(@PathVariable("don_hangid") String don_hangid) {
        return donhangRepository.getDonHangDetailById(don_hangid);
	}
	
	@PutMapping("/update/trangthai/{don_hangid}")
	public ResponseEntity<String> updateTrangThaiDonHang(
	        @PathVariable String don_hangid,
	        @RequestBody Map<String, String> requestBody) {
	    String trang_thai = requestBody.get("trang_thai"); // Lấy giá trị trang_thai từ request body

	    int result = donhangRepository.updateTrangThaiDonHang(trang_thai, don_hangid);

	    if (result > 0) {
	        return ResponseEntity.ok("Cập nhật trạng thái đơn hàng thành công");
	    } else {
	        return ResponseEntity.status(404).body("Không tìm thấy đơn hàng");
	    }
	}
	
	@PutMapping("/update/trangthai/ngayXacNhan/{don_hangid}")
	public ResponseEntity<String> updateTrangThaiDonHangNgayXacNhan(
	        @PathVariable String don_hangid,
	        @RequestBody Map<String, String> requestBody) {
	    String trang_thai = requestBody.get("trang_thai");
	    String thoi_gianXNStr = requestBody.get("thoi_gianXN");

	    LocalDate thoi_gianXN = null ;
	    if ("Đã xác nhận".equals(trang_thai) && thoi_gianXNStr != null && !thoi_gianXNStr.isEmpty()) {
	        try {
	            thoi_gianXN = LocalDate.parse(thoi_gianXNStr);
	            System.out.println("Ngày xác nhận: " + thoi_gianXN);
	        } catch (DateTimeParseException e) {
	            System.err.println("Lỗi khi phân tích ngày xác nhận: " + e.getMessage());
	            return ResponseEntity.badRequest().body("Ngày xác nhận không hợp lệ");
	        }
	    }

	    int result = donhangRepository.updateTrangThaiDonHangDaXacNhan(trang_thai, thoi_gianXN, don_hangid);

	    if (result > 0) {
	        return ResponseEntity.ok("Cập nhật trạng thái đơn hàng thành công");
	    } else {
	        return ResponseEntity.status(404).body("Không tìm thấy đơn hàng");
	    }
	}



}
