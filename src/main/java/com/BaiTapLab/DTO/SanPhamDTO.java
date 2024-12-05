package com.BaiTapLab.DTO;

import com.BaiTapLab.Entity.SanPham;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SanPhamDTO {
	private String tenHanhDong;

	private SanPham sanpham;
}
