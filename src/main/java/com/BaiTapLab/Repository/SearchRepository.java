package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.SanPham;

public interface SearchRepository extends JpaRepository<SanPham, String> {

	// search by Danh Muc

	// KO CÓ GIẢM GIÁ
	// only danh mục
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE s.danhmuc.danh_mucId = ?1 AND (?2 = true AND s.phantram_GG > 0 OR ?2 = false AND s.phantram_GG >= 0 )"
			+ "AND s.hoat_dong LIKE 'Working' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDanhMuc(String danhmuc, boolean showDiscount);

	// danh mục and name
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE s.danhmuc.danh_mucId = ?1 AND s.ten_san_pham LIKE %?2% "
			+ "AND (?3 = true AND s.phantram_GG > 0 OR ?3 = false AND s.phantram_GG >= 0 )"
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")

	List<Object[]> findSanPhamByDanhMucAndName(String danhmuc, String name, boolean showDiscount);

	// danh mục số sao
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE s.danhmuc.danh_mucId = ?1 AND ((?2 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?2 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?2 AND (?2 + 0.9)))"
			+ "AND (?3 = true AND s.phantram_GG > 0 OR ?3 = false AND s.phantram_GG >= 0 )"
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")

	List<Object[]> findSanPhamByDanhMucAndSosao(String danhmuc, int sosao, boolean showDiscount);

	// danh mục price < 10000
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE s.danhmuc.danh_mucId = ?1 " + "AND s.gia_goc <= 10000 "
			+ "AND (?2 = true AND s.phantram_GG > 0 OR ?2 = false AND s.phantram_GG >= 0 )"
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDanhMucLess10K(String danhmuc, boolean showDiscount);

	// danh mục price > 100000
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE s.danhmuc.danh_mucId = ?1  AND s.gia_goc >= 100000 "
			+ "AND (?2 = true AND s.phantram_GG > 0 OR ?2 = false AND s.phantram_GG >= 0 )"
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDanhMucMore100K(String danhmuc, boolean showDiscount);

	// danh mục default
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE s.danhmuc.danh_mucId = ?1 " + "AND s.gia_goc BETWEEN  ?2 AND  ?3 "
			+ "AND (?4 = true AND s.phantram_GG > 0 OR ?4 = false AND s.phantram_GG >= 0 )"
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDanhMucDefault(String danhmuc, Long default1, Long default2, boolean showDiscount);

	// danh mục name số sao
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE s.danhmuc.danh_mucId = ?1 AND s.ten_san_pham LIKE %?2% "
			+ "AND ((?3 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?3 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?3 AND (?3 + 0.9)))"
			+ "AND (?4 = true AND s.phantram_GG > 0 OR ?4 = false AND s.phantram_GG >= 0 )"
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDanhMucNameSoSao(String danhmuc, String name, int sosao, boolean showDiscount);

	// danh mục name price số sao > 100k
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE s.danhmuc.danh_mucId = ?1 AND s.ten_san_pham LIKE %?2% "
			+ "AND ((?3 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?3 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?3 AND (?3 + 0.9)))"
			+ "AND s.gia_goc >= 100000 " + "AND (?4 = true AND s.phantram_GG > 0 OR ?4 = false AND s.phantram_GG >= 0 )"
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDanhMucNameSoSaoMore100k(String danhmuc, String name, int sosao, boolean showDiscount);

	// danh mục name price số sao < 10k
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE s.danhmuc.danh_mucId = ?1 AND s.ten_san_pham LIKE %?2% "
			+ "AND ((?3 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?3 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?3 AND (?3 + 0.9)))"
			+ "AND s.gia_goc <= 10000 " + "AND (?4 = true AND s.phantram_GG > 0 OR ?4 = false AND s.phantram_GG >= 0 )"
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDanhMucNameSoSaoLess10k(String danhmuc, String name, int sosao, boolean showDiscount);

	// danh mục name số sao default
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE s.danhmuc.danh_mucId = ?1 AND s.ten_san_pham LIKE %?2% "
			+ "AND ((?3 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?3 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?3 AND (?3 + 0.9)))"
			+ "AND s.gia_goc BETWEEN  ?4 AND  ?5 "
			+ "AND (?6 = true AND s.phantram_GG > 0 OR ?6 = false AND s.phantram_GG >= 0 )"
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDanhMucNameSoSaoDefault(String danhmuc, String name, int sosao, Long default1,
			Long default2, boolean showDiscount);

