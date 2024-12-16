package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.DTO.BaiDangDTO;
import com.BaiTapLab.DTO.BannerDTO;
import com.BaiTapLab.DTO.HanhDongDTO;
import com.BaiTapLab.DTO.NhaCungCapDTO;
import com.BaiTapLab.DTO.PopupDTO;
import com.BaiTapLab.DTO.ResponeDTO;
import com.BaiTapLab.DTO.SanPhamDTO;
import com.BaiTapLab.DTO.SanPhamDTO1;
import com.BaiTapLab.DTO.ThuongHieuDTO;
import com.BaiTapLab.DTO.UserDTO;
import com.BaiTapLab.Entity.HanhDong;

public interface HanhDongRepository extends JpaRepository<HanhDong, Integer>{
	// Của Lợi
	@Query("SELECT new com.BaiTapLab.DTO.HanhDongDTO(hd.ten_hanh_dong, hd.danhmuc) FROM HanhDong hd ")
	List<HanhDongDTO> findHangDongDanhMuc();
	
	// Của Tuấn
	@Query("SELECT new com.BaiTapLab.DTO.BaiDangDTO(hd.ten_hanh_dong, hd.ngay_hanh_dong, hd.baidang) FROM HanhDong hd ")
	List<BaiDangDTO> findBaiDang();
	
	@Query("SELECT new com.BaiTapLab.DTO.ThuongHieuDTO(hd.ten_hanh_dong, hd.ngay_hanh_dong, hd.thuonghieu) FROM HanhDong hd ")
	List<ThuongHieuDTO> findThuongHieu();
	
	// Khánh
	@Query("SELECT new com.BaiTapLab.DTO.UserDTO(hd.ten_hanh_dong, hd.ngay_hanh_dong, hd.users) FROM HanhDong hd")
	List<UserDTO> findUser();
	
	
	@Query("SELECT new com.BaiTapLab.DTO.NhaCungCapDTO(hd.ten_hanh_dong,hd.ngay_hanh_dong, hd.nhacungcap) FROM HanhDong hd") 
	List<NhaCungCapDTO> findNhaCungCap();
	  
	@Query("SELECT new com.BaiTapLab.DTO.BannerDTO(hd.ten_hanh_dong,hd.ngay_hanh_dong ,hd.banner) FROM HanhDong hd") 
	List<BannerDTO> findBanner();
	
	// Của Phát
	@Query("SELECT new com.BaiTapLab.DTO.PopupDTO(hd.ten_hanh_dong,hd.ngay_hanh_dong, hd.users, hd.popup) FROM HanhDong hd order by hd.hanh_dongID DESC ")
	List<PopupDTO> findHanhDongPopup();

	@Query("SELECT new com.BaiTapLab.DTO.ResponeDTO(hd.ten_hanh_dong, hd.respone) FROM HanhDong hd ")
	List<ResponeDTO> findHanhDongRespone();

	@Query("SELECT new com.BaiTapLab.DTO.SanPhamDTO1(hd.ten_hanh_dong,hd.ngay_hanh_dong,hd.users,hd.sanpham) FROM HanhDong hd  ")
	List<SanPhamDTO1> findHanhDongSanpham();
}
