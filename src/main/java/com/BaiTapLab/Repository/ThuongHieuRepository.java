package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.ThuongHieu;

public interface ThuongHieuRepository extends JpaRepository<ThuongHieu, String>{
	@Query("select th from ThuongHieu th where th.ten_thuong_hieu = :ten_thuong_hieu ")
	ThuongHieu findByTen_thuong_hieu(@Param("ten_thuong_hieu") String ten_thuong_hieu);
	
	@Query("select th.ten_thuong_hieu from ThuongHieu th where th.hoat_dong = 'On'")
	List<Object[]> listgetTenThuongHieu();
}
