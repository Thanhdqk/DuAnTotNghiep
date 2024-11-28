package com.BaiTapLab.Repository;

import com.BaiTapLab.Entity.VoucherDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoucherDetailRepository extends JpaRepository<VoucherDetail, Integer> {
	@Query("SELECT vd FROM VoucherDetail vd WHERE vd.users.accountID = :accountID")
	List<VoucherDetail> findVoucherIDsByAccountID(String accountID);
}
