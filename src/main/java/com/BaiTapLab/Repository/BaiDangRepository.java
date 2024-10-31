package com.BaiTapLab.Repository;

import java.util.List;


import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.BaiDang;

public interface BaiDangRepository extends JpaRepository<BaiDang, String> {
   
	@Query("SELECT b FROM BaiDang b ORDER BY b.ngay_tao DESC ")
	List<BaiDang> findBaiDangNew(Pageable page);
}
