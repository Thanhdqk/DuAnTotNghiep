package com.BaiTapLab.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.Entity.ThuongHieu;

import jakarta.transaction.Transactional;

public interface ThuongHieuRepository extends JpaRepository<ThuongHieu, String>{
//	void deleteByID(String thuong_hieuID);
	@Modifying
	@Transactional
	@Query("UPDATE ThuongHieu v SET v.trang_thai_xoa = 'Xóa' WHERE v.thuong_hieuID = ?1")
	int markAsDeleted(String thuong_hieuID);
	
	@Modifying
    @Transactional
    @Query("UPDATE ThuongHieu v SET v.trang_thai_xoa = NULL WHERE v.thuong_hieuID = ?1")
    int reloadThuongHieuID(String thuong_hieuID);

//	Optional<ThuongHieu> findByThuongHieuID(String thuong_hieuID);
}
