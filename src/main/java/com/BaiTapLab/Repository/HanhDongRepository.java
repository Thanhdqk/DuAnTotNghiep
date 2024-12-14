package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.DTO.HanhDongDTO;
import com.BaiTapLab.DTO.PopupDTO;
import com.BaiTapLab.DTO.ResponeDTO;
import com.BaiTapLab.DTO.SanPhamDTO;
import com.BaiTapLab.Entity.HanhDong;

public interface HanhDongRepository extends JpaRepository<HanhDong, Integer> {

	@Query("SELECT new com.BaiTapLab.DTO.HanhDongDTO(hd.ten_hanh_dong, hd.danhmuc) FROM HanhDong hd ")
	List<HanhDongDTO> findHangDongDanhMuc();

	@Query("SELECT new com.BaiTapLab.DTO.PopupDTO(hd.ten_hanh_dong,hd.ngay_tao, hd.users, hd.popup) FROM HanhDong hd order by hd.hanh_dongID DESC ")
	List<PopupDTO> findHanhDongPopup();

	@Query("SELECT new com.BaiTapLab.DTO.ResponeDTO(hd.ten_hanh_dong, hd.respone) FROM HanhDong hd ")
	List<ResponeDTO> findHanhDongRespone();

	@Query("SELECT new com.BaiTapLab.DTO.SanPhamDTO(hd.ten_hanh_dong,hd.ngay_tao,hd.users, hd.sanpham) FROM HanhDong hd  ")
	List<SanPhamDTO> findHanhDongSanpham();
}