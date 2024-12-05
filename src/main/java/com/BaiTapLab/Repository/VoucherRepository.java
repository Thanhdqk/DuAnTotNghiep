package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.Voucher;
import com.BaiTapLab.Entity.VoucherDetail;

public interface VoucherRepository extends JpaRepository<Voucher, String> {
	@Query("SELECT vd.voucher.voucherID FROM VoucherDetail vd WHERE vd.users.accountID = :accountID")
	List<String> findVoucherIDsByAccountID(String accountID);

	@Query("SELECT vd FROM VoucherDetail vd WHERE vd.voucher.voucherID =?1 and vd.users.accountID = ?2 and vd.voucher.don_hang_toi_thieu< ?3 and vd.voucher.han_su_dung > CURRENT_DATE and vd.voucher.trang_thai_xoa is  null  ")
	VoucherDetail checkIfVoucherIsValid(String voucherid, String accountID, Integer amount);
	
	@Query("SELECT vd.voucher FROM VoucherDetail vd WHERE vd.users.accountID like ?2  AND vd.voucher.voucherID not in  (SELECT p.voucher.voucherID FROM DonHang p where p.voucher.voucherID  is not null and p.trang_thai !=?1 )")
	List<Voucher> findVoucherNotBeingUsed(String purchas_status,String accountID);
}
    






