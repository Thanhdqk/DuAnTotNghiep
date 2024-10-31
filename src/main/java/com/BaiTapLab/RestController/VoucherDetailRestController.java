package com.BaiTapLab.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Entity.Voucher;
import com.BaiTapLab.Entity.VoucherDetail;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Repository.VoucherRepository;
import com.BaiTapLab.Service.VoucherDetailService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class VoucherDetailRestController {
	@Autowired 
	private VoucherDetailService voucherDetailService;
	@Autowired
	VoucherRepository voucherRepository;
	@Autowired
	UsersRepository usersRepository;
	
	@PostMapping("/addVoucherDetail")
	public VoucherDetail addVoucherDetail(
	    @RequestParam String voucherID,
	    @RequestParam String accountID) {
	    
	    // Tạo đối tượng VoucherDetail mới
	    VoucherDetail voucherDetail = new VoucherDetail();
	    
	    // Lấy voucher và user từ repository tương ứng (giả sử đã có repository hoặc service)
	    Voucher voucher = voucherRepository.findById(voucherID).orElse(null);
	    Users user = usersRepository.findById(accountID).orElse(null);

	    // Kiểm tra nếu user và voucher tồn tại
	    if (voucher != null && user != null) {
	        voucherDetail.setVoucher(voucher);
	        voucherDetail.setUsers(user);
	        return voucherDetailService.save(voucherDetail);
	    } else {
	        throw new IllegalArgumentException("Voucher hoặc người dùng không tồn tại");
	    }
	}
}