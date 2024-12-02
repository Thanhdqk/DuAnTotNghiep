package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.BannerChiTiet;

public interface BannerChiTietRepository extends JpaRepository<BannerChiTiet, Integer> {
	@Query("SELECT b.bannerId, b.hinh_anh, b.hoat_dong, b.ngay_tao, b.ngay_het_han, " +
		       "d.danh_mucId, " +
		       "u.accountID,b.trang_thai_xoa " +
		       "FROM BannerChiTiet bc " +
		       "JOIN bc.banner b " +
		       "JOIN bc.danhmuc d " +
		       "JOIN b.users u " 
		       )
		List<Object[]> findBannerDanhMucAndUsersJPQL();
		
		@Query("SELECT b.bannerId, b.hinh_anh, b.hoat_dong, b.ngay_tao, b.ngay_het_han, " +
			       "d.danh_mucId, " +
			       "u.accountID,b.trang_thai_xoa " +
			       "FROM BannerChiTiet bc " +
			       "JOIN bc.banner b " +
			       "JOIN bc.danhmuc d " +
			       "JOIN b.users u " + 
			       "WHERE b.trang_thai_xoa = 'Đã xóa' ")
			List<Object[]> findBannerDanhMucAndUsersJPQLdeleted();
			
			
			



}
