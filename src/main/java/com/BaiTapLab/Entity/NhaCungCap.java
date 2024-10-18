package com.BaiTapLab.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
	
	@OneToMany(mappedBy = "nhacungcap", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<NhaCungCapChiTiet> nhacungcapchitiet;
	
	@ManyToOne
	@JoinColumn(name = "accountID")
	public Users users;
}
