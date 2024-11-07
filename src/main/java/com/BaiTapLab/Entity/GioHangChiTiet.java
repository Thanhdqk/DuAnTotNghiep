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
	    private int id;
	
	    private int soLuong;

	    @ManyToOne
	    @JoinColumn(name = "giohang_id")
	    @JsonBackReference
	    private GioHang gioHang;

	    @ManyToOne
	    @JoinColumn(name = "sanpham_id")
	    @JsonManagedReference
	    private SanPham sanPham;
	}
