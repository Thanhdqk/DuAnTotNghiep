package com.BaiTapLab.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.VoucherDetail;
import com.BaiTapLab.Repository.VoucherDetailRepository;

@Service
public class VoucherDetailService {
	@Autowired
	private VoucherDetailRepository voucherdetailRepository;
	
	public VoucherDetail save(VoucherDetail voucherDetail) {
		return voucherdetailRepository.save(voucherDetail);
	}
}
