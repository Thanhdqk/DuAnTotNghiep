package com.BaiTapLab.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
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
@Table(name = "yeuthich")
public class YeuThich {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
    public int yeu_thichID;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ten_san_pham;
	
	public LocalDate ngay_tao;
	
	@ManyToOne
	@JoinColumn(name = "accountID")
	@JsonManagedReference
	
	public Users users;
	
	@ManyToOne
	@JoinColumn(name = "san_phamId")
	@JsonManagedReference
	
	public SanPham sanpham;
}