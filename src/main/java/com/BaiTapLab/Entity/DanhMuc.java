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
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "danhmuc")
public class DanhMuc {
	@Id
	public String danh_mucId;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ten_loaiDM;
	
	public LocalDate ngay_tao;
	
	public String hinh_anh;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String phe_duyet;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String hoat_dong;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String yeu_cau;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ghi_chu;
	
	@OneToMany(mappedBy = "danhmuc", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<SanPham> sanpham;
	
	@ManyToOne
	@JoinColumn(name = "accountID")
	public Users users;
	
	@ManyToOne
	@JoinColumn(name = "bannerId")
	public Banner banner;
}
