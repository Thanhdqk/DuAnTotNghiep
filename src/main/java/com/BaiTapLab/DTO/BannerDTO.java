package com.BaiTapLab.DTO;

import java.time.LocalDate;

public record BannerDTO(
		
		String bannerId,

		String hinh_anh,

		LocalDate ngay_tao,

		String hoat_dong,

		String trang_thai_xoa
		
		

) {

}
