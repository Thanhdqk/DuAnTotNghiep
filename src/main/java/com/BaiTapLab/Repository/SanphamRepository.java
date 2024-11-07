package com.BaiTapLab.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.SanPham;


public interface SanphamRepository extends JpaRepository<SanPham, String> {

 @Query("SELECT s FROM SanPham s WHERE s.ngay_tao BETWEEN  ?1 AND CURRENT_DATE")
 List<SanPham> findSanPhamLast7Days(LocalDate now);
 
// @Query("SELECT s FROM SanPham s")
// List<SanPham> findall();
 
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
 List<SanPham> findSanPhanByTenAndDanhMuc(String name,String id);
 
 // tìm kiếm theo tên và danh mục và có khuyến mãi
 @Query("SELECT p FROM SanPham p WHERE p.ten_san_pham LIKE %?1%  AND p.danhmuc.danh_mucId = ?2 AND p.phantram_GG >0")
 List<SanPham> findSanPhamByTenAndDandMucAndGG(String name,String id);
 
 // tìm kiếm theo tên và danh mục và ko có khuyến mãi
 @Query("SELECT p FROM SanPham p WHERE p.ten_san_pham LIKE %?1%  AND p.danhmuc.danh_mucId = ?2 AND p.phantram_GG =0")
 List<SanPham> findSanPhamByTenAndDandMucAndWithOutGG(String name,String id);
 
 // tìm kiếm theo tên  ko có khuyến mãi
 @Query("SELECT p FROM SanPham p WHERE p.ten_san_pham LIKE %?1%   AND p.phantram_GG >=0")
 List<SanPham> findSanPhamByTenWithOutGG(String name);
 
 // tìm kiếm  danh mục và ko có khuyến mãi
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
 
 
// tìm sản phẩm theo giá default 
 @Query("SELECT p FROM SanPham p  WHERE p.gia_goc BETWEEN  ?1 AND  ?2")
 List<SanPham> findSanPhamByPriceDefault(Long Default1 ,Long Default2);
 
//tìm sản phẩm theo giá nhỏ hơn
 @Query("SELECT p FROM SanPham p WHERE p.gia_goc <= ?1")
 List<SanPham> findSanPhamByPriceLess(Long price);
 
//tìm sản phẩm theo giá lớn  hơn
@Query("SELECT p FROM SanPham p WHERE p.gia_goc >= ?1")
List<SanPham> findSanPhamByPriceMore(Long price);
 
// tìm kiếm sản phẩn theo tên và số sao có GG
@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE d.so_sao = ?1 AND p.ten_san_pham LIKE %?2% AND p.phantram_GG >0")
List<SanPham> findSanPhamBySoSaoAndNameHaveDisCount(int sosao,String name);

//tìm kiếm sản phẩn theo danh mục và số sao có GG
@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE d.so_sao = ?1 AND p.danhmuc.danh_mucId = ?2 AND p.phantram_GG >0")
List<SanPham> findSanPhamBySoSaoAndDanhMucHaveDisCount(int sosao,String id);

//tìm kiếm sản phẩn theo danh mục và name  và số sao có GG
@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE d.so_sao = ?1 AND p.danhmuc.danh_mucId = ?2 AND  p.ten_san_pham LIKE %?3% AND  p.phantram_GG >0")
List<SanPham> findSanPhamBySoSaoAndDanhMucAndNameHaveDisCount(int sosao,String id,String name);

//tìm kiếm sản phẩn theo tên và số sao có GG
@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE d.so_sao = ?1 AND p.ten_san_pham LIKE %?2%")
List<SanPham> findSanPhamBySoSaoAndName(int sosao,String name);

//tìm kiếm sản phẩn theo danh mục và số sao có GG
@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE d.so_sao = ?1 AND p.danhmuc.danh_mucId = ?2 ")
List<SanPham> findSanPhamBySoSaoAndDanhMuc(int sosao,String id);

//tìm kiếm sản phẩn theo danh mục và name  và số sao có GG
@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE d.so_sao = ?1 AND p.danhmuc.danh_mucId = ?2 AND  p.ten_san_pham LIKE %?3% ")
List<SanPham> findSanPhamBySoSaoAndDanhMucAndName(int sosao,String id,String name);

// tìm sản phẩm theo số sao có gg
@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE d.so_sao = ?1 AND p.phantram_GG >0")
List<SanPham> findSanPhamBySoSaoHaveDiscount(int sosao);


//            tìm theo 5 SAO


//tìm kiếm sản phẩn theo tên và số sao có GG
@Query("SELECT p FROM SanPham p JOIN p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.ten_san_pham LIKE %?1% AND p.phantram_GG >0")
List<SanPham> findSanPhamBySoSaoEqual5AndNameHaveDisCount(String name);

//tìm kiếm sản phẩn theo danh mục và số sao có GG
@Query("SELECT p FROM SanPham p JOIN p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.danhmuc.danh_mucId = ?1 AND p.phantram_GG >0")
List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucHaveDisCount(String id);

//tìm kiếm sản phẩn theo danh mục và name  và số sao có GG
@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.danhmuc.danh_mucId = ?1 AND  p.ten_san_pham LIKE %?2% AND  p.phantram_GG >0")
List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucAndNameHaveDisCount(String id,String name);

//tìm kiếm sản phẩn theo tên và số sao có GG
@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.ten_san_pham LIKE %?1%")
List<SanPham> findSanPhamBySoSaoEqual5AndName(String name);

//tìm kiếm sản phẩn theo danh mục và số sao có GG
@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.danhmuc.danh_mucId = ?1 ")
List<SanPham> findSanPhamBySoSaoEqual5AndDanhMuc(String id);

//tìm kiếm sản phẩn theo danh mục và name  và số sao có GG
@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.danhmuc.danh_mucId = ?1 AND  p.ten_san_pham LIKE %?2% ")
List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucAndName(String id,String name);

//tìm sản phẩm theo số sao có gg
@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.phantram_GG >0")
List<SanPham> findSanPhamBySoSaoEqual5HaveDiscount();

//                    END tìm theo 5 SAO

//					 START Thương hiệu
@Query("SELECT p FROM SanPham p WHERE p.thuonghieu.thuong_hieuID = ?1")
List<SanPham> findSanPhamByThuongHieuId(String id);

//                   END Thương hiệu





}
