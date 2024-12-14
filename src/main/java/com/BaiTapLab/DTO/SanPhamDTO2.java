package com.BaiTapLab.DTO;

import java.util.List;

public record SanPhamDTO2(

		String san_phamId,

		String ten_san_pham,

		List<HinhAnhDTO> hinhanh,
		
		Integer  phantram_GG,
		
		Double gia_goc,
		
		Double gia_km

) {

}
