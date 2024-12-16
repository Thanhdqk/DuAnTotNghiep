package com.BaiTapLab.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
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
