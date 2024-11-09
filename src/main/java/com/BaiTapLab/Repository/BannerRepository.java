package com.BaiTapLab.Repository;

import com.BaiTapLab.Entity.Banner;
import com.BaiTapLab.Entity.Users;

import jakarta.transaction.Transactional;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BannerRepository extends JpaRepository<Banner, String> {
	@Query("SELECT u FROM Banner u WHERE u.trang_thai_xoa = ?1")
	List<Users> findUserByTrangThaideleted(String tt);
    
    @Modifying
	@Transactional
	@Query("UPDATE Banner u SET u.trang_thai_xoa = NULL	, u.hanh_dong = 'Xóa' WHERE u.bannerId = ?1")
	public void markAsDeleted(String userid);
    
    @Modifying
	@Transactional
	@Query("UPDATE Banner u SET u.trang_thai_xoa = NULL, u.hanh_dong = 'Reload' WHERE u.bannerId = ?1")
	public void back(String userid);
	
	@Modifying
    @Transactional 
    @Query("UPDATE Banner u SET u.trang_thai_xoa = NULL WHERE u.bannerId = ?1")
    int reloadThuongHieuID(String thuong_hieuID);
	
	@Query("SELECT u FROM  Banner u WHERE u.trang_thai_xoa is NULL")
	List<Users> findUserByTrangThai();

}