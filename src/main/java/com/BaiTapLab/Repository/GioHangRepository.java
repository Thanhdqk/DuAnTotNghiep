package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.GioHang;

public interface GioHangRepository extends JpaRepository<GioHang, Integer> {
	@Query("SELECT g FROM GioHang g WHERE g.users.accountID = ?1 ")
	 List<GioHang> findByUsers_AccountID(String accountId);
	 
	 @Query("SELECT g FROM GioHang g WHERE g.users.accountID = ?1 AND g.sanpham.san_phamId = ?2")
	 GioHang findByUserIdAndSanPhamId(String accountId,String sanphamId);
	 

	 @Modifying 
	 @Query("DELETE FROM GioHang g WHERE g.users.accountID = ?1")
	 void deleteByUserId(String id);


}
