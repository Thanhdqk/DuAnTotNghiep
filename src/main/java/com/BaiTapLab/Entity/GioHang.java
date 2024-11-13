package com.BaiTapLab.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    public int gio_hangid;
	
	public int so_luong;
	
	@ManyToOne
	@JoinColumn(name = "accountID")
	public Users users;
	
}
