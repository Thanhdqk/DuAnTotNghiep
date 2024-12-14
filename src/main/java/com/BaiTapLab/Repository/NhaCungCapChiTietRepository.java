package com.BaiTapLab.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.NhaCungCapChiTiet;

import jakarta.transaction.Transactional;

public interface NhaCungCapChiTietRepository extends JpaRepository<NhaCungCapChiTiet, Integer> {
	@Modifying
    @Transactional
	@Query("DELETE  FROM NhaCungCapChiTiet e WHERE e.sanpham.san_phamId = ?1 ")
	void removeFromNhaCungCapChiTiet(String sanphamid);
}
