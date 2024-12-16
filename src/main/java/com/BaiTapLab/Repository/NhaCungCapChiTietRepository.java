package com.BaiTapLab.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.NhaCungCap;
import com.BaiTapLab.Entity.NhaCungCapChiTiet;
import com.BaiTapLab.Entity.SanPham;

import jakarta.transaction.Transactional;

public interface NhaCungCapChiTietRepository extends JpaRepository<NhaCungCapChiTiet, Integer>{
	@Query("SELECT n FROM NhaCungCapChiTiet n WHERE n.sanpham = :sanpham")
	NhaCungCapChiTiet findBySanphamAndNhacungcap(
	        @Param("sanpham") SanPham sanpham);
	
	@Modifying
    @Transactional
	@Query("DELETE  FROM NhaCungCapChiTiet e WHERE e.sanpham.san_phamId = ?1 ")
	void removeFromNhaCungCapChiTiet(String sanphamid);
}	
