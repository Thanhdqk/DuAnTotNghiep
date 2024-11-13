package com.BaiTapLab.Entity;

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
@Table(name = "giohangchitiet")
public class GioHangChiTiet {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    public int gio_hangct_id;
	
	@ManyToOne
	@JoinColumn(name = "gio_hangid")
	public GioHang giohang;
	
	@ManyToOne
	@JoinColumn(name = "san_phamId")
	public SanPham sanpham;
}
