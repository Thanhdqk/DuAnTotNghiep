package com.BaiTapLab.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.Voucher;
import com.BaiTapLab.Service.VoucherService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class VoucherRestController {
	@Autowired VoucherService voucherService;
	
	@GetMapping("/loadVoucher")
    public List<Voucher> loadAll() {
        return voucherService.findAll();
    }
	  @GetMapping("/loadUnsavedVouchers")
	    public List<Voucher> loadUnsavedVouchers(@RequestParam String accountID) {
	        return voucherService.findUnSavedVouchers(accountID);
	    }
}
