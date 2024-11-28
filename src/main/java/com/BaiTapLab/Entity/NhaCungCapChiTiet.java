package com.BaiTapLab.Entity;

import java.time.LocalDate;

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
@Table(name = "nhacungcapchitiet")
public class NhaCungCapChiTiet {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    public int id;
	
	@ManyToOne
	@JoinColumn(name = "nha_cung_capID")
	public NhaCungCap nhacungcap;
	
	@ManyToOne
	@JoinColumn(name = "san_phamId")
	public SanPham sanpham;
}