	// danh mục name price > 100k
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE s.danhmuc.danh_mucId = ?1 AND s.ten_san_pham LIKE %?2% "
			+ "AND s.gia_goc >= 100000 " + "AND (?3 = true AND s.phantram_GG > 0 OR ?3 = false AND s.phantram_GG >= 0 )"
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDanhMucNameMore100k(String danhmuc, String name, boolean showDiscount);

	// danh mục name price < 10k
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE s.danhmuc.danh_mucId = ?1 AND s.ten_san_pham LIKE %?2% "
			+ "AND s.gia_goc <= 10000 " + "AND (?3 = true AND s.phantram_GG > 0 OR ?3 = false AND s.phantram_GG >= 0 )"
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDanhMucNameLess10k(String danhmuc, String name, boolean showDiscount);

	// danh mục name default
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE s.danhmuc.danh_mucId = ?1 AND s.ten_san_pham LIKE %?2% "
			+ "AND s.gia_goc BETWEEN  ?3 AND  ?4 "
			+ "AND (?5 = true AND s.phantram_GG > 0 OR ?5 = false AND s.phantram_GG >= 0 )"
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDanhMucNameDefault(String danhmuc, String name, Long default1, Long default2,
			boolean showDiscount);

	// danh mục sosao price > 100k
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE s.danhmuc.danh_mucId = ?1 AND ((?2 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?2 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?2 AND (?2 + 0.9)))"
			+ "AND s.gia_goc >= 100000 " + "AND (?3 = true AND s.phantram_GG > 0 OR ?3 = false AND s.phantram_GG >= 0 )"
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDanhMucSoSaoMore100k(String danhmuc, int sosao, boolean showDiscount);

	// danh mục sosao price < 10k
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE s.danhmuc.danh_mucId = ?1 AND ((?2 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?2 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?2 AND (?2 + 0.9)))"
			+ "AND s.gia_goc <= 10000 " + "AND (?3 = true AND s.phantram_GG > 0 OR ?3 = false AND s.phantram_GG >= 0 )"
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDanhMucSoSaoLess10k(String danhmuc, int sosao, boolean showDiscount);

	// danh mục sosao default
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE s.danhmuc.danh_mucId = ?1 AND ((?2 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?2 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?2 AND (?2 + 0.9)))"
			+ "AND s.gia_goc BETWEEN  ?3 AND  ?4 "
			+ "AND (?5 = true AND s.phantram_GG > 0 OR ?5 = false AND s.phantram_GG >= 0 )"
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDanhMucSoSaoDefault(String danhmuc, int sosao, Long default1, Long default2,
			boolean showDiscount);

	// search by giảm giá
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE  " + "(?1 = true AND s.phantram_GG > 0 OR ?1 = false AND s.phantram_GG >= 0 )"
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountOrNot(boolean showDiscount);

	// name và giảm giá
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE  s.ten_san_pham LIKE %?1% AND (?2 = true AND s.phantram_GG > 0 OR ?2 = false AND s.phantram_GG >= 0 )"
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountWithNameOrNot(String name, boolean showDiscount);

	// danh mục và giảm giá
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE  s.danhmuc.danh_mucId = ?1 AND (?2 = true AND s.phantram_GG > 0 OR ?2 = false AND s.phantram_GG >= 0 )"
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountWithDanhMucOrNot(String danhmuc, boolean showDiscount);

	// sosao và giảm giá
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  "
			+ "WHERE ((?1 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?1 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?1 AND (?1 + 0.9))) "
			+ "AND ((?2 = true AND s.phantram_GG > 0) OR (?2 = false AND s.phantram_GG >= 0)) "
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountWithSosaoOrNot(int sosao, boolean showDiscount);

	// price >100k và giảm giá
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  " + "WHERE s.gia_goc >= 100000"
			+ "AND ((?1 = true AND s.phantram_GG > 0) OR (?1 = false AND s.phantram_GG >= 0)) "
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountMore100kOrNot(boolean showDiscount);

