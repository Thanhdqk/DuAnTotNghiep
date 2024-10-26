package com.BaiTapLab.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.Voucher;
import com.BaiTapLab.Entity.VoucherDetail;
import com.BaiTapLab.Repository.VoucherDetailRepository;
import com.BaiTapLab.Repository.VoucherRepository;

@Service
public class VoucherService {
	@Autowired
	private VoucherRepository voucherRepository;
	
	
	public List<Voucher> findAll(){
		return voucherRepository.findAll();
	}
	
	public Voucher findByVoucherID(String voucherID) {
		Optional<Voucher> vc = voucherRepository.findById(voucherID);
		return vc.orElseThrow(() -> new RuntimeException("Không tồn tại!"));
	}
	
}
