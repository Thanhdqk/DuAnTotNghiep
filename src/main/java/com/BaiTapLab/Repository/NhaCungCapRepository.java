package com.BaiTapLab.Repository;

import com.BaiTapLab.Entity.NhaCungCap;
import com.BaiTapLab.Entity.Users;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface NhaCungCapRepository extends JpaRepository<NhaCungCap, String> {
	@Query("SELECT u FROM NhaCungCap u WHERE u.trang_thai_xoa = ?1")
	List<Users> findUserByTrangThaideleted(String tt);
    
    @Modifying
	@Transactional
	@Query("UPDATE NhaCungCap u SET u.trang_thai_xoa = 'Xóa' WHERE u.nha_cung_capID = ?1")
	public void markAsDeleted(String userid);
    
    @Modifying
	@Transactional
	@Query("UPDATE NhaCungCap u SET u.trang_thai_xoa = NULL WHERE u.nha_cung_capID = ?1")
	public void back(String userid);
	
	@Modifying
    @Transactional
    @Query("UPDATE NhaCungCap u SET u.trang_thai_xoa = NULL WHERE u.nha_cung_capID = ?1")
    int reloadThuongHieuID(String thuong_hieuID);
	
	@Query("SELECT u FROM  NhaCungCap u WHERE u.trang_thai_xoa is NULL")
	List<Users> findUserByTrangThai();
	
	 @Query("SELECT b.nha_cung_capID FROM NhaCungCap b ORDER BY b.nha_cung_capID DESC")
	    List<String> findLatestBannerId(PageRequest pageRequest);


}