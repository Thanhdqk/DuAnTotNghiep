package com.BaiTapLab.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.Voucher;
import com.BaiTapLab.Repository.VoucherRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class VoucherRestController {
	@Autowired
	VoucherRepository voucherRepository;
	
	@GetMapping("/listVoucher")
	public ResponseEntity<List<Voucher>> getVoucher(){
		List<Voucher> listVoucher = voucherRepository.findAll();
		System.out.println(listVoucher);
		return ResponseEntity.ok(listVoucher);
	}
}
