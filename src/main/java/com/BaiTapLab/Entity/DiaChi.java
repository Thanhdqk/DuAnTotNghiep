package com.BaiTapLab.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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

	@Column(columnDefinition = "NVARCHAR(255)")
	public String dia_chi;

	@Column(columnDefinition = "NVARCHAR(255)")
	public String phuong;

	@Column(columnDefinition = "NVARCHAR(255)")
	public String quan;
	
  

	@Column(columnDefinition = "NVARCHAR(255)")
	public String thanh_pho;

	@OneToMany(mappedBy = "diachi", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<DonHang> donhang;

	@ManyToOne
	@JoinColumn(name = "accountID")
	@JsonManagedReference
	
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

	public String getPhuong() {
		return phuong;
	}

	public void setPhuong(String phuong) {
		this.phuong = phuong;
	}

	public String getQuan() {
		return quan;
	}

	public void setQuan(String quan) {
		this.quan = quan;
	}

	public String getThanh_pho() {
		return thanh_pho;
	}

	public void setThanh_pho(String thanh_pho) {
		this.thanh_pho = thanh_pho;
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