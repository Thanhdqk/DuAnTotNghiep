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
	
	@Query(value = """
	        SELECT * 
	        FROM voucher 
	        WHERE 
	            voucherid NOT IN (
	                SELECT voucherid 
	                FROM donhang 
	                WHERE trang_thai IN (N'Đã giao', N'Đang chờ xử lý', N'Đang chuẩn bị', N'Đang giao') 
	                AND accountid = :userId 
	                AND voucherid IS NOT NULL
	            )
	            OR voucherid IN (
	                SELECT voucherid 
	                FROM donhang 
	                WHERE trang_thai = N'Đã Hủy' 
	                AND accountid = :userId
	            )
	    """, nativeQuery = true)
	List<Voucher> findVoucherNotBeingUsed(String purchas_status,String accountID);
}
    






