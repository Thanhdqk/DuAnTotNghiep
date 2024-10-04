package com.BaiTapLab.Entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "donhang")
public class DonHang {
	@Id
	public String don_hangID;
	public String trang_thai;
	public String ngay_tao;
	public String dia_chi;
	public String so_dien_thoai;
	public String ghi_chu;
	
	@ManyToOne
	@JoinColumn(name = "accountID", nullable = false)
	public Users users;
	
	@ManyToOne
	@JoinColumn(name = "ten_cua_hang")
	public CuaHang cuahang;
}
