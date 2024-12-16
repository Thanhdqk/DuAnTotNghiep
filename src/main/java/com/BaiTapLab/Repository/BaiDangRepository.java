package com.BaiTapLab.Repository;


import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.BaiDang;

import jakarta.transaction.Transactional;

public interface BaiDangRepository extends JpaRepository<BaiDang, String>{
	// Của Tuấn
	@Modifying
	@Transactional
	@Query("UPDATE BaiDang v SET v.trang_thai_xoa = 'Xóa' WHERE v.bai_dangID = ?1")
	int markAsDeleted(String bai_dangID);
	
	@Modifying
    @Transactional
    @Query("UPDATE BaiDang v SET v.trang_thai_xoa = NULL WHERE v.bai_dangID = ?1")
    int reloadBaiDangID(String bai_dangID);
	
	@Query(value = "SELECT bd.bai_dangID FROM BaiDang bd ORDER BY bd.bai_dangID DESC")
    List<String> getLatestBaiDangId(Pageable pageable);
	
	// Lợi
	@Query("SELECT b FROM BaiDang b ORDER BY b.ngay_tao DESC ")
	List<BaiDang> findBaiDangNew(Pageable page);
}
