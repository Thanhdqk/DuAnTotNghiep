package com.BaiTapLab.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.PhuongThucTT;
import com.BaiTapLab.Entity.Voucher;
import com.BaiTapLab.Entity.VoucherDetail;
import com.BaiTapLab.Service.VoucherService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin("*")
public class VoucherRestController {
	@Autowired VoucherService voucherService;
	
	@GetMapping("/loadVoucher")
    public List<Voucher> loadAll() {
        return voucherService.findAll();
    }
	
}
