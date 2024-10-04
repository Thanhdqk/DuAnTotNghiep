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
@Table(name = "danhgia")
public class DanhGia {
	@Id
	public String danh_giaID;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String noi_dung;
	
	public int sao;
	public String hinh_anh;
	
	public Instant ngay_tao;
	
	@ManyToOne
	@JoinColumn(name = "accountID")
	public Users users;
	
	@ManyToOne
	@JoinColumn(name = "ten_cua_hang")
	public CuaHang cuahang;
}
