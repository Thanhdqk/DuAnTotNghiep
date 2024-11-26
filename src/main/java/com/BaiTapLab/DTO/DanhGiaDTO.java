package com.BaiTapLab.DTO;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DanhGiaDTO {
    public int danh_giaID;
	
	public String noi_dung;
	
	public int so_sao;
	
	public String hinh_anh;
	
	public LocalDate ngay_tao;
	
	public String trang_thaiPH;
	
	public String accountID;
	
	public String san_phamId;

	public DanhGiaDTO(int danh_giaID, String noi_dung, int so_sao, String hinh_anh, LocalDate ngay_tao,
			String trang_thaiPH, String accountID, String san_phamId) {
		super();
		this.danh_giaID = danh_giaID;
		this.noi_dung = noi_dung;
		this.so_sao = so_sao;
		this.hinh_anh = hinh_anh;
		this.ngay_tao = ngay_tao;
		this.trang_thaiPH = trang_thaiPH;
		this.accountID = accountID;
		this.san_phamId = san_phamId;
	}
	
	
}
