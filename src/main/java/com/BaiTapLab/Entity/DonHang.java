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
@Table(name = "donhang")
public class DonHang {
	@Id
	public String don_hangid;

	@Column(columnDefinition = "NVARCHAR(255)")
	public String trang_thai;

	public LocalDate ngay_tao;

	public LocalDate thoi_gianXN;

	public String so_dien_thoai;

	@Column(columnDefinition = "NVARCHAR(255)")
	public String ghi_chu;
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ly_do;
	public double phi_ship;
	public double tong_tien;
	@OneToMany(mappedBy = "donhang", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<DonHangChiTiet> donhangchitiet;

	@ManyToOne
	@JoinColumn(name = "accountID")
	public Users users;

	@ManyToOne
	@JoinColumn(name = "voucherID")
	public Voucher voucher;

	@ManyToOne
	@JoinColumn(name = "dia_chiID")
	public DiaChi diachi;

	public String getDon_hangid() {
		return don_hangid;
	}

	public void setDon_hangid(String don_hangid) {
		this.don_hangid = don_hangid;
	}

	public String getTrang_thai() {
		return trang_thai;
	}

	public void setTrang_thai(String trang_thai) {
		this.trang_thai = trang_thai;
	}

	public LocalDate getNgay_tao() {
		return ngay_tao;
	}

	public void setNgay_tao(LocalDate ngay_tao) {
		this.ngay_tao = ngay_tao;
	}

	public LocalDate getThoi_gianXN() {
		return thoi_gianXN;
	}

	public void setThoi_gianXN(LocalDate thoi_gianXN) {
		this.thoi_gianXN = thoi_gianXN;
	}

	public String getSo_dien_thoai() {
		return so_dien_thoai;
	}

	public void setSo_dien_thoai(String so_dien_thoai) {
		this.so_dien_thoai = so_dien_thoai;
	}

	public String getGhi_chu() {
		return ghi_chu;
	}

	public void setGhi_chu(String ghi_chu) {
		this.ghi_chu = ghi_chu;
	}

	public double getPhi_ship() {
		return phi_ship;
	}

	public void setPhi_ship(double phi_ship) {
		this.phi_ship = phi_ship;
	}

	public double getTong_tien() {
		return tong_tien;
	}

	public void setTong_tien(double tong_tien) {
		this.tong_tien = tong_tien;
	}

	public List<DonHangChiTiet> getDonhangchitiet() {
		return donhangchitiet;
	}

	public void setDonhangchitiet(List<DonHangChiTiet> donhangchitiet) {
		this.donhangchitiet = donhangchitiet;
	}

	public Users getUsers() {
		return users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

	public Voucher getVoucher() {
		return voucher;
	}

	public void setVoucher(Voucher voucher) {
		this.voucher = voucher;
	}

	public DiaChi getDiachi() {
		return diachi;
	}

	public void setDiachi(DiaChi diachi) {
		this.diachi = diachi;
	}

	public String getLy_do() {
		return ly_do;
	}

	public void setLy_do(String ly_do) {
		this.ly_do = ly_do;
	}

}
