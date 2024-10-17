package com.BaiTapLab.Entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "danhmucchitiet")
public class DanhMucChiTiet {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    public int id;
	
	public int so_luongSP;
	
	@ManyToOne
	public DanhMuc danhmuc;
	
	@ManyToOne
	public SanPham sanpham;
	
	
}
