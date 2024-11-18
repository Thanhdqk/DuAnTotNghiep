package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.HinhAnh;

public interface HinhAnhRepository extends JpaRepository<HinhAnh, Integer> {
    @Query("SELECT h FROM HinhAnh h WHERE h.sanpham.san_phamId = ?1")
    List<HinhAnh> findBySanPhamId(String sanPhamId);
}
