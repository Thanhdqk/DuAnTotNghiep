package com.BaiTapLab.RestController;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.VoucherDetail;
import com.BaiTapLab.Service.UsersService;
import com.BaiTapLab.Service.VoucherDetailService;
import com.BaiTapLab.Service.VoucherService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class VoucherDetailRestController {
	@Autowired 
	private VoucherDetailService voucherDetailService;
	
	
	@PostMapping("/addVoucherDetail")
	public VoucherDetail addVoucherDetail(@RequestBody VoucherDetail voucherDetail) {
	    // Dữ liệu Voucher và Users sẽ được tự động ánh xạ dựa trên JSON gửi từ frontend.
	    return voucherDetailService.save(voucherDetail);
	}
}
