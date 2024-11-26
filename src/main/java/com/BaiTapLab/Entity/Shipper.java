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
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
@Entity
@Table(name = "shipper")
public class Shipper {
	@Id
	public String shipperID;
	
	public String password;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String hovaten;
	
	public String hinh_anh;
	
	public String so_dien_thoai;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String vai_tro;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String hoat_dong;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public Integer vi_pham;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String trang_thai_xoa;
	
	@OneToMany(mappedBy = "shipper", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<DonHang> donhang;
}
