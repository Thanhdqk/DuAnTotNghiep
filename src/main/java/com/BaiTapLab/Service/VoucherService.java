package com.BaiTapLab.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.Voucher;
import com.BaiTapLab.Repository.VoucherRepository;

@Service
public class VoucherService {
	
		 @Autowired
		 VoucherRepository VoucherRepository;
		 
		 public List<Voucher> findAll(){
				return VoucherRepository.findAll();
			}
			
			public Voucher findByVoucherID(String voucherID) {
				Optional<Voucher> vc = VoucherRepository.findById(voucherID);
				return vc.orElseThrow(() -> new RuntimeException("Không tồn tại!"));
			}
			
			 public List<Voucher> findUnSavedVouchers(String accountID) {
			        List<String> savedVoucherIDs = VoucherRepository.findVoucherIDsByAccountID(accountID);
			        return VoucherRepository.findAll().stream()
			                                .filter(voucher -> !savedVoucherIDs.contains(voucher.getVoucherID()))
			                                .toList();
			    }
		 
}