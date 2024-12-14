package com.BaiTapLab.DTO;

import java.time.LocalDate;

import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Entity.Users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SanPhamDTO {
	private String tenHanhDong;
	
	private LocalDate ngay_tao;
	
	private Users users;

	private SanPham sanpham;
	
}
