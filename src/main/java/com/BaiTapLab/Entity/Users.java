package com.BaiTapLab.Entity;

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

@Data
@Entity
@Table(name = "users")

public class Users {
	@Id
	public String accountID; // tôi muốn cái này nhập bằng email nhưng vẫn để nguyên là accountID

	public String password;

	@Column(columnDefinition = "NVARCHAR(255)")
	public String hovaten;

	public String hinh_anh;

	public String so_dien_thoai;
	public String trang_thai_xoa;
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

	public String getAccountID() {
		return accountID;
	}

	public void setAccountID(String accountID) {
		this.accountID = accountID;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getHovaten() {
		return hovaten;
	}

	public void setHovaten(String hovaten) {
		this.hovaten = hovaten;
	}

	public String getHinh_anh() {
		return hinh_anh;
	}

	public void setHinh_anh(String hinh_anh) {
		this.hinh_anh = hinh_anh;
	}

	public String getSo_dien_thoai() {
		return so_dien_thoai;
	}

	public void setSo_dien_thoai(String so_dien_thoai) {
		this.so_dien_thoai = so_dien_thoai;
	}

	public String getHoat_dong() {
		return hoat_dong;
	}

	public void setHoat_dong(String hoat_dong) {
		this.hoat_dong = hoat_dong;
	}

	public String getVi_pham() {
		return vi_pham;
	}

	public void setVi_pham(String vi_pham) {
		this.vi_pham = vi_pham;
	}

	public List<Roles> getRoles() {
		return roles;
	}

	public void setRoles(List<Roles> roles) {
		this.roles = roles;
	}

	public List<DonHang> getDonhang() {
		return donhang;
	}

	public void setDonhang(List<DonHang> donhang) {
		this.donhang = donhang;
	}

	public List<DanhMuc> getDanhmuc() {
		return danhmuc;
	}

	public void setDanhmuc(List<DanhMuc> danhmuc) {
		this.danhmuc = danhmuc;
	}

	public List<SanPham> getSanpham() {
		return sanpham;
	}

	public void setSanpham(List<SanPham> sanpham) {
		this.sanpham = sanpham;
	}

	public List<Popup> getPopup() {
		return popup;
	}

	public void setPopup(List<Popup> popup) {
		this.popup = popup;
	}

	public List<Respone> getRespone() {
		return respone;
	}

	public void setRespone(List<Respone> respone) {
		this.respone = respone;
	}

	public List<Feedback> getFeedback() {
		return feedback;
	}

	public void setFeedback(List<Feedback> feedback) {
		this.feedback = feedback;
	}

	public List<LichSuTimKiem> getLichsutimkiem() {
		return lichsutimkiem;
	}

	public void setLichsutimkiem(List<LichSuTimKiem> lichsutimkiem) {
		this.lichsutimkiem = lichsutimkiem;
	}

	public List<DanhGia> getDanhgia() {
		return danhgia;
	}

	public void setDanhgia(List<DanhGia> danhgia) {
		this.danhgia = danhgia;
	}

	public List<PhuongThucTT> getPhuongthucTT() {
		return phuongthucTT;
	}

	public void setPhuongthucTT(List<PhuongThucTT> phuongthucTT) {
		this.phuongthucTT = phuongthucTT;
	}

	public List<VoucherDetail> getVoucherDetail() {
		return voucherDetail;
	}

	public void setVoucherDetail(List<VoucherDetail> voucherDetail) {
		this.voucherDetail = voucherDetail;
	}

	public List<YeuThich> getYeuthich() {
		return yeuthich;
	}

	public void setYeuthich(List<YeuThich> yeuthich) {
		this.yeuthich = yeuthich;
	}

	public List<NhaCungCap> getNhacungcap() {
		return nhacungcap;
	}

	public void setNhacungcap(List<NhaCungCap> nhacungcap) {
		this.nhacungcap = nhacungcap;
	}

	public List<BaiDang> getBaidang() {
		return baidang;
	}

	public void setBaidang(List<BaiDang> baidang) {
		this.baidang = baidang;
	}

	public List<PhanHoiDanhGia> getPhanhoidanhgia() {
		return phanhoidanhgia;
	}

	public void setPhanhoidanhgia(List<PhanHoiDanhGia> phanhoidanhgia) {
		this.phanhoidanhgia = phanhoidanhgia;
	}

	public List<DiaChi> getDiachi() {
		return diachi;
	}

	public void setDiachi(List<DiaChi> diachi) {
		this.diachi = diachi;
	}

	public List<Banner> getBanner() {
		return banner;
	}

	public void setBanner(List<Banner> banner) {
		this.banner = banner;
	}

	public List<ThuongHieu> getThuonghieu() {
		return thuonghieu;
	}

	public void setThuonghieu(List<ThuongHieu> thuonghieu) {
		this.thuonghieu = thuonghieu;
	}

	public String getTrang_thai_xoa() {
		return trang_thai_xoa;
	}

	public void setTrang_thai_xoa(String trang_thai_xoa) {
		this.trang_thai_xoa = trang_thai_xoa;
	}

}
