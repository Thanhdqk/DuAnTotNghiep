package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.BannerChiTiet;

import jakarta.transaction.Transactional;

public interface BannerChiTietRepository extends JpaRepository<BannerChiTiet, Integer> {
	@Query("SELECT b.bannerId, b.hinh_anh, b.hoat_dong, b.ngay_tao, b.ngay_het_han, " + "d.danh_mucId, "
			+ "u.accountID,b.trang_thai_xoa " + "FROM BannerChiTiet bc " + "JOIN bc.banner b " + "JOIN bc.danhmuc d "
			+ "JOIN b.users u ")
	List<Object[]> findBannerDanhMucAndUsersJPQL();

	@Query("SELECT b.bannerId, b.hinh_anh, b.hoat_dong, b.ngay_tao, b.ngay_het_han, " + "d.danh_mucId, "
			+ "u.accountID,b.trang_thai_xoa " + "FROM BannerChiTiet bc " + "JOIN bc.banner b " + "JOIN bc.danhmuc d "
			+ "JOIN b.users u " + "WHERE b.trang_thai_xoa = 'Đã xóa' ")
	List<Object[]> findBannerDanhMucAndUsersJPQLdeleted();

	@Query("SELECT b.bannerId, b.hinh_anh, b.hoat_dong, b.ngay_tao, b.ngay_het_han, " + "d.danh_mucId, "
			+ "d.ten_loaiDM, " + // Thêm ten_loaiDM nếu bạn muốn lấy tên loại danh mục
			"u.accountID, b.trang_thai_xoa " + "FROM BannerChiTiet bc " + "JOIN bc.banner b " + "JOIN bc.danhmuc d "
			+ "JOIN b.users u")
	List<Object[]> findBannerDanhMucAndUsersJPQLtest();

	@Modifying
	@Transactional
	@Query("DELETE FROM BannerChiTiet p WHERE p.banner.bannerId = ?1 AND p.danhmuc.danh_mucId = ?2")
	void removefromBannerChitiet(String bannerId, String danh_mucId);

}
