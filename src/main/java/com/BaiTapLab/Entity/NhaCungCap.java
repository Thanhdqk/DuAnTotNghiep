package com.BaiTapLab.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "nhacungcap")
public class NhaCungCap {
	@Id
	public String nha_cung_capID;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ten_nhaCC;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ten_mat_hang;
	
	public String so_dien_thoai;
	
	@ManyToOne
	public Users users;
}
