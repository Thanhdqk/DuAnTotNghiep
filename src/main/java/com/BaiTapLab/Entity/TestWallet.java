package com.BaiTapLab.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "testwallet")
public class TestWallet {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
    public int id;
	
	public String so_tai_khoan;
	
	public double so_tien;
	
	public String email;
}
