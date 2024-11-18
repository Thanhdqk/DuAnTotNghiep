package com.BaiTapLab.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
public class Users {
	@Id
	public String accountID;
	
	public String password;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String hovaten;
	
	public String hinh_anh;
	
	public String so_dien_thoai;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String hoat_dong;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String vi_pham;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String trang_thai_xoa;
	

	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JsonIgnore
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private List<Roles> roles;  
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @JsonIgnore
    private List<DonHang> donhang;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @JsonIgnore
    private List<DanhMuc> danhmuc;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@JsonIgnore
	public List<SanPham> sanpham;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@JsonIgnore
	public List<Popup> popup;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@JsonIgnore
	public List<Respone> respone;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@JsonIgnore
	public List<Feedback> feedback;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@JsonIgnore
	public List<DanhGia> danhgia;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@JsonIgnore
	public List<PhuongThucTT> phuongthucTT;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@JsonIgnore
	public List<VoucherDetail> voucherDetail;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	//@JsonIgnore
	@JsonBackReference
	public List<YeuThich> yeuthich;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@JsonIgnore
	public List<NhaCungCap> nhacungcap;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@JsonBackReference
	public List<BaiDang> baidang;

	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@JsonIgnore
	public List<PhanHoiDanhGia> phanhoidanhgia;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@JsonBackReference
	public List<DiaChi> diachi;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@JsonIgnore
	public List<Banner> banner;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@JsonIgnore
	public List<ThuongHieu> thuonghieu;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@JsonBackReference
	public List<GioHang> giohang;
	


}
