package com.BaiTapLab.Entity;

import java.time.LocalDate;
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
@Table(name = "donhang")
public class DonHang {
	@Id
	public String don_hangid;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String trang_thai;
	
	public LocalDate ngay_tao;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String dia_chi;
	
	public String so_dien_thoai;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ghi_chu;
	
	public double phi_ship;
	
    @ManyToOne
    public Users users;
    
    @ManyToOne
    public Voucher voucher;
}
