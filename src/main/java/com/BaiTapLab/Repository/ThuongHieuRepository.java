package com.BaiTapLab.Repository;


import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.ThuongHieu;

import jakarta.transaction.Transactional;

public interface ThuongHieuRepository extends JpaRepository<ThuongHieu, String>{
	// Của Thành
	@Query("select th from ThuongHieu th where th.ten_thuong_hieu = :ten_thuong_hieu ")
	ThuongHieu findByTen_thuong_hieu(@Param("ten_thuong_hieu") String ten_thuong_hieu);
	
	@Query("select th.ten_thuong_hieu from ThuongHieu th where th.hoat_dong = 'On'")
	List<Object[]> listgetTenThuongHieu();
	
	// Của Tuấn
	@Modifying
	@Transactional
	@Query("UPDATE ThuongHieu v SET v.trang_thai_xoa = 'Xóa' WHERE v.thuong_hieuID = ?1")
	int markAsDeleted(String thuong_hieuID);
	
	@Modifying
    @Transactional
    @Query("UPDATE ThuongHieu v SET v.trang_thai_xoa = NULL WHERE v.thuong_hieuID = ?1")
    int reloadThuongHieuID(String thuong_hieuID);

	
	@Query(value = "SELECT th.thuong_hieuID FROM ThuongHieu th ORDER BY th.thuong_hieuID DESC")
    List<String> getLatestThuongHieuId(Pageable pageable);
	
	@Query("SELECT COUNT(v) > 0 FROM ThuongHieu v WHERE v.ten_thuong_hieu = ?1")
    boolean existsByTenThuongHieu(String tenThuongHieu);
}
