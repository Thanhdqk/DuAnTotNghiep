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
@Table(name = "donhangchitiet")
public class DonHangChiTiet {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;
	
	@ManyToOne
	@JoinColumn(name = "don_hangID", nullable = false)
	public DonHang donhang;
	
	@ManyToOne
	@JoinColumn(name = "mon_anID")
	public MonAn monan;
	
	public int so_luong;
	public double tong_tien;
}
