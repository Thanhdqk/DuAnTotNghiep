package com.BaiTapLab.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.fasterxml.jackson.annotation.JsonProperty;

import com.fasterxml.jackson.annotation.JsonManagedReference;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "diachi")
public class DiaChi {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    public int dia_chiID;
	
	public String dia_chi;
	
	@OneToMany(mappedBy = "diachi", cascade = CascadeType.ALL)
	@JsonIgnore
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	public List<DonHang> donhang;
	
	@ManyToOne
	
    @JoinColumn(name = "accountID")
	@JsonManagedReference
	
    public Users users;
}