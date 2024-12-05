package com.BaiTapLab.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.Voucher;
import com.BaiTapLab.Entity.VoucherDetail;
import com.BaiTapLab.Repository.VoucherRepository;
import com.BaiTapLab.Service.VoucherService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class VoucherRestController {
	@Autowired
	VoucherService voucherService;
	@Autowired
	VoucherRepository detailRepository;

	@GetMapping("/loadVoucher")
	public List<Voucher> loadAll() {
		return voucherService.findAll();
	}
	@GetMapping("/api/vouchernotbeingused/{userId}")
	public List<Voucher> loadAll2(@PathVariable("userId") String id) {
		return detailRepository.findVoucherNotBeingUsed("Đã Hủy",id);
	}
	
	@GetMapping("/loadUnsavedVouchers")
	public List<Voucher> loadUnsavedVouchers(@RequestParam String accountID) {
		return voucherService.findUnSavedVouchers(accountID);
	}

	@GetMapping("/api/vouchers/user/{userId}")
	public ResponseEntity<List<Voucher>> getVouchersByUserId(@PathVariable String userId) {
		List<Voucher> vouchers = voucherService.findVouchersByUserId(userId);
		return ResponseEntity.ok(vouchers);
	}

	@PostMapping("checkifvoucherisvalid")
	public Boolean checkvalidvoucher(@RequestParam String voucherId, @RequestParam String accountID,
			@RequestParam Integer amount) {
		try {
			System.out.println("chekcout");
			VoucherDetail voucher = voucherService.checkIfVoucherIsValid(voucherId, accountID, amount);
			System.out.println("voucher : " + voucher.getVoucher());
			if (voucher.getVoucher().getTrang_thai_xoa() == null
					&& voucher.getVoucher().getSo_luot_SD() <= voucher.getVoucher().getSo_luong()
					&& voucher.getVoucher().getHoat_dong().equals("On")) {
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;

	}
}