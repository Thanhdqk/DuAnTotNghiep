package com.BaiTapLab.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "nhapxuatsanpham")
public class NhapXuatSanPham {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int nhap_xuatid;

	@Column(columnDefinition = "NVARCHAR(255)")
	public String trang_thai_nhap;

	@Column(columnDefinition = "NVARCHAR(255)")
	public String trang_thai_xuat;

	public int so_luong;

	@ManyToOne
	@JoinColumn(name = "san_phamId")
	public SanPham sanpham;
}