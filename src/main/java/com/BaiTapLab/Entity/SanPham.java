package com.BaiTapLab.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "sanpham")
public class SanPham {
	@Id
	public String san_phamId;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ten_san_pham;
	
	public LocalDate ngay_tao;
	
	public double gia_goc;
	
	public double gia_km;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String mo_ta;
	
	public int phantram_GG;
	
	public int so_luong;
	
	public LocalDate han_gg;
	
	public String trang_thai_kho;
	
	public int luot_mua;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String hoat_dong;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String phe_duyet;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String trang_thai_xoa;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String nhap_hang;
	
	public double chieu_cao;
	public double chieu_dai;
	public double chieu_rong;
	public double khoi_luong;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ghi_chu;
	
	@OneToMany(mappedBy = "sanpham", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<DonHangChiTiet> donhangchitiet;
	
	@OneToMany(mappedBy = "sanpham", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<DanhGia> danhgia;
	
	@OneToMany(mappedBy = "sanpham", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<PhuongthucTTChiTiet> phuongthucTTChitiet;
	
	@OneToMany(mappedBy = "sanpham", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<YeuThich> yeuthich;
	
	@OneToMany(mappedBy = "sanpham", cascade = CascadeType.ALL)
	@JsonManagedReference
	public List<HinhAnh> hinhanh;
	
	@OneToMany(mappedBy = "sanpham", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<NhaCungCapChiTiet> nhacungcapchitiet;
	
	@OneToMany(mappedBy = "sanpham", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<PhanHoiDanhGia> phanhoidanhgia;
	
	@ManyToOne
	@JoinColumn(name = "popupID")
	@JsonBackReference
	public Popup popup;
	
	@ManyToOne
	@JoinColumn(name = "accountID")
	public Users users;
	
	@ManyToOne
	@JoinColumn(name = "danh_mucId")
	public DanhMuc danhmuc;
	
	@ManyToOne
	@JoinColumn(name = "thuong_hieuID")
	public ThuongHieu thuonghieu;
}
