package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.BaiTapLab.DTO.BaiDangDTO;
import com.BaiTapLab.DTO.ThuongHieuDTO;
import com.BaiTapLab.Entity.HanhDong;

@Repository
public interface HanhDongRepository extends JpaRepository<HanhDong, Integer> {
   
	@Query("SELECT new com.BaiTapLab.DTO.BaiDangDTO(hd.ten_hanh_dong, hd.baidang) FROM HanhDong hd ")
	List<BaiDangDTO> findBaiDang();
	
	@Query("SELECT new com.BaiTapLab.DTO.ThuongHieuDTO(hd.ten_hanh_dong, hd.thuonghieu) FROM HanhDong hd ")
	List<ThuongHieuDTO> findThuongHieu();

}
