package com.BaiTapLab.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
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
	
	public String so_dien_thoai;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String hoat_dong;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String vi_pham;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String trang_thai_xoa;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String hanh_dong;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JsonIgnore
    private List<Roles> roles;  
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<DonHang> donhang;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<DanhMuc> danhmuc;
	
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
	public List<DanhGia> danhgia;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<PhuongThucTT> phuongthucTT;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<VoucherDetail> voucherDetail;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	//@JsonIgnore
	@JsonBackReference
	public List<YeuThich> yeuthich;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<NhaCungCap> nhacungcap;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	//@JsonIgnore
	@JsonBackReference
	public List<BaiDang> baidang;

	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<PhanHoiDanhGia> phanhoidanhgia;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	//@JsonIgnore
	@JsonBackReference
	public List<DiaChi> diachi;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<Banner> banner;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<ThuongHieu> thuonghieu;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	//@JsonIgnore
	@JsonBackReference
	public List<GioHang> giohang;
	
//	@Override
//	public String toString() {
//	    return "Users{" +
//	            "accountID='" + accountID + '\'' +
//	            ", password='" + password + '\'' +
//	            ", hovaten='" + hovaten + '\'' +
//	            ", hinh_anh='" + hinh_anh + '\'' +
//	            ", so_dien_thoai='" + so_dien_thoai + '\'' +
//	            ", hoat_dong='" + hoat_dong + '\'' +
//	            ", vi_pham='" + vi_pham + '\'' +
//	            '}';
//	}

}
