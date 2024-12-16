package com.BaiTapLab.DTO;

import java.time.LocalDate;
import java.util.List;

import com.BaiTapLab.Entity.Users;

import jakarta.persistence.Column;

public record BannerDTO2(String bannerId,

		String hinh_anh,

		String hoat_dong,

		String trang_thai_xoa,

		LocalDate ngay_tao,

		LocalDate ngay_het_han,
		
		UserDTO2 users,

		List<BannerChiTietDTO> bannerchitiet

	

) {


}