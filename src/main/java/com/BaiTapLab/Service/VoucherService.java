package com.BaiTapLab.Service;

import com.BaiTapLab.Entity.Voucher;
import com.BaiTapLab.Entity.VoucherDetail;
import com.BaiTapLab.Repository.VoucherDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VoucherService {

    @Autowired
    private VoucherDetailRepository voucherDetailRepository;

    // Method to fetch vouchers by userId
    public List<Voucher> findVouchersByUserId(String userId) {
        // Find VoucherDetails based on the userId (accountID)
        List<VoucherDetail> voucherDetails = voucherDetailRepository.findVoucherIDsByAccountID(userId);

        // Extract unique Voucher entities from the VoucherDetail records
        List<Voucher> vouchers = voucherDetails.stream()
                .map(VoucherDetail::getVoucher)  // Get the Voucher from each VoucherDetail
                .distinct()  // Ensure each Voucher is only returned once
                .collect(Collectors.toList());

        return vouchers;
    }
}
