package com.BaiTapLab.Entity;



import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "loailuachon")
public class LoaiLuaChon {
	@Id
	public String loai_lua_chonID;
	public String ten_loai_lua_chon;
	public String so_lan_chon;

	@ManyToOne
	@JoinColumn(name = "mon_anID")
	public MonAn monan;
	
}
