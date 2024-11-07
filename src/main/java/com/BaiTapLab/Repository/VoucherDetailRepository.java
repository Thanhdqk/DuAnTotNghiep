package com.BaiTapLab.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.BaiTapLab.Entity.VoucherDetail;

public interface VoucherDetailRepository extends JpaRepository<VoucherDetail, Integer> {
    
    @Query("SELECT vd.voucher.voucherID FROM VoucherDetail vd WHERE vd.users.accountID = :accountID")
    List<String> findVoucherIDsByAccountID(String accountID);
}
