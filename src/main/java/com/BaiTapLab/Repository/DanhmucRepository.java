package com.BaiTapLab.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.DanhMuc;

public interface DanhmucRepository extends JpaRepository<DanhMuc, String> {
	
	@Query("SELECT d FROM DanhMuc d JOIN d.sanpham s WHERE s.san_phamId = ?1")
	DanhMuc findDanhMucBySanPhamId(String id);
	
}
