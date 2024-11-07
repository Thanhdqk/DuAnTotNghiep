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
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "donhang")
public class DonHang {
	@Id
	public String don_hangid;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String trang_thai;
	
	public LocalDate ngay_tao;
	
	public LocalDate thoi_gianXN;
	
	public String so_dien_thoai;
	
	public String hinh_anh;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String ghi_chu;
	
	public double phi_ship;
	
	public double tong_tien;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String hanh_dong;
	
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
    @JsonProperty(value="voucher",access = JsonProperty.Access.READ_ONLY)
    public Voucher voucher;
    
    @ManyToOne
    @JoinColumn(name = "dia_chiID")
    @JsonProperty(value="users",access = JsonProperty.Access.READ_ONLY)
    public DiaChi diachi;
    
    @ManyToOne
    @JoinColumn(name = "phuong_thucTTID")
    public PhuongThucTT phuongthuctt;
}
