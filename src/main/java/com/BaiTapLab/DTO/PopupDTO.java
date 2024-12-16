package com.BaiTapLab.DTO;

import java.time.LocalDate;

import com.BaiTapLab.Entity.Popup;
import com.BaiTapLab.Entity.Users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PopupDTO {
	private String tenHanhDong;
	
	private LocalDate ngay_tao;
	
	private Users users;

	private Popup popup;
}