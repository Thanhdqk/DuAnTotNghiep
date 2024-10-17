package com.BaiTapLab.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "thuonghieuchitiet")
public class ThuongHieuChiTiet {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    public int id;
	
	public int so_luong;
	
	@ManyToOne
	public ThuongHieu thuonghieu;
	
	@ManyToOne
	public SanPham sanpham;
}
