package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.SanPham;

public interface SanPhamRepository extends JpaRepository<SanPham, String>{
	@Query(value = "SELECT sp.san_phamId FROM SanPham sp ORDER BY sp.san_phamId DESC")
    List<String> getLatestProductId(Pageable pageable);
}
