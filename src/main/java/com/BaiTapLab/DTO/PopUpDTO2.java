package com.BaiTapLab.DTO;

import java.time.LocalDate;
import java.util.List;

import com.BaiTapLab.Entity.Users;

public record PopUpDTO2(String popupID,

		LocalDate ngay_tao,

		LocalDate han_su_dung,

		String hoat_dong,

		String trang_thai_xoa,

		Users users,

		List<PopupchitietDTO> popupchitiet

)

{

}
