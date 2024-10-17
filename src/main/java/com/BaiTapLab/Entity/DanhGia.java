package com.BaiTapLab.Entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "danhgia")
public class DanhGia {
	@Id
	public String danh_giaID;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String noi_dung;
	
	public int so_sao;
	
	public String hinh_anh;
	
	public LocalDate ngay_tao;
	
	@ManyToOne
	public Users users;
	
	@ManyToOne
	public SanPham sanpham;
}