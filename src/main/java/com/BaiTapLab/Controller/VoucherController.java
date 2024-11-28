package com.BaiTapLab.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.BaiTapLab.Entity.Voucher;
import com.BaiTapLab.Service.VoucherService;

@RestController
@RequestMapping("/api/vouchers")
public class VoucherController {

	@Autowired
	private VoucherService voucherService;

	@GetMapping("/user/{userId}")
	public ResponseEntity<List<Voucher>> getVouchersByUserId(@PathVariable String userId) {
		List<Voucher> vouchers = voucherService.findVouchersByUserId(userId);
		return ResponseEntity.ok(vouchers);
	}
}
