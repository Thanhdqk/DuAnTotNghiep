package com.BaiTapLab.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.Voucher;
import com.BaiTapLab.Entity.VoucherDetail;
import com.BaiTapLab.Repository.VoucherDetailRepository;
import com.BaiTapLab.Repository.VoucherRepository;

@Service
public class VoucherServicePhat {
	@Autowired
	VoucherRepository VoucherRepository;
	
	@Autowired
    private VoucherDetailRepository voucherDetailRepository;

	public List<Voucher> findAll() {
		return VoucherRepository.findAll();
	}

	public Voucher findByVoucherID(String voucherID) {
		Optional<Voucher> vc = VoucherRepository.findById(voucherID);
		return vc.orElseThrow(() -> new RuntimeException("Không tồn tại!"));
	}

	public List<Voucher> findUnSavedVouchers(String accountID) {
		List<String> savedVoucherIDs = VoucherRepository.findVoucherIDsByAccountID(accountID);
		return VoucherRepository.findAll().stream().filter(voucher -> !savedVoucherIDs.contains(voucher.getVoucherID()))
				.toList();
	}

	public VoucherDetail checkIfVoucherIsValid(String voucherId, String accountId, Integer amount) {
		return VoucherRepository.checkIfVoucherIsValid(voucherId, accountId, amount);
	}

//	 @Autowired
//	    private VoucherDetailRepository voucherDetailRepository;
//
//	    // Method to fetch vouchers by userId
//	    public List<Voucher> findVouchersByUserId(String userId) {
//	        // Find VoucherDetails based on the userId (accountID)
//	        List<VoucherDetail> voucherDetails = voucherDetailRepository.findVoucherIDsByAccountID(userId);
//
//	        // Extract unique Voucher entities from the VoucherDetail records
//	        List<Voucher> vouchers = voucherDetails.stream()
//	                .map(VoucherDetail::getVoucher)  // Get the Voucher from each VoucherDetail
//	                .distinct()  // Ensure each Voucher is only returned once
//	                .collect(Collectors.toList());
//
//	        return vouchers;
//	    }

		public List<Voucher> getUnusedOrNotDeliveredVouchers(String userId) {
		    return VoucherRepository.findVoucherNotBeingUsed(userId).stream()
		            .filter(voucher -> "On".equalsIgnoreCase(voucher.getHoat_dong())) // Chỉ giữ voucher có trạng thái "On"
		            .collect(Collectors.toList());
		}
		public List<Voucher> findAllVouchersWithSavedStatus(String accountID) {
	        List<String> savedVoucherIDs = voucherDetailRepository.findVoucherIDsByAccountID(accountID);
	        LocalDate today = LocalDate.now();
	        
	        return VoucherRepository.findAll().stream()
	                .filter(voucher -> voucher.getHan_su_dung().isAfter(today) && voucher.getSo_luong() > 0)
	                .peek(voucher -> voucher.setSaved(savedVoucherIDs.contains(voucher.getVoucherID())))
	                .toList();
	    }
}

