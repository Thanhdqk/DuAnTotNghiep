package com.BaiTapLab.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;

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
@Table(name = "donhangchitiet")
public class DonHangChiTiet {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    public int id;
	
	
	public int so_luong;
	public double tong_tien;

	@ManyToOne
	@JoinColumn(name = "don_hangid")
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	public DonHang donhang;
	
	@ManyToOne
	@JoinColumn(name = "san_phamId")
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	public SanPham sanpham;
}
