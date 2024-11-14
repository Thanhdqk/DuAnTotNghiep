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
	
	public LocalDate thoi_gianXN;
	
	public LocalDate thoi_gian_du_kien;
	
	public String so_dien_thoai;
	
	public String hinh_anh;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ghi_chu;
	
	public double phi_ship;
	
	public double tong_tien;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String hanh_dong;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ly_do;
	
	@OneToMany(mappedBy = "donhang", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<DonHangChiTiet> donhangchitiet;
	
    @ManyToOne
    @JoinColumn(name = "accountID")
    public Users users;
    
    @ManyToOne
    @JoinColumn(name = "voucherID")
    public Voucher voucher;
    
    @ManyToOne
    @JoinColumn(name = "dia_chiID")
    public DiaChi diachi;
    
    @ManyToOne
    @JoinColumn(name = "phuong_thucTTID")
    public PhuongThucTT phuongthuctt;
}
