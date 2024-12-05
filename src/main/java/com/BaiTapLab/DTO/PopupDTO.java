package com.BaiTapLab.DTO;

import com.BaiTapLab.Entity.Popup;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PopupDTO {
	private String tenHanhDong;

	private Popup popup;
}
