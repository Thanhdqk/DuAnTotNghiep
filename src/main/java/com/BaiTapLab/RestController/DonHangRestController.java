//package com.BaiTapLab.RestController;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.BaiTapLab.Repository.DonHangRepository;
//import com.BaiTapLab.Service.DonHangService;
//
//@RestController
//@RequestMapping("/api")
//@CrossOrigin(origins = "http://localhost:3000")
//public class DonHangRestController {
//	@Autowired
//	DonHangService donhangService;
//	
//	@Autowired
//	DonHangRepository donhangRepository;
//	
//	@GetMapping("/getTotal")
//	public ResponseEntity<Integer> getTotal() {
//		Integer total = donhangService.getTotalDonHang();
//		return ResponseEntity.ok(total);
//	}
//	
//	@GetMapping("/getDoanhThu")
//	public ResponseEntity<Double> getDoanhThu() {
//		Double total = donhangService.getDoanhThu();
//		return ResponseEntity.ok(total);
//	}
//	
//	@GetMapping("/getKhachHang")
//	public ResponseEntity<Integer> getKhachHang() {
//		Integer total = donhangService.getKhachHang();
//		return ResponseEntity.ok(total);
//	}
//	
//	@GetMapping("/getLoiNhuan")
//	public ResponseEntity<Double> getLoiNhuan() {
//		Double total = donhangService.getLoiNhuan();
//		return ResponseEntity.ok(total);
//	}
//	
//	@GetMapping("/getDoanhThuChart")
//	public ResponseEntity<Double[]> getDoanhThuChart(@RequestParam("year") int year) {
//	    Double[] monthlyRevenues = new Double[12];
//	    
//	    // Lặp qua từng tháng để lấy doanh thu
//	    for (int month = 1; month <= 12; month++) {
//	        monthlyRevenues[month - 1] = donhangRepository.getDoanhThuByMonthAndYear(month, year);
//	    }
//	    
//	    return ResponseEntity.ok(monthlyRevenues);
//	}
//
//	@GetMapping("/getTrangThaiDonHang")
//	public ResponseEntity<Map<String, Long>> getTrangThaiDonHang(
//	        @RequestParam int month, 
//	        @RequestParam int year) {
//	    try {
//	        List<Object[]> results = donhangRepository.countByTrangThaiAndMonthAndYear(month, year);
//	        Map<String, Long> statusCount = new HashMap<>();
//	        
//	        for (Object[] result : results) {
//	            String status = (String) result[0];
//	            Long count = (Long) result[1];
//	            statusCount.put(status, count);
//	        }
//	        
//	        return ResponseEntity.ok(statusCount);
//	    } catch (Exception e) {
//	        e.printStackTrace();
//	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//	    }
//	}
//
//
//
//
//
//}
