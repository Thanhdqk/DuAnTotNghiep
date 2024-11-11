package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.Banner;

public interface BannerRepository extends JpaRepository<Banner, String> {
	
	@Query(
		    value = "SELECT b.banner_id AS bannerId, b.hinh_anh, b.ngay_tao, b.hoat_dong, " +
		            "b.accountid, dm.danh_muc_id AS danhMucId " +
		            "FROM banner b " +
		            "LEFT JOIN danhmuc dm ON b.banner_id = dm.banner_id", 
		    nativeQuery = true
		)
		List<Object[]> findAllBannersWithDanhMuc();



}
