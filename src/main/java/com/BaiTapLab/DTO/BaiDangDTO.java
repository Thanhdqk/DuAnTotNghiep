package com.BaiTapLab.DTO;

import java.time.LocalDate;

import com.BaiTapLab.Entity.BaiDang;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaiDangDTO {
	String ten_HanhDong;
	LocalDate ngay_HanhDong;
	BaiDang baidang;
}
