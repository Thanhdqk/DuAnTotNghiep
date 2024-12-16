package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.DTO.HanhDongDTO;
import com.BaiTapLab.DTO.HinhAnhHanhDongDTO;
import com.BaiTapLab.Entity.HinhAnh;
import com.BaiTapLab.Entity.SanPham;

public interface HinhAnhRepository extends JpaRepository<HinhAnh, Integer> {
	// Của Lợi
	@Query("SELECT s.ten_san_pham, h FROM SanPham s JOIN s.hinhanh h")
	List<Object[]> findTenSanPhamAndHinhAnh();

	@Query("SELECT s.ten_san_pham, h FROM SanPham s JOIN s.hinhanh h")
	List<Object[]> findAllTenSanPhamAndHinhanh();

	// Tìm hình ảnh của một sản phẩm dựa trên sản phẩm và tên hình ảnh
	@Query("SELECT h FROM HinhAnh h WHERE h.sanpham.san_phamId = :sanPham AND h.ten_hinh = :tenHinh")
	List<HinhAnh> findBySanphamAndTenHinh(@Param("sanPham") String id, @Param("tenHinh") String tenHinh);

	
	@Query("SELECT s.ten_san_pham, h FROM SanPham s JOIN s.hinhanh h WHERE h.sanpham.san_phamId = :sanPham")
	List<Object[]> findBySanphamid(@Param("sanPham") String id);
	// Tìm tất cả hình ảnh của một sản phẩm
	List<HinhAnh> findBySanpham(SanPham sanPham);

	// find hành động
	@Query("SELECT s.ten_san_pham, h.ten_hinh, hd.ngay_hanh_dong, hd.ten_hanh_dong " + "FROM SanPham s "
			+ "JOIN s.hinhanh h " + "JOIN HanhDong hd ON h.id = hd.hinhanh.id")
	List<Object[]> findSanPhamWithImagesAndHanhDong();

	@Query("SELECT new com.BaiTapLab.DTO.HinhAnhHanhDongDTO(sp.ten_san_pham, ha.ten_hinh, hd.ngay_hanh_dong, hd.ten_hanh_dong) "
			+ "FROM SanPham sp " + "JOIN HinhAnh ha ON sp.san_phamId = ha.sanpham.san_phamId "
			+ "JOIN HanhDong hd ON sp.san_phamId = hd.sanpham.san_phamId")
	List<HinhAnhHanhDongDTO> findHinhAnhWithDetails();

	@Query(value = "SELECT sp.ten_san_pham, ha.ten_hinh, hd.ngay_hanh_dong, hd.ten_hanh_dong " + 
            "FROM sanpham sp " +
            "LEFT JOIN hinhanh ha ON sp.san_pham_id = ha.san_pham_id " + 
            "LEFT JOIN hanhdong hd ON ha.id = hd.id " +
            "WHERE hd.id IS NOT NULL " + // Đảm bảo chỉ lấy những hành động liên quan đến hình ảnh
            "ORDER BY hd.ngay_hanh_dong ASC", nativeQuery = true)
List<Object[]> findSanPhamWithImagesAndActions();
	

//SELECT sp.ten_san_pham, ha.ten_hinh, hd.ngay_hanh_dong, hd.ten_hanh_dong 
//FROM sanpham sp 
//LEFT JOIN hinhanh ha ON sp.san_pham_id = ha.san_pham_id 
//LEFT JOIN hanhdong hd ON ha.id = hd.id 
//WHERE hd.id IS NOT NULL 
//ORDER BY hd.ngay_hanh_dong ASC
	
	@Query(value = "SELECT hd.ten_hanh_dong, hd.ngay_hanh_dong, sp.ten_san_pham, ha.ten_hinh " +
            "FROM hanhdong hd " +
            "LEFT JOIN hinhanh ha ON hd.id = ha.id " +
            "LEFT JOIN sanpham sp ON ha.san_pham_id = sp.san_pham_id WHERE hd.id IS NOT NULL " + 
            "ORDER BY hd.ngay_hanh_dong DESC", nativeQuery = true)
	List<Object[]> findActionsWithProductsAndImages();

	@Query("SELECT h FROM HinhAnh h WHERE h.sanpham.san_phamId = :sanPham AND h.ten_hinh = :tenHinh")
	HinhAnh findBySanphamAndTenHinhNEW(@Param("sanPham") String id, @Param("tenHinh") String tenHinh);
	
	// Của Quang
	@Query("SELECT h FROM HinhAnh h WHERE h.sanpham.san_phamId = ?1")
    List<HinhAnh> findBySanPhamId(String sanPhamId);
}
