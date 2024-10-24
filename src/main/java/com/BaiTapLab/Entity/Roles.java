package com.BaiTapLab.Entity;

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
@Table(name = "roles")
public class Roles {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    public int id;
	
	public String ten_vai_tro;
	
	@ManyToOne
	@JoinColumn(name = "accountID")
	public Users users;
}
