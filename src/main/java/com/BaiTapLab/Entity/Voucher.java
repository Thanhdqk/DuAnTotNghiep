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
	public String dieu_kien;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String hoat_dong;
	
	@OneToMany(mappedBy = "voucher", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<DonHang> donhang;
	
	@OneToMany(mappedBy = "voucher", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<VoucherDetail> voucherdetail;

	public String getVoucherID() {
		return voucherID;
	}

	public void setVoucherID(String voucherID) {
		this.voucherID = voucherID;
	}

	public String getSo_tien_giam() {
		return so_tien_giam;
	}

	public void setSo_tien_giam(String so_tien_giam) {
		this.so_tien_giam = so_tien_giam;
	}

	public String getHinh_anh() {
		return hinh_anh;
	}

	public void setHinh_anh(String hinh_anh) {
		this.hinh_anh = hinh_anh;
	}

	public LocalDate getHan_su_dung() {
		return han_su_dung;
	}

	public void setHan_su_dung(LocalDate han_su_dung) {
		this.han_su_dung = han_su_dung;
	}

	public int getSo_luot_SD() {
		return so_luot_SD;
	}

	public void setSo_luot_SD(int so_luot_SD) {
		this.so_luot_SD = so_luot_SD;
	}

	public int getSo_luong() {
		return so_luong;
	}

	public void setSo_luong(int so_luong) {
		this.so_luong = so_luong;
	}

	public String getDieu_kien() {
		return dieu_kien;
	}

	public void setDieu_kien(String dieu_kien) {
		this.dieu_kien = dieu_kien;
	}

	public String getHoat_dong() {
		return hoat_dong;
	}

	public void setHoat_dong(String hoat_dong) {
		this.hoat_dong = hoat_dong;
	}

	public List<DonHang> getDonhang() {
		return donhang;
	}

	public void setDonhang(List<DonHang> donhang) {
		this.donhang = donhang;
	}

	public List<VoucherDetail> getVoucherdetail() {
		return voucherdetail;
	}

	public void setVoucherdetail(List<VoucherDetail> voucherdetail) {
		this.voucherdetail = voucherdetail;
	}
	
}
