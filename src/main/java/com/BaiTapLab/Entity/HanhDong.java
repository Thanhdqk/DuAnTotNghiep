package com.BaiTapLab.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "hanhdong")
public class HanhDong {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    public int hanh_dongID;
	
	public String ten_hanh_dong;
	
	@ManyToOne // Bảng user
	@JoinColumn(name = "accountID")
	public Users users;
	
	@ManyToOne // Bảng bài đăng
	@JoinColumn(name = "bai_dangID")
	public BaiDang baidang;
	
	@ManyToOne // Bảng banner
	@JoinColumn(name = "bannerId")
	public Banner banner;
	
	@ManyToOne // Bảng đánh giá
	@JoinColumn(name = "danh_giaID")
	public DanhGia danhgia;
	
	@ManyToOne // Bảng danh mục
	@JoinColumn(name = "danh_mucId")
	public DanhMuc danhmuc;
	
	@ManyToOne // Bảng đơn hàng
	@JoinColumn(name = "don_hangid")
	public DonHang donhang;
	
	@ManyToOne // Bảng hình ảnh
	@JoinColumn(name = "id")
	public HinhAnh hinhanh;
	
	@ManyToOne // Bảng nhà cung cấp
	@JoinColumn(name = "nha_cung_capID")
	public NhaCungCap nhacungcap;
	
	@ManyToOne // Bảng phản hồi đánh giá
	@JoinColumn(name = "phan_hoiID")
	public PhanHoiDanhGia phanhoidanhgia;
	
	@ManyToOne // Bảng popup
	@JoinColumn(name = "popupID")
	public Popup popup;
	
	@ManyToOne // Bảng respone
	@JoinColumn(name = "responseID")
	public Respone respone;
	
	@ManyToOne // Bảng sản phẩm
	@JoinColumn(name = "san_phamId")
	public SanPham sanpham;
	
	@ManyToOne // Bảng thương hiệu
	@JoinColumn(name = "thuong_hieuID")
	public ThuongHieu thuonghieu;
	
	@ManyToOne // Bảng voucher
	@JoinColumn(name = "voucherID")
	public Voucher voucher;
}
