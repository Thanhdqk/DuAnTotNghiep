package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.DanhMuc;

import jakarta.transaction.Transactional;

public interface DanhmucRepository extends JpaRepository<DanhMuc, String> {
	
	@Query("SELECT d FROM DanhMuc d WHERE d.trang_thai_xoa is NULL")
	List<DanhMuc> findALLVIP();
	
	@Query("SELECT d FROM DanhMuc d JOIN d.sanpham s WHERE s.san_phamId = ?1")
	DanhMuc findDanhMucBySanPhamId(String id);
	
	@Query("SELECT d FROM DanhMuc d WHERE d.trang_thai_xoa is NULL")
	List<DanhMuc> findDanhMucWithNoDeleted();
	
	@Query("SELECT d.id FROM DanhMuc d ORDER BY d.id DESC")
    List<String> findAllIdsDesc();
	
	@Modifying
    @Transactional
	@Query("UPDATE DanhMuc d SET d.trang_thai_xoa ='Đã xóa' WHERE d.danh_mucId = ?1")
	void markDanhMucAsDeletedById(String id);
	
	
	@Modifying
    @Transactional
	@Query("UPDATE DanhMuc d SET d.trang_thai_xoa = NULL WHERE d.danh_mucId = ?1")
	void backDanhMucAsDeletedById(String id);
	
	
	@Query("SELECT d FROM DanhMuc d WHERE d.trang_thai_xoa is NULL")
	List<DanhMuc> findDanhMucByTrangThaiNULL();
	
	@Query("SELECT d FROM DanhMuc d WHERE d.trang_thai_xoa = 'Đã xóa' ")
	List<DanhMuc> findDanhMucByTrangThaiDeleted();
	
	@Query("SELECT d FROM DanhMuc d")
	List<DanhMuc> findDanhMucHanhDong();
	
	
	@Query("SELECT d.danh_mucId FROM DanhMuc d WHERE d.banner.bannerId = ?1")
	List<String > findDanhMucIdBybannerID(String id);
}