package com.BaiTapLab.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "popupchitiet")
public class PopupChiTiet {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public int popupchitietid;

	@ManyToOne
	@JoinColumn(name = "popupID")
	@JsonProperty("popup")
	@JsonBackReference
	public Popup popup;

	@ManyToOne
	@JsonManagedReference
	@JsonProperty("sanpham")
	@JoinColumn(name = "san_phamId")
	public SanPham sanpham;

}