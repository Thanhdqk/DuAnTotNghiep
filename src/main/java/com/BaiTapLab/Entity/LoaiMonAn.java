package com.BaiTapLab.Entity;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "loaimonan")
public class LoaiMonAn {
	@Id
	public String loai_mon_anID;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ten_loai;
	
	public String hinh_anh;
}
