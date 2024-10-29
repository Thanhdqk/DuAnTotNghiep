package com.BaiTapLab.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.Voucher;

import jakarta.transaction.Transactional;

public interface VoucherRepository extends JpaRepository<Voucher, String>{
	Optional<Voucher> findByVoucherID(String voucherID);
	void deleteById(String voucherID);
	
	@Modifying
    @Transactional
    @Query("UPDATE Voucher v SET v.trang_thai_xoa = 'Đã xóa' WHERE v.voucherID = ?1")
    int markAsDeleted(String voucherID);
	
	@Modifying
    @Transactional
    @Query("UPDATE Voucher v SET v.trang_thai_xoa = '' WHERE v.voucherID = ?1")
    int reloadVoucherID(String voucherID);
}
