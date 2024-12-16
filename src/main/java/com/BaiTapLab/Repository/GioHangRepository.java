package com.BaiTapLab.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.GioHang;

import jakarta.transaction.Transactional;

public interface GioHangRepository extends JpaRepository<GioHang, Integer> {
	@Query("SELECT gh FROM GioHang gh WHERE gh.users.accountID = :accountId")
	GioHang findByAccountId(@Param("accountId") String accountId);

	@Modifying
	@Transactional
	@Query("DELETE FROM GioHangChiTiet g WHERE g.gioHang.users.accountID = :idUser AND g.sanpham.id = :idsanpham")
	void removeProductFromGioHang(@Param("idUser") String idUser, @Param("idsanpham") String idsanpham);

	@Modifying
	@Transactional
	@Query("DELETE FROM GioHangChiTiet g WHERE g.gioHang.users.accountID = :idUser")
	void clearGioHang(@Param("idUser") String idUser);

	@Query("SELECT g FROM GioHang g JOIN g.gioHangChiTiet ghct WHERE g.users.accountID = ?1 AND ghct.sanpham.san_phamId = ?2")
	GioHang findByUserIdAndsanphamId(String accountId, String sanphamId);

}