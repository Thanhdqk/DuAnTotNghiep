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
import com.BaiTapLab.Service.VoucherDetailServiceTuan;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class VoucherDetailRestControllerTuan {
	@Autowired 
	private VoucherDetailServiceTuan voucherDetailService;
	@Autowired
	VoucherRepository voucherRepository;
	@Autowired
	UsersRepository usersRepository;
	
	@PostMapping("/addVoucherDetail")
	public VoucherDetail addVoucherDetail(
	    @RequestParam String voucherID,
	    @RequestParam String accountID) {
	    
	    VoucherDetail voucherDetail = new VoucherDetail();
	    Voucher voucher = voucherRepository.findById(voucherID).orElse(null);
	    Users user = usersRepository.findById(accountID).orElse(null);

	    if (voucher != null && user != null) {
	        // Kiểm tra số lượng còn không
	        if (voucher.getSo_luong() > 0) {
	            voucherDetail.setVoucher(voucher);
	            voucherDetail.setUsers(user);
	            
	            // Giảm số lượng voucher
	            voucher.setSo_luong(voucher.getSo_luong() - 1);
	            voucher.setSo_luot_SD(voucher.getSo_luot_SD() + 1);
	            voucherRepository.save(voucher); // Cập nhật lại trong database

	            return voucherDetailService.save(voucherDetail);
	        } else {
	            throw new IllegalArgumentException("Voucher đã hết số lượng");
	        }
	    } else {
	        throw new IllegalArgumentException("Voucher hoặc người dùng không tồn tại");
	    }
	}
}