	// price <10k và giảm giá
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  " + "WHERE s.gia_goc < 10000"
			+ "AND ((?1 = true AND s.phantram_GG > 0) OR (?1 = false AND s.phantram_GG >= 0)) "
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountLess10kOrNot(boolean showDiscount);

	// default và giảm giá
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  " + "WHERE s.gia_goc BETWEEN ?1 AND ?2 AND ((?3 = true AND s.phantram_GG > 0) OR (?3 = false AND s.phantram_GG >= 0)) "
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountDefaultOrNot(Long default1, Long default2, boolean showDiscount);

	// danh muc so sao
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1 AND ((?2 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?2 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?2 AND (?2 + 0.9))) "
			+ "AND ((?3 = true AND s.phantram_GG > 0) OR (?3 = false AND s.phantram_GG >= 0)) "
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountDanhMucSoSaoOrNot(String danhmuc, int soso, boolean showDiscount);

	// danh muc name
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1" + "AND s.ten_san_pham LIKE %?2%"
			+ "AND ((?3 = true AND s.phantram_GG > 0) OR (?3 = false AND s.phantram_GG >= 0)) "
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountDanhMucNameOrNot(String danhmuc, String name, boolean showDiscount);

	// danh muc name sosao
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1 AND ((?2 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?2 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?2 AND (?2 + 0.9))) "
			+ "AND s.ten_san_pham LIKE %?3%"
			+ "AND ((?4 = true AND s.phantram_GG > 0) OR (?4 = false AND s.phantram_GG >= 0)) "
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountDanhMucSoSaoNameOrNot(String danhmuc, int soso, String name,
			boolean showDiscount);

	// name sosao
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s   "
			+ "WHERE ((?1 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?1 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?1 AND (?1 + 0.9))) "
			+ "AND s.ten_san_pham LIKE %?2% AND ((?3 = true AND s.phantram_GG > 0) OR (?3 = false AND s.phantram_GG >= 0)) "
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountSoSaoNameOrNot(int soso, String name, boolean showDiscount);

