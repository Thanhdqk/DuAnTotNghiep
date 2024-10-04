package com.BaiTapLab.Entity;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "suluachon")
public class SuLuaChon {
	@Id
	public String su_lua_chonID;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ten_lua_chon;
	
	public double gia;
	
	@ManyToOne
	@JoinColumn(name = "mon_anID")
	public MonAn monan;
	
	@ManyToOne
	@JoinColumn(name = "loai_lua_chonID")
	public LoaiLuaChon loailuachon;
}
