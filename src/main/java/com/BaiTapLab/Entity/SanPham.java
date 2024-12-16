package com.BaiTapLab.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

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
	
	public LocalDate han_su_dung;
	
	@Column(columnDefinition = "NVARCHAR(255)")
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
	
	public double tien_nhap_hang;
	
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
	//@JsonIgnore
	@JsonManagedReference
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	public List<DanhGia> danhgia;
	
	@OneToMany(mappedBy = "sanpham", cascade = CascadeType.ALL)
	//@JsonIgnore
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@JsonBackReference(value = "yeuthich-reference")
	public List<YeuThich> yeuthich;
	
	@OneToMany(mappedBy = "sanpham", cascade = CascadeType.ALL)
	//@JsonIgnore
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@JsonManagedReference
	public List<HinhAnh> hinhanh;
	
	@OneToMany(mappedBy = "sanpham", cascade = CascadeType.ALL)
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@JsonIgnore
	public List<NhaCungCapChiTiet> nhacungcapchitiet;
	
	@OneToMany(mappedBy = "sanpham", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<NhapXuatSanPham> nhapxuatsanpham;
	
	@OneToMany(mappedBy = "sanpham", cascade = CascadeType.ALL)
	//@JsonIgnore
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@JsonManagedReference
	public List<PhanHoiDanhGia> phanhoidanhgia;
	
//	@OneToMany(mappedBy = "sanpham", cascade = CascadeType.ALL)
//	//@JsonIgnore
//	@JsonBackReference(value = "giohang-reference")
//	public List<GioHang> giohang;
	
	@OneToMany(mappedBy = "sanpham", cascade = CascadeType.ALL)
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	//@JsonIgnore
	@JsonBackReference
	public List<GioHangChiTiet> giohangchitiet;
	
	@OneToMany(mappedBy = "sanpham", cascade = CascadeType.ALL)
	//@JsonIgnore
	@JsonBackReference
	public List<PopupChiTiet> popupchitiet;
	
//	@ManyToOne
//	@JoinColumn(name = "popupID")
//	@JsonBackReference(value = "popup-reference")
//	public Popup popup;

	@ManyToOne
	@JsonManagedReference
	@JoinColumn(name = "accountID")
	public Users users;
	
	@ManyToOne
	@JoinColumn(name = "danh_mucId")
	public DanhMuc danhmuc;
	
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "thuong_hieuID")
	public ThuongHieu thuonghieu;
	
	@Override
	public String toString() {
	    return "SanPham{" +
	            "san_phamId='" + san_phamId + '\'' +
	            ", ten_san_pham='" + ten_san_pham + '\'' +
	            ", ngay_tao=" + ngay_tao +
	            ", gia_goc=" + gia_goc +
	            ", gia_km=" + gia_km +
	            ", mo_ta='" + mo_ta + '\'' +
	            ", phantram_GG=" + phantram_GG +
	            ", so_luong=" + so_luong +
	            ", han_gg=" + han_gg +
	            ", trang_thai_kho='" + trang_thai_kho + '\'' +
	            ", luot_mua=" + luot_mua +
	            ", hoat_dong='" + hoat_dong + '\'' +
	            ", phe_duyet='" + phe_duyet + '\'' +
	            ", trang_thai_xoa='" + trang_thai_xoa + '\'' +
	            ", nhap_hang='" + nhap_hang + '\'' +
	            ", tien_nhap_hang=" + tien_nhap_hang +
	            ", chieu_cao=" + chieu_cao +
	            ", chieu_dai=" + chieu_dai +
	            ", chieu_rong=" + chieu_rong +
	            ", khoi_luong=" + khoi_luong +
	            ", ghi_chu='" + ghi_chu + '\'' +
	            '}';
	}

}
