package com.BaiTapLab.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "hinhanh")
public class HinhAnh {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
    private int id;
	
	public String ten_hinh;
	
	@ManyToOne
	public Users users;
}
