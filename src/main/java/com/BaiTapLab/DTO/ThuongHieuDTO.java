package com.BaiTapLab.DTO;


import com.BaiTapLab.Entity.ThuongHieu;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThuongHieuDTO {
	String ten_HanhDong;
	ThuongHieu thuonghieu;
}
