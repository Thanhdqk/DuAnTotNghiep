package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.DonHang;

public interface DonHangRepository extends JpaRepository<DonHang, String> {
	@Query("Select p from DonHang p where p.phuongthuctt.phuong_thucTTID='ptt01' order by p.thoi_gianXN DESC limit 1 ")
	DonHang findlastedDH();

	@Query("Select p from DonHang p where p.trang_thai = ?1 ")
	List<DonHang> findbyStatus(String dieukien);

	@Query("SELECT dh FROM DonHang dh LEFT JOIN dh.diachi dc WHERE dh.users.accountID = :accountID")
	List<DonHang> findByUserIdWithAddress(@Param("accountID") String accountID);

	@Query("Select p from DonHang p where p.online_payment_id =?1")
	DonHang findbypaymentid(String id);
}