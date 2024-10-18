package com.BaiTapLab.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "voucher")
public class Voucher {
	@Id
	public String voucherID;
	
	public String so_tien_giam;
	
	public String hinh_anh;
	
	public LocalDate han_su_dung;
	
	public int so_luot_SD;
	
	public int so_luong;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String phuong_thucTT;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String dieu_kien;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String hoat_dong;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String phe_duyet;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ghi_chu;
	
	@OneToMany(mappedBy = "voucher", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<DonHang> donhang;
	
	@OneToMany(mappedBy = "voucher", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<VoucherDetail> voucherdetail;
	
	@ManyToOne
	@JoinColumn(name = "san_phamId")
	public SanPham sanpham;
	
	@ManyToOne
	@JoinColumn(name = "accountID")
	public Users users;
}
