package com.BaiTapLab.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

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
@Table(name = "popup")

public class Popup {
	@Id
	public String popupID;

	public LocalDate ngay_tao;

	public LocalDate han_su_dung;

	@Column(columnDefinition = "NVARCHAR(255)")

	public String hoat_dong;

	@Column(columnDefinition = "NVARCHAR(255)")

	public String trang_thai_xoa;



	@OneToMany(mappedBy = "popup", cascade = CascadeType.ALL)
	@JsonProperty(value = "sanpham")
	public List<SanPham> sanpham;

	@ManyToOne
	@JoinColumn(name = "accountID")

	public Users users;

}
