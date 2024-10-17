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
@Table(name = "baidang")
public class BaiDang {
	@Id
	public String bai_dangID;
	
	public String hinh_anh;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String tieu_de;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String noi_dung;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String phe_duyet;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String hoat_dong;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String yeu_cau;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ghi_chu;
	
	@ManyToOne
	@JoinColumn(name = "accountID")
	public Users users;
}
