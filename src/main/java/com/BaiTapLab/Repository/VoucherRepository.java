package com.BaiTapLab.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.BaiTapLab.Entity.Voucher;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

public interface VoucherRepository extends JpaRepository<Voucher, String> {
	@Query("SELECT vd.voucher.voucherID FROM VoucherDetail vd WHERE vd.users.accountID = :accountID")
	List<String> findVoucherIDsByAccountID(String accountID);

}
