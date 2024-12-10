package com.BaiTapLab.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name = "bannerchitiet")
public class BannerChiTiet {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    public int bannerchitietid;
	
	@ManyToOne
	@JoinColumn(name = "bannerId")
	public Banner banner;
	
	@ManyToOne
	@JoinColumn(name = "danh_mucId")
	public DanhMuc danhmuc;
}
