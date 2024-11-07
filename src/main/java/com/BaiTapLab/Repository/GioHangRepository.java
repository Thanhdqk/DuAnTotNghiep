package com.BaiTapLab.Repository;

import java.util.List;

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
	@Query("DELETE FROM GioHangChiTiet g WHERE g.gioHang.users.accountID = :idUser AND g.sanPham.id = :idSanPham")
	void removeProductFromGioHang(@Param("idUser") String idUser, @Param("idSanPham") String idSanPham);


	    @Modifying
	    @Transactional
	    @Query("DELETE FROM GioHangChiTiet g WHERE g.gioHang.users.accountID = :idUser")
	    void clearGioHang(@Param("idUser") String idUser);
}
