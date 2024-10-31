package com.BaiTapLab.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Service.SanPhamService;

public interface SanphamRepository extends JpaRepository<SanPham, String> {

	@Query("SELECT s FROM SanPham s WHERE s.ngay_tao BETWEEN  ?1 AND CURRENT_DATE")
	List<SanPham> findSanPhamLast7Days(LocalDate now);

	@Query("SELECT s FROM SanPham s WHERE s.san_phamId = ?1")
	SanPham findSanPhamById(String id);

	// tìm các sản phẩm có khuyến mãi
	@Query("SELECT s FROM SanPham s WHERE s.phantram_GG > 0")
	List<SanPham> findSanPhamphantramGG();

	// tìm sản phẩm cùng loại categoty
	@Query("SELECT s FROM SanPham s where s.danhmuc.danh_mucId = ?1")
	List<SanPham> findSanPhamSimilar(String id);

	// tìm sản phẩm theo id category

	@Query("SELECT s FROM SanPham s  where s.danhmuc.danh_mucId = ?1 ")
	List<SanPham> findSanPhamByDanhmucId(String id);

	// tìm các sản phẩm bán nhiều nhất

// tìm kiếm  theo tên
	@Query("SELECT s FROM SanPham s WHERE s.ten_san_pham LIKE %?1%")
	List<SanPham> findSanPhamByTenSanPham(String name);

//tìm kiếm  theo tên và danh mực

	@Query("SELECT p FROM SanPham p WHERE p.ten_san_pham LIKE %?1%  AND p.danhmuc.danh_mucId = ?2")
	List<SanPham> findSanPhanByTenAndDanhMuc(String name, String id);

	// tìm kiếm theo tên và danh mục và có khuyến mãi
	@Query("SELECT p FROM SanPham p WHERE p.ten_san_pham LIKE %?1%  AND p.danhmuc.danh_mucId = ?2 AND p.phantram_GG >0")
	List<SanPham> findSanPhamByTenAndDandMucAndGG(String name, String id);

	// tìm kiếm theo tên và danh mục và ko có khuyến mãi
	@Query("SELECT p FROM SanPham p WHERE p.ten_san_pham LIKE %?1%  AND p.danhmuc.danh_mucId = ?2 AND p.phantram_GG =0")
	List<SanPham> findSanPhamByTenAndDandMucAndWithOutGG(String name, String id);

	// tìm kiếm theo tên ko có khuyến mãi
	@Query("SELECT p FROM SanPham p WHERE p.ten_san_pham LIKE %?1%   AND p.phantram_GG >=0")
	List<SanPham> findSanPhamByTenWithOutGG(String name);

	// tìm kiếm danh mục và ko có khuyến mãi
	@Query("SELECT p FROM SanPham p WHERE  p.danhmuc.danh_mucId = ?1 AND p.phantram_GG >=0")
	List<SanPham> findSanPhamByDandMucAndWithOutGG(String id);

//tìm kiếm theo danh mục và  có khuyến mãi
	@Query("SELECT p FROM SanPham p WHERE p.danhmuc.danh_mucId = ?1 AND p.phantram_GG >0")
	List<SanPham> findSanPhamByDandMucAndGG(String id);

//tìm kiếm theo tên và  có khuyến mãi
	@Query("SELECT p FROM SanPham p WHERE p.ten_san_pham LIKE %?1%  AND p.phantram_GG >0")
	List<SanPham> findSanPhamByTenAndGG(String name);

	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE d.so_sao = ?1")
	List<SanPham> findSanPhamBySoSao(int sosao);

	@Query("SELECT p FROM SanPham p JOIN p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5")
	List<SanPham> findSanPhamByTotalSoSaoEquals5();

	@Query("SELECT p FROM SanPham p ORDER BY p.luot_mua DESC")
	List<SanPham> findTop10ByLuotMua(Pageable pageable);

	@Query("SELECT s FROM SanPham s WHERE s.ngay_tao BETWEEN ?1 AND CURRENT_DATE ORDER BY s.luot_mua DESC")
	List<SanPham> findSanPhamLast7DaysWith(LocalDate startDate);

}
