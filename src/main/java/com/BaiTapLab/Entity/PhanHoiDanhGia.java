package com.BaiTapLab.Entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
@Table(name = "phanhoidanhgia")
public class PhanHoiDanhGia {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	public int id;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String noi_dung;
	
	public LocalDate ngay_tao;
	
	@ManyToOne
	@JoinColumn(name = "accountID")
	public Users users;
	
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "san_phamId")
	public SanPham sanpham;
	
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "danh_giaID")
	public DanhGia danhgia;
	
}
