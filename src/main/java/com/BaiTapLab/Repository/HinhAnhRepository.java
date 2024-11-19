package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.HinhAnh;
import com.BaiTapLab.Entity.SanPham;

public interface HinhAnhRepository extends JpaRepository<HinhAnh, Integer> {

    @Query("SELECT s.ten_san_pham, h FROM SanPham s JOIN s.hinhanh h")
    List<Object[]> findTenSanPhamAndHinhAnh();
    
    @Query("SELECT s.ten_san_pham, h FROM SanPham s JOIN s.hinhanh h")
    List<Object[]> findAllTenSanPhamAndHinhanh();
    
    // Tìm hình ảnh của một sản phẩm dựa trên sản phẩm và tên hình ảnh
    @Query("SELECT h FROM HinhAnh h WHERE h.sanpham.san_phamId = :sanPham AND h.ten_hinh = :tenHinh")
    List<HinhAnh> findBySanphamAndTenHinh(@Param("sanPham") String id, @Param("tenHinh") String tenHinh);
    
    // Tìm tất cả hình ảnh của một sản phẩm
    List<HinhAnh> findBySanpham(SanPham sanPham);
}
