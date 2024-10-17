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
@Table(name = "donhangchitiet")
public class DonHangChiTiet {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    public int id;
	
	
	public int so_luong;
	public double tong_tien;
	
	@ManyToOne
	public DonHang donhang;
	
	@ManyToOne
	public Users users;
}
