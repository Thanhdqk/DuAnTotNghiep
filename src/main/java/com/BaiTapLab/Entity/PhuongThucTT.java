package com.BaiTapLab.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "phuongthuctt")
public class PhuongThucTT {
	@Id
	public String phuong_thucTTID;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ten_phuong_thuc;
	
	public LocalDate ngay_tao;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ten_loai;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String hoat_dong;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String trang_thai_xoa;
	

	
	@OneToMany(mappedBy = "phuongthuctt", cascade = CascadeType.ALL)
	@JsonIgnore
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	public List<PhuongthucTTChiTiet> phuongthucTTChiTiet;
	
	@OneToMany(mappedBy = "phuongthuctt", cascade = CascadeType.ALL)
	@JsonIgnore
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	public List<DonHang> donhang;
	
	@ManyToOne
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@JoinColumn(name = "accountID")
	public Users users;
}
