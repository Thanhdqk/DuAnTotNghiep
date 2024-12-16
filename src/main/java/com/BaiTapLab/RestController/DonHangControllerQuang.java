package com.BaiTapLab.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.DonHang;
import com.BaiTapLab.Service.DonHangService;
import com.BaiTapLab.Service.DonHangServiceQuang;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class DonHangControllerQuang {
	@Autowired
	private DonHangServiceQuang donHangService;

	@GetMapping("api/donhang")
	public List<DonHang> getDonHang(@RequestParam(required = false) String userId) {
		if (userId != null) {
			return donHangService.getDonHangByUserId(userId);
		}
		return donHangService.getAllDonHang();
	}

	@PostMapping("api/donhang/getbypaymentid")
	public String getdonghangid(@RequestParam String id) {
		return donHangService.getdonhang_Id(id);
	}

	@PutMapping("api/donhang/cancel")
	public ResponseEntity<String> cancelOrder(@RequestParam("orderId") String orderId,
			@RequestParam("lyDo") String lyDo) {
		boolean canceled = donHangService.cancelOrder(orderId, lyDo);
		System.out.println("result :" + canceled);
		if (canceled) {
			return ResponseEntity.ok("Order canceled successfully.");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found or cannot be canceled.");
		}
	}
}