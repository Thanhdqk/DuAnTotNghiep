package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.DanhMuc;
import com.BaiTapLab.Entity.Users;

public interface DanhMucRepository extends JpaRepository<DanhMuc, String>{
	@Query("select dm.ten_loaiDM from DanhMuc dm")
	List<Object[]> getTenLoaiDanhMuc();
	
	@Query("select dm from DanhMuc dm where dm.ten_loaiDM = :ten_loaiDM")
    DanhMuc findByTen_loaiDM(@Param("ten_loaiDM") String ten_loaiDM);
}
