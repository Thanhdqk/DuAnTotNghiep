package com.BaiTapLab.Entity;


import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "voucher")
public class Voucher {
	@Id
	public String voucherID;
	public double so_tien_giam;
	public String hinh_anh;
	public Instant han_su_dung;
	public int so_luotSD;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String phuong_thuc_TT;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String dieu_kien;
	
	@ManyToOne
	@JoinColumn(name = "ten_cua_hang")
	public CuaHang cuahang;
}
