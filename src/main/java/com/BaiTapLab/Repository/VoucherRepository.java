package com.BaiTapLab.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.BaiTapLab.Entity.Voucher;

public interface VoucherRepository extends JpaRepository<Voucher, String>{
	Optional<Voucher> findByVoucherID(String voucherID);
	void deleteById(String voucherID);
}
