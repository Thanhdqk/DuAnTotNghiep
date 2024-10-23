package com.BaiTapLab.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
@Table(name = "danhgia")
public class DanhGia {
	@Id
	public String danh_giaID;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String noi_dung;
	
	public int so_sao;
	
	public String hinh_anh;
	
	public LocalDate ngay_tao;
	
	@OneToMany(mappedBy = "danhgia", cascade = CascadeType.ALL)
	@JsonManagedReference
    private List<PhanHoiDanhGia> phanhoidanhgia;
	
	@ManyToOne
	@JoinColumn(name = "accountID")
	public Users users;
	
	@ManyToOne
	@JoinColumn(name = "san_phamId")
	public SanPham sanpham;
}
