package com.BaiTapLab.Entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

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
	
	public String online_payment_id;
	
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
	public String ly_do;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String trang_thai_nhan_don;
	
	
	@OneToMany(mappedBy = "donhang", cascade = CascadeType.ALL)
	@JsonProperty(access = JsonProperty.Access.READ_ONLY)
	@JsonIgnore
	public List<DonHangChiTiet> donhangchitiet;
	
    @ManyToOne
    @JoinColumn(name = "accountID")
    @JsonProperty(value="users")
    public Users users;
    
    @ManyToOne
    @JoinColumn(name = "voucherID")
    @JsonProperty(value="voucher")
    public Voucher voucher;
    
    @ManyToOne
    @JoinColumn(name = "dia_chiID")
    @JsonProperty(value="dia_chi",access = JsonProperty.Access.READ_ONLY)
    public DiaChi diachi;
    
    @ManyToOne
    @JoinColumn(name = "phuong_thucTTID")
    public PhuongThucTT phuongthuctt;
    
    @ManyToOne
    @JoinColumn(name = "shipperID")
    public Shipper shipper;
}
