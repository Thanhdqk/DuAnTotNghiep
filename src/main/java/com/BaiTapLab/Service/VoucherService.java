package com.BaiTapLab.Service;

import java.time.LocalDate;
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

    public List<Voucher> findAllVouchersWithSavedStatus(String accountID) {
        List<String> savedVoucherIDs = voucherDetailRepository.findVoucherIDsByAccountID(accountID);
        LocalDate today = LocalDate.now();
        
        return voucherRepository.findAll().stream()
                .filter(voucher -> voucher.getHan_su_dung().isAfter(today) && voucher.getSo_luong() > 0)
                .peek(voucher -> voucher.setSaved(savedVoucherIDs.contains(voucher.getVoucherID())))
                .toList();
    }
}
