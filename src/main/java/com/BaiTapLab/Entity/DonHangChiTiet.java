package com.BaiTapLab.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "donhangchitiet")
public class DonHangChiTiet {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    public int id;
	
	
	public int so_luong;
	public double tong_tien;
	
	@ManyToOne
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@JoinColumn(name = "don_hangid")
	public DonHang donhang;
	
	@ManyToOne
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@JoinColumn(name = "san_phamId")
	public SanPham sanpham;
}
