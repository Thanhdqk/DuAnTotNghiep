package com.BaiTapLab.DTO;

import java.time.LocalDate;

import com.BaiTapLab.Entity.ThuongHieu;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThuongHieuDTO {
	String ten_HanhDong;
	LocalDate ngay_HanhDong;
	ThuongHieu thuonghieu;
}
