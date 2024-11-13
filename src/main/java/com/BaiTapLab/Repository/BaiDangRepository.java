package com.BaiTapLab.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.BaiDang;

import jakarta.transaction.Transactional;

public interface BaiDangRepository extends JpaRepository<BaiDang, String>{
	@Modifying
	@Transactional
	@Query("UPDATE BaiDang v SET v.trang_thai_xoa = 'Xóa' WHERE v.bai_dangID = ?1")
	int markAsDeleted(String bai_dangID);
	
	@Modifying
    @Transactional
    @Query("UPDATE BaiDang v SET v.trang_thai_xoa = NULL WHERE v.bai_dangID = ?1")
    int reloadBaiDangID(String bai_dangID);
}
