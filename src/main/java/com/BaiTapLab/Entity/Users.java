package com.BaiTapLab.Entity;

<<<<<<< HEAD

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@jakarta.persistence.Entity
@Table(name = "users")
public class Users {
    @Id
    private String accountID;

    
    private String password;

    @Column(columnDefinition = "NVARCHAR(255)")
    private String hovaten;

    private String hinh_anh;

    @Column(columnDefinition = "NVARCHAR(255)")
    private String vai_tro;

    private String so_dien_thoai;
    private String email;

    @Column(columnDefinition = "NVARCHAR(255)")
    private String dia_chi;
=======
import java.util.List;



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
	public String email;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String hoat_dong;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String vi_pham;
	
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

	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<PhanHoiDanhGia> phanhoidanhgia;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<DiaChi> diachi;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<Banner> banner;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<ThuongHieu> thuonghieu;
>>>>>>> refs/heads/backend
}
