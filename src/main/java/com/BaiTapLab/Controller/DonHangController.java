package com.BaiTapLab.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.BaiTapLab.Entity.DonHang;
import com.BaiTapLab.Repository.DonhangChiTietRepository;
import com.BaiTapLab.Service.DonHangService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DonHangController {
	@Autowired
	private DonHangService donHangService;

	@GetMapping("/api/donhang")
	public List<DonHang> getDonHang(@RequestParam(required = false) String userId) {
		if (userId != null) {
			return donHangService.getDonHangByUserId(userId);
		}
		return donHangService.getAllDonHang();
	}

	@PutMapping("/api/donhang/cancel/{orderId}")
	public ResponseEntity<String> cancelOrder(@PathVariable String orderId) {
		boolean canceled = donHangService.cancelOrder(orderId);
		if (canceled) {
			return ResponseEntity.ok("Order canceled successfully.");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found or cannot be canceled.");
		}
	}
}
