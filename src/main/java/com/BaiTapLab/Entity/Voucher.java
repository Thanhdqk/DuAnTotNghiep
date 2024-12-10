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
@Table(name = "voucher")
public class Voucher {
	@Id
	public String voucherID; // Cho cái này tự tăng
	
	public String ma_voucher;
	
	public int so_tien_giam;
	
	public int don_hang_toi_thieu;
	
	public String hinh_anh;
	
	public LocalDate ngay_tao;
	
	public LocalDate han_su_dung;
	
	public int so_luot_SD;
	
	public int so_luong;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String dieu_kien;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String hoat_dong;
	
	@Column(columnDefinition = "NVARCHAR(255)")
	public String trang_thai_xoa;
	
	@OneToMany(mappedBy = "voucher", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<DonHang> donhang;
	
	@OneToMany(mappedBy = "voucher", cascade = CascadeType.ALL)
	@JsonIgnore
	public List<VoucherDetail> voucherdetail;
	
	@Override
    public String toString() {
        return "Voucher{" +
                "voucherID='" + voucherID + '\'' +
                "ma_voucher='" + ma_voucher + '\'' +
                ", so_tien_giam='" + so_tien_giam + '\'' +
                ", don_hang_toi_thieu='" + don_hang_toi_thieu + '\'' +
                ", hinh_anh='" + hinh_anh + '\'' +
                ", ngay_tao=" + ngay_tao +
                ", han_su_dung=" + han_su_dung +
                ", so_luot_SD=" + so_luot_SD +
                ", so_luong=" + so_luong +
                ", dieu_kien='" + dieu_kien + '\'' +
                ", hoat_dong='" + hoat_dong + '\'' +
                '}';
    }
}
