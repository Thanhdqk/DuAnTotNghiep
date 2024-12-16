package com.BaiTapLab.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
    public int id;
	
	private int soLuong;
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name = "giohang_id")
	public GioHang gioHang;
	
	@ManyToOne
	@JsonManagedReference
	@JoinColumn(name = "san_phamId")
	public SanPham sanpham;
}
