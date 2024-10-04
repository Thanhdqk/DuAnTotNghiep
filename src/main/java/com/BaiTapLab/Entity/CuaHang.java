package com.BaiTapLab.Entity;



import java.time.Instant;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "cuahang")
public class CuaHang {
	@Id
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ten_cua_hang;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String nguoi_dai_dien;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String thanh_pho;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String quan;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String dia_chi;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String mon_anKD;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String loai_hinhKD;
	
	public String so_dien_thoai;
	public String email;
	public String gio_hoat_dong;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String trang_thai;
	
	public Instant ngay_tao;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "accountID")
	public Users users;
}
