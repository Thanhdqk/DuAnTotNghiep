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
@Table(name = "phuongthucTTchitiet")
public class PhuongthucTTChiTiet {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    public int id;
	
	@ManyToOne
	public PhuongThucTT phuongthucTT;
	
	@ManyToOne
	public SanPham sanpham;
}
