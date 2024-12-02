package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.BaiTapLab.DTO.BannerDTO;
import com.BaiTapLab.DTO.NhaCungCapDTO;
/*import com.BaiTapLab.DTO.BannerDTO;
import com.BaiTapLab.DTO.NhaCungCapDTO;*/
import com.BaiTapLab.DTO.UserDTO;
import com.BaiTapLab.Entity.HanhDong;

public interface HanhDongReopository extends JpaRepository<HanhDong, Integer> {

	@Query("SELECT new com.BaiTapLab.DTO.UserDTO(hd.ten_hanh_dong,hd.users) FROM HanhDong hd")
	List<UserDTO> findUser();
	
	
	  @Query("SELECT new com.BaiTapLab.DTO.NhaCungCapDTO(hd.ten_hanh_dong,hd.nhacungcap) FROM HanhDong hd") List<NhaCungCapDTO> findNhaCungCap();
	  
	 @Query("SELECT new com.BaiTapLab.DTO.BannerDTO(hd.ten_hanh_dong, hd.banner) FROM HanhDong hd") List<BannerDTO> findBanner();
	  
	
}
