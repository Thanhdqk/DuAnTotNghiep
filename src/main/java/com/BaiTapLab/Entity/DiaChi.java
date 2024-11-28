package com.BaiTapLab.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "diachi")
public class DiaChi {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    public int dia_chiID;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String dia_chi;
	
	@OneToMany(mappedBy = "diachi", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<DonHang> donhang;
	
	@ManyToOne
    @JoinColumn(name = "accountID")
    public Users users;

	public int getDia_chiID() {
		return dia_chiID;
	}

	public void setDia_chiID(int dia_chiID) {
		this.dia_chiID = dia_chiID;
	}

	public String getDia_chi() {
		return dia_chi;
	}

	public void setDia_chi(String dia_chi) {
		this.dia_chi = dia_chi;
	}

	public List<DonHang> getDonhang() {
		return donhang;
	}

	public void setDonhang(List<DonHang> donhang) {
		this.donhang = donhang;
	}

	public Users getUsers() {
		return users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}
	
}
