package com.BaiTapLab.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.Voucher;
import com.BaiTapLab.Entity.VoucherDetail;

import jakarta.transaction.Transactional;

public interface VoucherRepository extends JpaRepository<Voucher, String>{
	Optional<Voucher> findByVoucherID(String voucherID);
	void deleteById(String voucherID);

	// Trùng tên voucher
	@Query(value = "select * from voucher vc where vc.ma_voucher = :maVoucher", nativeQuery = true)
	List<Object[]> danhSachVoucherTheoMaVoucher(@Param("maVoucher") String maVoucher);
//	@Modifying
//    @Transactional
//    @Query("UPDATE Voucher v SET v.trang_thai_xoa = 'Đã xóa', v.hanh_dong = 'Chuyển vào thùng rác' WHERE v.voucherID = ?1")
//    int markAsDeleted(String voucherID);
//	
//	@Modifying
//    @Transactional
//    @Query("UPDATE Voucher v SET v.trang_thai_xoa = NULL, v.hanh_dong = 'Khôi phục' WHERE v.voucherID = ?1")
//    int reloadVoucherID(String voucherID);
	
	@Modifying
	@Transactional
	@Query("UPDATE Voucher v SET v.trang_thai_xoa = 'Đã xóa' WHERE v.voucherID = :voucherID")
	int markAsDeleted(@Param("voucherID") String voucherID);

	@Modifying
	@Transactional
	@Query("UPDATE Voucher v SET v.trang_thai_xoa = NULL WHERE v.voucherID = :voucherID")
	int reloadVoucherID(@Param("voucherID") String voucherID);

	
	@Query(value = "SELECT vc.voucherID, vc.ma_voucher, vc.dieu_kien, vc.don_hang_toi_thieu, vc.han_su_dung, " +
            "vc.hinh_anh, vc.hoat_dong, vc.so_luong, vc.so_luot_SD, vc.so_tien_giam, " +
            "vc.trang_thai_xoa, vc.ngay_tao, vcdt.accountID " +
            "FROM voucher vc JOIN voucherdetail vcdt ON vc.voucherID = vcdt.voucherID", 
    nativeQuery = true)
	List<Object[]> findAllVouchersWithDetails();
	
	boolean existsByVoucherID(String voucherID);
	
	@Query(value = "SELECT vc.voucherID FROM Voucher vc ORDER BY vc.voucherID DESC")
    List<String> getLatestVoucherId(Pageable pageable);
	
	// Show nhật ký
	@Query("select hd.ten_hanh_dong, hd.ngay_hanh_dong, hd.voucher.voucherID, hd.users.accountID from HanhDong hd\r\n"
			+ "  where hd.voucher.voucherID is not NULL")
	List<Object[]> listNhatKy();
	
	// Show hết hạn
	@Query(value = "SELECT vc.voucherid, vc.ma_voucher, vc.dieu_kien, vc.don_hang_toi_thieu, vc.han_su_dung, vc.hinh_anh, vc.so_luong, vc.so_luot_sd, vc.so_tien_giam " +
            "FROM voucher vc " +
            "WHERE vc.han_su_dung < CAST(GETDATE() AS DATE)",
    nativeQuery = true)
	List<Object[]> listVoucherHetHan();
	
	
	
	// Liệt kê danh sách voucher theo Store Procedure
	@Query(value = "EXEC sp_UpdateAndSelectVoucher", nativeQuery = true)
    List<Object[]> listVoucherOnOff();
    
    // Phát
   @Query("SELECT vd.voucher.voucherID FROM VoucherDetail vd WHERE vd.users.accountID = :accountID")
    List<String> findVoucherIDsByAccountID(String accountID);
    
    @Query("SELECT vd FROM VoucherDetail vd WHERE vd.voucher.voucherID =?1 and vd.users.accountID = ?2 and vd.voucher.don_hang_toi_thieu< ?3 and vd.voucher.han_su_dung > CURRENT_DATE and vd.voucher.trang_thai_xoa is  null  ")
    VoucherDetail checkIfVoucherIsValid(String voucherid, String accountID, Integer amount);
    @Query(value = "SELECT vc.*" +
            "FROM voucher vc " +
            "WHERE vc.han_su_dung > CAST(GETDATE() AS DATE) AND vc.hoat_dong ='On'",
    nativeQuery = true)
    List<Voucher> findVoucherall();
    

    @Query(value = "select vc.* from voucher vc\r\n"
    		+ "JOIN donhang dh on vc.voucherid = dh.voucherid\r\n"
    		+ "JOIN voucherdetail vcdt on vc.voucherid = vcdt.voucherid\r\n"
    		+ "where dh.trang_thai not in (N'Đã giao', N'Đang chờ xử lý', N'Đã xác nhận', N'Đang giao', N'Đang chờ thanh toán') \r\n"
    		+ "and vc.hoat_dong = 'On' and vcdt.accountid = ?1 and dh.accountid = ?1", nativeQuery = true)
    List<Voucher> findVoucherNotBeingUsed(String accountID);
    
    @Query("SELECT vd.voucher FROM VoucherDetail vd WHERE vd.users.accountID = :accountID   and vd.voucher.hoat_dong ='On'")
	List<Voucher> findVoucherIDsByAccountid(String accountID);
}
