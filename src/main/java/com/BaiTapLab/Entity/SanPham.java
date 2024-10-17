package com.BaiTapLab.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "sanpham")
public class SanPham {
	@Id
	public String san_phamId;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ten_san_pham;
	
	public LocalDate ngay_tao;
	
	public double gia_goc;
	
	public double gia_km;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String mo_ta;
	
	public int phantram_GG;
	
	public LocalDate han_gg;
	
	public String trang_thai_kho;
	
	public int luot_xem;
	
	public int luot_mua;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String hoat_dong;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String phe_duyet;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String yeu_cau;
	
	public double chieu_cao;
	public double chieu_dai;
	public double chieu_rong;
	public double khoi_luong;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ghi_chu;
	
	@ManyToOne
	@JoinColumn(name = "accountID")
	public Users users;
}
