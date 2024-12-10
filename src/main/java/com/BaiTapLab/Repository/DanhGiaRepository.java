package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.DanhGia;

import jakarta.transaction.Transactional;


public interface DanhGiaRepository extends JpaRepository<DanhGia, Integer>{
	// Danh sách đánh giá chưa phản hồi
	@Query("SELECT dg.danh_giaID, dg.noi_dung, dg.so_sao, dg.hinh_anh, dg.ngay_tao, dg.hoat_dong, dg.trang_thaiPH, dg.users.accountID, dg.sanpham.san_phamId FROM DanhGia dg")
	List<Object[]> listChuaPhanHoi();
	
	// Show đánh giá
	@Transactional
	@Modifying
	@Query("UPDATE DanhGia dg SET dg.hoat_dong = 'On' WHERE dg.danh_giaID = :id")
	void showDanhGia(@Param("id") Integer id);
	
	// Show đánh giá
	@Transactional
	@Modifying
	@Query("UPDATE DanhGia dg SET dg.hoat_dong = 'Off' WHERE dg.danh_giaID = :id")
	void disableDanhGia(@Param("id") Integer id);
	
	// Show nhật ký
	@Query("select hd.ten_hanh_dong, hd.ngay_hanh_dong, hd.danhgia.danh_giaID, hd.users.accountID from HanhDong hd\r\n"
			+ "  where hd.danhgia.danh_giaID is not NULL")
	List<Object[]> listNhatKy();
}
