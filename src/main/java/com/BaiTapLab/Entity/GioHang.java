package com.BaiTapLab.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

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
@Table(name = "giohang")
public class GioHang {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    public int id;
	
	public int so_luong;
	
	@ManyToOne
	@JoinColumn(name = "accountID")
	@JsonManagedReference // Thay đổi ở đây
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	public Users users;
	
	@ManyToOne
	@JoinColumn(name = "san_phamId")
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@JsonManagedReference // Thay đổi ở đây
	
	public SanPham sanpham;
}