	// danh muc sosao name > 100k
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1 AND ((?2 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?2 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?2 AND (?2 + 0.9))) "
			+ "AND s.ten_san_pham LIKE %?3%"
			+ "AND ((?4 = true AND s.phantram_GG > 0) OR (?4 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc >= 100000 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountDanhMucSoSaoNameMore100KOrNot(String danhmuc, int soso, String name,
			boolean showDiscount);

	// danh muc name > 100k
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1" + "AND s.ten_san_pham LIKE %?2% AND ((?3 = true AND s.phantram_GG > 0) OR (?3 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc >= 100000 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountDanhMucNameMore100KOrNot(String danhmuc, String name, boolean showDiscount);

	// danh muc so sao > 100k
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1 AND ((?2 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?2 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?2 AND (?2 + 0.9))) "
			+ "AND ((?3 = true AND s.phantram_GG > 0) OR (?3 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc >= 100000 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountDanhMucSoSaoMore100kOrNot(String danhmuc, int soso, boolean showDiscount);

	// name sosao > 100k
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE  s.ten_san_pham LIKE %?1% AND ((?2 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?2 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?2 AND (?2 + 0.9))) "
			+ "AND ((?3 = true AND s.phantram_GG > 0) OR (?3 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc >= 100000 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountSoSaoNameMore100kOrNot(String name, int soso, boolean showDiscount);

	// danh muc sosao name < 10k
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1 AND ((?2 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?2 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?2 AND (?2 + 0.9))) "
			+ "AND s.ten_san_pham LIKE %?3%"
			+ "AND ((?4 = true AND s.phantram_GG > 0) OR (?4 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc <= 10000 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountDanhMucSoSaoNameLess10KOrNot(String danhmuc, int soso, String name,
			boolean showDiscount);

	// danh muc name < 10k
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1" + "AND s.ten_san_pham LIKE %?2% AND ((?3 = true AND s.phantram_GG > 0) OR (?3 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc <= 10000 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountDanhMucNameLess10KOrNot(String danhmuc, String name, boolean showDiscount);

	// danh muc so sao < 10k
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1 AND ((?2 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?2 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?2 AND (?2 + 0.9))) "
			+ "AND ((?3 = true AND s.phantram_GG > 0) OR (?3 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc <= 10000 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountDanhMucSoSaoLess10kOrNot(String danhmuc, int soso, boolean showDiscount);

	// name sosao < 10k
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE  s.ten_san_pham LIKE %?1% AND ((?2 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?2 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?2 AND (?2 + 0.9))) "
			+ "AND ((?3 = true AND s.phantram_GG > 0) OR (?3 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc <= 10000 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountSoSaoNameLess10kOrNot(String name, int soso, boolean showDiscount);

	// danh muc sosao so sao default
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1 AND ((?2 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?2 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?2 AND (?2 + 0.9))) "
			+ "AND s.ten_san_pham LIKE %?3%"
			+ "AND ((?4 = true AND s.phantram_GG > 0) OR (?4 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc BETWEEN ?5 AND ?6 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountDanhMucSoSaoNamedefaultOrNot(String danhmuc, int soso, String name,
			boolean showDiscount, long default1, long default2);

	// danh muc name default
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1" + "AND s.ten_san_pham LIKE %?2% AND ((?3 = true AND s.phantram_GG > 0) OR (?3 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc BETWEEN ?4 AND ?5 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountDanhMucNamedefaultOrNot(String danhmuc, String name, boolean showDiscount,
			long default1, long default2);

	// danh muc so sao default
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1 AND ((?2 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?2 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?2 AND (?2 + 0.9))) "

			+ "AND ((?3 = true AND s.phantram_GG > 0) OR (?3 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc BETWEEN ?4 AND ?5 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountDanhMucSoSaodefaultOrNot(String danhmuc, int soso, boolean showDiscount,
			long default1, long default2);

	// name sosao default
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE "
			+ " ((?1 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?1 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?1 AND (?1 + 0.9))) "
			+ "AND s.ten_san_pham LIKE %?2% AND ((?3 = true AND s.phantram_GG > 0) OR (?3 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc BETWEEN ?4 AND ?5 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountSoSaoNamedefaultOrNot(int soso, String name, boolean showDiscount,
			long default1, long default2);

	// name price > 100000
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE " + " s.ten_san_pham LIKE %?1% AND ((?2 = true AND s.phantram_GG > 0) OR (?2 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc >= 100000 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountNameMore100KOrNot(String name, boolean showDiscount);

	// sao price > 100000
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE  ((?1 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?1 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?1 AND (?1 + 0.9))) "
			+ "AND ((?2 = true AND s.phantram_GG > 0) OR (?2 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc >= 100000 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountSoSaoMore100KOrNot(int soso, boolean showDiscount);

	// danh muc price > 100000
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1 AND ((?2 = true AND s.phantram_GG > 0) OR (?2 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc >= 100000 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountDanhMucMore100kOrNot(String danhmuc, boolean showDiscount);

	// name price < 10000
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE " + " s.ten_san_pham LIKE %?1% AND ((?2 = true AND s.phantram_GG > 0) OR (?2 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc <= 10000 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountNameLess10KOrNot(String name, boolean showDiscount);

	// sao price < 10000
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE"
			+ " ((?1 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?1 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?1 AND (?1 + 0.9))) "
			+ "AND ((?2 = true AND s.phantram_GG > 0) OR (?2 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc <= 10000 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountSoSaoLess10kOrNot(int soso, boolean showDiscount);

	// danh muc price < 10000
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1 AND ((?2 = true AND s.phantram_GG > 0) OR (?2 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc <= 10000 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountDanhMucLess10kOrNot(String danhmuc, boolean showDiscount);

	// name default
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE " + " s.ten_san_pham LIKE %?1% AND ((?2 = true AND s.phantram_GG > 0) OR (?2 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc BETWEEN ?3 AND ?4 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountNamedefaultOrNot(String name, boolean showDiscount, long default1,
			long default2);

	// sao default
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE "
			+ " ((?1 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?1 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?1 AND (?1 + 0.9))) "
			+ "AND ((?2 = true AND s.phantram_GG > 0) OR (?2 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc BETWEEN ?3 AND ?4 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountSoSaodefaultOrNot(int soso, boolean showDiscount, long default1, long default2);

	// danh muc default
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1 AND ((?2 = true AND s.phantram_GG > 0) OR (?2 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc BETWEEN ?3 AND ?4 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountDanhMucdefaultOrNot(String danhmuc, boolean showDiscount, long default1,
			long default2);

	// search by price < 10k

	// price
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE" + "((?1 = true AND s.phantram_GG > 0) OR (?1 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc <= 10000" + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> FindSanphamByPriceLess10k(boolean showDiscount);

	// name price
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.ten_san_pham LIKE %?1% AND ((?2 = true AND s.phantram_GG > 0) OR (?2 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc <= 10000" + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> FindSanphamByPriceNameLess10k(String name, boolean showDiscount);

	// danh muc price
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1 AND ((?2 = true AND s.phantram_GG > 0) OR (?2 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc <= 10000" + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> FindSanphamByPriceDanhmucLess10k(String danhmuc, boolean showDiscount);

	// soso price
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE"
			+ "((?1 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?1 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?1 AND (?1 + 0.9))) "
			+ "AND ((?2 = true AND s.phantram_GG > 0) OR (?2 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc <= 10000" + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> FindSanphamByPriceSosaoLess10k(int sosao, boolean showDiscount);

	// name dm ss
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1" + "AND s.ten_san_pham LIKE %?2%"
			+ "AND ((?3 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?3 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?3 AND (?3 + 0.9))) "
			+ "AND ((?4 = true AND s.phantram_GG > 0) OR (?4 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc <= 10000" + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> FindSanphamByPriceNameDanhMucSosaoLess10k(String danhmuc, String name, int sosao,
			boolean showDiscount);

	// name dm
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1" + "AND s.ten_san_pham LIKE %?2% AND ((?3 = true AND s.phantram_GG > 0) OR (?3 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc <= 10000" + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> FindSanphamByPriceNameLESS10k(String danhmuc, String name, boolean showDiscount);

	// name ss
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE " + " s.ten_san_pham LIKE %?1% AND ((?2 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?2 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?2 AND (?2 + 0.9))) "
			+ "AND ((?3 = true AND s.phantram_GG > 0) OR (?3 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc <= 10000" + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> FindSanphamByPriceNameSosaoLESS10k(String name, int sosao, boolean showDiscount);

	// dm ss
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1 AND ((?2 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?2 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?2 AND (?2 + 0.9))) "
			+ "AND ((?3 = true AND s.phantram_GG > 0) OR (?3 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc <= 10000" + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> FindSanphamByPriceDanhMucSosaoLESS10k(String danhmuc, int sosao, boolean showDiscount);

	// search by price > 100k

	// price
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE" + "((?1 = true AND s.phantram_GG > 0) OR (?1 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc >= 100000" + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> FindSanphamByPriceMore100k(boolean showDiscount);

	// name price
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.ten_san_pham LIKE %?1% AND ((?2 = true AND s.phantram_GG > 0) OR (?2 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc <= 10000" + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> FindSanphamByPriceNameMore100k2(String name, boolean showDiscount);

	// danh muc price
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1 AND ((?2 = true AND s.phantram_GG > 0) OR (?2 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc <= 10000" + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> FindSanphamByPriceDanhmucMore100k(String danhmuc, boolean showDiscount);

	// soso price
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE"
			+ "((?1 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?1 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?1 AND (?1 + 0.9))) "
			+ "AND ((?2 = true AND s.phantram_GG > 0) OR (?2 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc <= 10000" + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> FindSanphamByPriceSosaoMore100k(int sosao, boolean showDiscount);

	// name dm ss
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1" + "AND s.ten_san_pham LIKE %?2% AND ((?3 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?3 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?3 AND (?3 + 0.9))) "
			+ "AND ((?4 = true AND s.phantram_GG > 0) OR (?4 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc <= 10000" + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> FindSanphamByPriceNameDanhMucSosaoMore100k(String danhmuc, String name, int sosao,
			boolean showDiscount);

	// name dm
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1" + "AND s.ten_san_pham LIKE %?2% AND ((?3 = true AND s.phantram_GG > 0) OR (?3 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc <= 10000" + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> FindSanphamByPriceNameMore100k(String danhmuc, String name, boolean showDiscount);

	// name ss
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE " + " s.ten_san_pham LIKE %?1% AND ((?2 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?2 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?2 AND (?2 + 0.9))) "
			+ "AND ((?3 = true AND s.phantram_GG > 0) OR (?3 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc <= 10000" + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> FindSanphamByPriceNameSosaoMore100k(String name, int sosao, boolean showDiscount);

	// dm ss
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1 AND ((?2 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?2 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?2 AND (?2 + 0.9))) "
			+ "AND ((?3 = true AND s.phantram_GG > 0) OR (?3 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc <= 10000" + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> FindSanphamByPriceDanhMucSosaoMore100k(String danhmuc, int sosao, boolean showDiscount);

	// search by default

	// default
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE " + " ((?1 = true AND s.phantram_GG > 0) OR (?1 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc BETWEEN ?2 AND ?3 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountdefaultOrNot(boolean showDiscount, long default1, long default2);

	// name default
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.ten_san_pham LIKE %?1% AND ((?2 = true AND s.phantram_GG > 0) OR (?2 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc BETWEEN ?3 AND ?4 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountNameDefaultOrNot(String name, boolean showDiscount, long default1,
			long default2);

	// danh muc default
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1 AND ((?2 = true AND s.phantram_GG > 0) OR (?2 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc BETWEEN ?3 AND ?4 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountDanhmucDefaultOrNot(String danhmuc, boolean showDiscount, long default1,
			long default2);

	// sosao default
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE "
			+ " ((?1 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?1 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?1 AND (?1 + 0.9))) "
			+ "AND ((?2 = true AND s.phantram_GG > 0) OR (?2 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc BETWEEN ?3 AND ?4 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountSosaoDefaultOrNot(int sosao, boolean showDiscount, long default1,
			long default2);

	// name dm ss default
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1" + "AND s.ten_san_pham LIKE %?2% AND (( ?3 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?3 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?3 AND (?3 + 0.9))) "
			+ "AND ((?4 = true AND s.phantram_GG > 0) OR (?4 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc BETWEEN ?5 AND ?6 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountSosaoNameDanhMucDefaultOrNot(String danhmuc, String name, int sosao,
			boolean showDiscount, long default1, long default2);

	// dm name
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1" + "AND s.ten_san_pham LIKE %?2% AND ((?3 = true AND s.phantram_GG > 0) OR (?3 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc BETWEEN ?4 AND ?5 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountNameDanhMucDefaultOrNot(String danhmuc, String name, boolean showDiscount,
			long default1, long default2);

	// dm ss
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE s.danhmuc.danh_mucId = ?1 AND (( ?2 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?2 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?2 AND (?2 + 0.9))) "
			+ "AND ((?3 = true AND s.phantram_GG > 0) OR (?3 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc BETWEEN ?4 AND ?5 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountSosaoDanhMucDefaultOrNot(String danhmuc, int sosao, boolean showDiscount,
			long default1, long default2);

	// name ss

	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE " + " s.ten_san_pham LIKE %?1% AND (( ?2 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?2 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?2 AND (?2 + 0.9))) "
			+ "AND ((?3 = true AND s.phantram_GG > 0) OR (?3 = false AND s.phantram_GG >= 0)) "
			+ "AND s.gia_goc BETWEEN ?4 AND ?5 " + "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountSosaoNameDefaultOrNot(String name, int sosao, boolean showDiscount,
			long default1, long default2);

	// số sao name

	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE " + " s.ten_san_pham LIKE %?1% AND (( ?2 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?2 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?2 AND (?2 + 0.9))) "
			+ "AND ((?3 = true AND s.phantram_GG > 0) OR (?3 = false AND s.phantram_GG >= 0)) "
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> findSanPhamByDiscountSosaoNameOrNot(String name, int sosao, boolean showDiscount);

	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s  WHERE "
			+ "(( ?1 = 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) = 5) "
			+ "OR (?1 < 5 AND (SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) BETWEEN ?1 AND (?1 + 0.9))) "
			+ "AND ((?2 = true AND s.phantram_GG > 0) OR (?2 = false AND s.phantram_GG >= 0)) "
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null ")
	List<Object[]> FindSanPhamBySoSaoHaveDiscount(int sosao, boolean showDiscount);

}