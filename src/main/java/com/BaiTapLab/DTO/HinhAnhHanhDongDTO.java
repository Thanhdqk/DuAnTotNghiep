package com.BaiTapLab.DTO;

import java.time.LocalDate;
import java.util.List;

import com.BaiTapLab.Entity.SanPham;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HinhAnhHanhDongDTO {

	private String tenSanPham;
	private String tenHinh;
	private LocalDate ngayHanhDong;
	private String tenHanhDong;
}