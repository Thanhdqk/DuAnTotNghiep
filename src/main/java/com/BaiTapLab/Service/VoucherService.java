package com.BaiTapLab.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.BaiTapLab.Entity.Voucher;
import com.BaiTapLab.Repository.VoucherRepository;
import com.BaiTapLab.Repository.VoucherDetailRepository;

@Service
public class VoucherService {
    @Autowired
    private VoucherRepository voucherRepository;
    
    @Autowired
    private VoucherDetailRepository voucherDetailRepository;
    
    public List<Voucher> findUnSavedVouchers(String accountID) {
        List<String> savedVoucherIDs = voucherDetailRepository.findVoucherIDsByAccountID(accountID);
        return voucherRepository.findAll().stream()
                                .filter(voucher -> !savedVoucherIDs.contains(voucher.getVoucherID()))
                                .toList();
    }
}
