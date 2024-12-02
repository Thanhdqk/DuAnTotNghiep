package com.BaiTapLab.Repository;

import com.BaiTapLab.Entity.Banner;
import com.BaiTapLab.Entity.BannerChiTiet;
import com.BaiTapLab.Entity.Users;

import jakarta.transaction.Transactional;

import java.awt.print.Pageable;
import java.util.Collection;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BannerRepository extends JpaRepository<Banner, String> {
//	boolean existsByBannerId(String bannerId);
	/*
	 * @Query("SELECT u FROM Banner u WHERE u.trang_thai_xoa = ?1") List<Users>
	 * findUserByTrangThaideleted(String tt);
	 * 
	 * @Modifying
	 * 
	 * @Transactional
	 * 
	 * @Query("UPDATE Banner u SET u.trang_thai_xoa = 'Xóa' WHERE u.bannerId = ?1")
	 * public void markAsDeleted(String userid);
	 * 
	 * @Modifying
	 * 
	 * @Transactional
	 * 
	  @Query("UPDATE Banner u SET u.trang_thai_xoa = NULL WHERE u.bannerId = ?1")
	 public void back(String userid);
	 * 
	 * @Modifying
	 * 
	 * @Transactional
	 * 
	 * @Query("UPDATE Banner u SET u.trang_thai_xoa = NULL WHERE u.bannerId = ?1")
	 * int reloadThuongHieuID(String thuong_hieuID);
	 * 
	 * @Query("SELECT u FROM  Banner u WHERE u.trang_thai_xoa is NULL") List<Users>
	 * findUserByTrangThai();
	 * 
	 
	 */
	@Query("SELECT u FROM Banner u WHERE u.trang_thai_xoa = ?1") List<Users>
	 findUserByTrangThaideleted(String tt);
	
	@Modifying
    @Transactional
	@Query("UPDATE Banner u SET u.trang_thai_xoa = :trangThaiXoa WHERE u.bannerId = :bannerId")
	void markAsDeleted(@Param("trangThaiXoa") String trangThaiXoa, @Param("bannerId") String bannerId);

	@Modifying
    @Transactional
	 @Query("UPDATE Banner u SET u.trang_thai_xoa = NULL WHERE u.bannerId = ?1")
	 public void back(String userid);
	
	 @Query("SELECT b.bannerId FROM Banner b ORDER BY b.bannerId DESC")
	  List<String> findLatestBannerId(PageRequest pageRequest);
	 
	@Query("SELECT bct FROM BannerChiTiet bct")
	List<BannerChiTiet> findBYBannerALL();
     
}