package com.BaiTapLab.Entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "phanhoidanhgia")
public class PhanHoiDanhGia {
	@Id
	public String phan_hoiID;
	
	public String noi_dung;
	
	public LocalDate ngay_tao;
	
	@ManyToOne
	@JoinColumn(name = "accountID")
	public Users users;
	
	@ManyToOne
	@JoinColumn(name = "san_phamId")
	public SanPham sanpham;
	
	@ManyToOne
	@JoinColumn(name = "danh_giaID")
	 @JsonBackReference
	public DanhGia danhgia;
	
}
