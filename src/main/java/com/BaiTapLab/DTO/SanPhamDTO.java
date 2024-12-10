package com.BaiTapLab.DTO;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class SanPhamDTO {
	public String san_phamId;
	
	public String ten_san_pham;
	
	public LocalDate ngay_tao;
	
	public double gia_goc;
	
	public double gia_km;
	
	public LocalDate han_gg;
	
	public int luot_mua;
	
	public String mo_ta;
	
	public int phantram_GG;
	
	public int so_luong;
	
	public String trang_thai_kho;
	
	public String hoat_dong;
	
	public String phe_duyet;
	
	public String trang_thai_xoa;
	
	public double tien_nhap_hang;
	
	public double chieu_cao;
	public double chieu_dai;
	public double chieu_rong;
	public double khoi_luong;
	
	public String nhap_hang;
	
	
	public SanPhamDTO() {
		super();
	}


	public SanPhamDTO(String san_phamId, String ten_san_pham, LocalDate ngay_tao, double gia_goc, double gia_km,
			LocalDate han_gg, int luot_mua, String mo_ta, int phantram_GG, int so_luong, String trang_thai_kho,
			String hoat_dong, String phe_duyet, String trang_thai_xoa, double tien_nhap_hang, double chieu_cao,
			double chieu_dai, double chieu_rong, double khoi_luong, String nhap_hang) {
		super();
		this.san_phamId = san_phamId;
		this.ten_san_pham = ten_san_pham;
		this.ngay_tao = ngay_tao;
		this.gia_goc = gia_goc;
		this.gia_km = gia_km;
		this.han_gg = han_gg;
		this.luot_mua = luot_mua;
		this.mo_ta = mo_ta;
		this.phantram_GG = phantram_GG;
		this.so_luong = so_luong;
		this.trang_thai_kho = trang_thai_kho;
		this.hoat_dong = hoat_dong;
		this.phe_duyet = phe_duyet;
		this.trang_thai_xoa = trang_thai_xoa;
		this.tien_nhap_hang = tien_nhap_hang;
		this.chieu_cao = chieu_cao;
		this.chieu_dai = chieu_dai;
		this.chieu_rong = chieu_rong;
		this.khoi_luong = khoi_luong;
		this.nhap_hang = nhap_hang;
	}


	public String getSan_phamId() {
		return san_phamId;
	}


	public void setSan_phamId(String san_phamId) {
		this.san_phamId = san_phamId;
	}


	public String getTen_san_pham() {
		return ten_san_pham;
	}


	public void setTen_san_pham(String ten_san_pham) {
		this.ten_san_pham = ten_san_pham;
	}


	public LocalDate getNgay_tao() {
		return ngay_tao;
	}


	public void setNgay_tao(LocalDate ngay_tao) {
		this.ngay_tao = ngay_tao;
	}


	public double getGia_goc() {
		return gia_goc;
	}


	public void setGia_goc(double gia_goc) {
		this.gia_goc = gia_goc;
	}


	public double getGia_km() {
		return gia_km;
	}


	public void setGia_km(double gia_km) {
		this.gia_km = gia_km;
	}


	public LocalDate getHan_gg() {
		return han_gg;
	}


	public void setHan_gg(LocalDate han_gg) {
		this.han_gg = han_gg;
	}


	public int getLuot_mua() {
		return luot_mua;
	}


	public void setLuot_mua(int luot_mua) {
		this.luot_mua = luot_mua;
	}


	public String getMo_ta() {
		return mo_ta;
	}


	public void setMo_ta(String mo_ta) {
		this.mo_ta = mo_ta;
	}


	public int getPhantram_GG() {
		return phantram_GG;
	}


	public void setPhantram_GG(int phantram_GG) {
		this.phantram_GG = phantram_GG;
	}


	public int getSo_luong() {
		return so_luong;
	}


	public void setSo_luong(int so_luong) {
		this.so_luong = so_luong;
	}


	public String getTrang_thai_kho() {
		return trang_thai_kho;
	}


	public void setTrang_thai_kho(String trang_thai_kho) {
		this.trang_thai_kho = trang_thai_kho;
	}


	public String getHoat_dong() {
		return hoat_dong;
	}


	public void setHoat_dong(String hoat_dong) {
		this.hoat_dong = hoat_dong;
	}


	public String getPhe_duyet() {
		return phe_duyet;
	}


	public void setPhe_duyet(String phe_duyet) {
		this.phe_duyet = phe_duyet;
	}


	public String getTrang_thai_xoa() {
		return trang_thai_xoa;
	}


	public void setTrang_thai_xoa(String trang_thai_xoa) {
		this.trang_thai_xoa = trang_thai_xoa;
	}


	public double getTien_nhap_hang() {
		return tien_nhap_hang;
	}


	public void setTien_nhap_hang(double tien_nhap_hang) {
		this.tien_nhap_hang = tien_nhap_hang;
	}


	public double getChieu_cao() {
		return chieu_cao;
	}


	public void setChieu_cao(double chieu_cao) {
		this.chieu_cao = chieu_cao;
	}


	public double getChieu_dai() {
		return chieu_dai;
	}


	public void setChieu_dai(double chieu_dai) {
		this.chieu_dai = chieu_dai;
	}


	public double getChieu_rong() {
		return chieu_rong;
	}


	public void setChieu_rong(double chieu_rong) {
		this.chieu_rong = chieu_rong;
	}


	public double getKhoi_luong() {
		return khoi_luong;
	}


	public void setKhoi_luong(double khoi_luong) {
		this.khoi_luong = khoi_luong;
	}


	public String getNhap_hang() {
		return nhap_hang;
	}


	public void setNhap_hang(String nhap_hang) {
		this.nhap_hang = nhap_hang;
	}

	
	
	
}
