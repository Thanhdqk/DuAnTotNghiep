package com.BaiTapLab.Entity;

import java.util.List;



import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class Users {
	@Id
	public String accountID;
	
	@JsonIgnore
	public String password;
	
	public String hovaten;
	public String hinh_anh;
	public String vai_tro;
	public String so_dien_thoai;
	public String email;
	public String dia_chi;
	
	@OneToMany(mappedBy = "users", cascade = CascadeType.ALL)
	public List<DonHang> donhang;
	
	@OneToOne(mappedBy = "users", cascade = CascadeType.ALL)
	public CuaHang cuahang;
}
