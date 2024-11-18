package com.BaiTapLab.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.GioHang;
import com.BaiTapLab.Entity.GioHangChiTiet;

public interface GioHangChiTietRepository extends JpaRepository<GioHangChiTiet, Integer> {
	 @Query("SELECT gct FROM GioHangChiTiet gct WHERE gct.gioHang = :gioHang AND gct.sanPham.id = :sanPhamId")
	    Optional<GioHangChiTiet> findByGioHangAndSanPham(@Param("gioHang") GioHang gioHang, @Param("sanPhamId") String sanPhamId);
}