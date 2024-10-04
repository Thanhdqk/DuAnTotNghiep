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
@Table(name = "donhang")
public class DonHang {
	@Id
	public String don_hangID;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String trang_thai;
	
	public Instant ngay_tao;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String dia_chi;
	
	
	public String so_dien_thoai;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ghi_chu;
	
	@ManyToOne
	@JoinColumn(name = "accountID", nullable = false)
	public Users users;
	
	@ManyToOne
	@JoinColumn(name = "ten_cua_hang")
	public CuaHang cuahang;
}
