package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.DanhGia;

public interface DanhGiaRepository extends JpaRepository<DanhGia, String> {
	
	@Query("SELECT d FROM DanhGia d WHERE d.sanpham.san_phamId = ?1")
	List<DanhGia > findDangGiaByidSanPham(String id);
	
	@Query("SELECT d FROM DanhGia d WHERE d.sanpham.san_phamId = ?1 AND  d.so_sao = ?2 ORDER BY d.ngay_tao DESC")
	List<DanhGia > findDangGiaByidSanPhamWithSoSao(String id,int sosao);
	
	@Query("SELECT d FROM DanhGia d WHERE d.sanpham.san_phamId = ?1 ORDER BY d.ngay_tao DESC")
	List<DanhGia> findAllDanhGiasOrderedByDate(String id);


	
	
	
	
}