package com.BaiTapLab.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "danhgia")
public class DanhGia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Specify auto-increment strategy
    public int danh_giaID; // Change type to int

    @Column(columnDefinition = "NVARCHAR(255)")
    public String noi_dung;

    public int so_sao;

    public String hinh_anh;

    public LocalDate ngay_tao;

    @OneToMany(mappedBy = "danhgia", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<PhanHoiDanhGia> phanhoidanhgia;

    @ManyToOne
    @JoinColumn(name = "accountID")
    public Users users;

    @ManyToOne
    @JoinColumn(name = "san_phamId")
    public SanPham sanpham;

	public int getDanh_giaID() {
		return danh_giaID;
	}

	public void setDanh_giaID(int danh_giaID) {
		this.danh_giaID = danh_giaID;
	}

	public String getNoi_dung() {
		return noi_dung;
	}

	public void setNoi_dung(String noi_dung) {
		this.noi_dung = noi_dung;
	}

	public int getSo_sao() {
		return so_sao;
	}

	public void setSo_sao(int so_sao) {
		this.so_sao = so_sao;
	}

	public String getHinh_anh() {
		return hinh_anh;
	}

	public void setHinh_anh(String hinh_anh) {
		this.hinh_anh = hinh_anh;
	}

	public LocalDate getNgay_tao() {
		return ngay_tao;
	}

	public void setNgay_tao(LocalDate ngay_tao) {
		this.ngay_tao = ngay_tao;
	}

	public List<PhanHoiDanhGia> getPhanhoidanhgia() {
		return phanhoidanhgia;
	}

	public void setPhanhoidanhgia(List<PhanHoiDanhGia> phanhoidanhgia) {
		this.phanhoidanhgia = phanhoidanhgia;
	}

	public Users getUsers() {
		return users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

	public SanPham getSanpham() {
		return sanpham;
	}

	public void setSanpham(SanPham sanpham) {
		this.sanpham = sanpham;
	}
    
}
