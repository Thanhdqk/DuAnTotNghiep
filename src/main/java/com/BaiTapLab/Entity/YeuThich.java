package com.BaiTapLab.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "yeuthich")
public class YeuThich {
	@Id
	public String yeu_thichID;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ten_san_pham;
	
	public LocalDate ngay_tao;
	
	@ManyToOne
	public Users users;
	
	@ManyToOne
	public SanPham sanpham;
}
