package com.BaiTapLab.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "popup")
public class Popup {
	@Id
	public String popupID;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ten_san_pham;
	
	public double gia_cu;
	
	public double gia_moi;
	
	public int phan_tramGG;
	
	public String hinh_anh;
	
	public LocalDate ngay_tao;
	
	public LocalDate han_su_dung;
	
	@OneToMany(mappedBy = "popup", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<SanPham> sanpham;
	
	@ManyToOne
	@JoinColumn(name = "accountID")
	public Users users;
	
}