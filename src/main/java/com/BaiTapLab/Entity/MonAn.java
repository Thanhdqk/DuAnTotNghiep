package com.BaiTapLab.Entity;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "monan")
public class MonAn {
	@Id
	public String mon_anID;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ten_mon_an;
	public Instant ngay_tao;
	public double gia_goc;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String mo_ta;
	
	public double gia_moi;
	
	@ManyToOne
	@JoinColumn(name = "loai_mon_anID")
	public LoaiMonAn loaimonan;
	
	@ManyToOne
	@JoinColumn(name = "ten_cua_hang")
	public CuaHang cuahang;
	
}
