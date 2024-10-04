package com.BaiTapLab.Entity;



import jakarta.persistence.CascadeType;
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
	public String ten_cua_hang;
	public String nguoi_dai_dien;
	public String thanh_pho;
	public String quan;
	public String dia_chi;
	public String mon_anKD;
	public String loai_hinhKD;
	public String so_dien_thoai;
	public String email;
	public String gio_hoat_dong;
	public String trang_thai;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "accountID")
	public Users users;
}
