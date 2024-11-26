package com.BaiTapLab.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "settings")
public class Settings {
	@Id
	public String settingid;
	
	public String favicon;
	
	public String logo;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ten_cua_hang;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String so_dien_thoai;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String dia_chi_cua_hang;
	
	@ManyToOne
	@JoinColumn(name = "accountID")
	public Users users;
}
