package com.BaiTapLab.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")
public class Users {
	@Id
	public String accountID;
	
	public String password;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String hovaten;
	
	public String hinh_anh;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String vai_tro;
	
	public String so_dien_thoai;
	public String email;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String dia_chi;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String vi_pham;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<DonHang> donhang;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<SanPham> sanpham;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<Popup> popup;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<Respone> respone;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<Feedback> feedback;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<LichSuTimKiem> lichsutimkiem;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<DanhGia> danhgia;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<PhuongThucTT> phuongthucTT;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<VoucherDetail> voucherDetail;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<YeuThich> yeuthich;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<NhaCungCap> nhacungcap;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<BaiDang> baidang;
}
