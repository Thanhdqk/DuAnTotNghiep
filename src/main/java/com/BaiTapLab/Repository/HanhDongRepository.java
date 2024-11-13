package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.DTO.HanhDongDTO;
import com.BaiTapLab.Entity.HanhDong;

public interface HanhDongRepository extends JpaRepository<HanhDong,Integer>{

	@Query("SELECT new com.BaiTapLab.DTO.HanhDongDTO(hd.ten_hanh_dong, hd.danhmuc) FROM HanhDong hd ")
	List<HanhDongDTO> findHangDongDanhMuc();
}
