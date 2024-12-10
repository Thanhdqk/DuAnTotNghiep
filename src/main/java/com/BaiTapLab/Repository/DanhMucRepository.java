package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.DanhMuc;
import com.BaiTapLab.Entity.Users;

import jakarta.transaction.Transactional;

public interface DanhMucRepository extends JpaRepository<DanhMuc, String>{
	@Query("select dm.ten_loaiDM from DanhMuc dm where dm.hoat_dong = 'On'")
	List<Object[]> getTenLoaiDanhMuc();
	
	@Query("select dm from DanhMuc dm where dm.ten_loaiDM = :ten_loaiDM")
    DanhMuc findByTen_loaiDM(@Param("ten_loaiDM") String ten_loaiDM);
	
	// Của Lợi
	@Query("SELECT d FROM DanhMuc d WHERE d.trang_thai_xoa is NULL")
	List<DanhMuc> findALLVIP();
	
	@Query("SELECT d FROM DanhMuc d JOIN d.sanpham s WHERE s.san_phamId = ?1")
	DanhMuc findDanhMucBySanPhamId(String id);
	
	@Query("SELECT d FROM DanhMuc d WHERE d.trang_thai_xoa = NULL")
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
	
	@Query("SELECT d FROM DanhMuc d WHERE d.hoat_dong = 'Off'")
	List<DanhMuc> findALLNotWorking();
	
	@Query("SELECT d FROM DanhMuc d  WHERE d.hoat_dong = 'On'")
	List<DanhMuc> findALLWorking();
}
