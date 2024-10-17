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
@Table(name = "phuongthuctt")
public class PhuongThucTT {
	@Id
	public String phuong_thucTTID;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ten_phuong_thuc;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ten_loai;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ghi_chu;
	
	@ManyToOne
	@JoinColumn(name = "accountID")
	public Users users;
}
