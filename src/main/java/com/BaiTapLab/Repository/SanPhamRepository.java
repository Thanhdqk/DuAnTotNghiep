package com.BaiTapLab.Repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.NhaCungCap;
import com.BaiTapLab.Entity.SanPham;

import jakarta.transaction.Transactional;

public interface SanPhamRepository extends JpaRepository<SanPham, String>{
	// Lấy id theo tên sản phẩm
	@Query("select sp from SanPham sp\r\n"
			+ "  where sp.ten_san_pham = :tenSP")
	SanPham findByTenSP(@Param("tenSP") String tenSP);
	
	@Query(value = "SELECT sp.san_phamId FROM SanPham sp ORDER BY sp.san_phamId DESC")
    List<String> getLatestProductId(Pageable pageable);
	
	// Liệt kê nhật ký hoạt động
	@Query(value = "select ten_hanh_dong, san_pham_id, ngay_hanh_dong, accountid from hanhdong\r\n"
			+ "  where san_pham_id is not null", nativeQuery = true)
	List<Object[]> listNhatKy();
	
	// Xem chi tiết sản phẩm
	@Query(value = "select sp.ten_san_pham, sp.ngay_tao, sp.so_luong, sp.mo_ta,\r\n"
			+ "  sp.chieu_cao, sp.chieu_dai, sp.chieu_rong, sp.khoi_luong, sp.tien_nhap_hang, sp.gia_goc,\r\n"
			+ "  dm.ten_loaidm, th.ten_thuong_hieu, ncc.ten_nhacc, sp.san_pham_id from sanpham sp\r\n"
			+ "  JOIN danhmuc dm on sp.danh_muc_id = dm.danh_muc_id\r\n"
			+ "  JOIN thuonghieu th on sp.thuong_hieuid = th.thuong_hieuid\r\n"
			+ "  JOIN nhacungcapchitiet nccct on nccct.san_pham_id = sp.san_pham_id\r\n"
			+ "  JOIN nhacungcap ncc on ncc.nha_cung_capid = nccct.nha_cung_capid\r\n"
			+ "  where sp.san_pham_id = :sanPhamID", nativeQuery = true)
	List<Object[]> findByDetailSanPham(@Param("sanPhamID") String sanPhamID);
	
	// List sản phẩm mới
	@Query(value = "  select sp.san_pham_id, sp.ten_san_pham, sp.ngay_tao, sp.gia_goc,\r\n"
			+ "  sp.gia_km, sp.han_gg, sp.luot_mua, sp.mo_ta, sp.phantram_gg, sp.so_luong,\r\n"
			+ "  sp.trang_thai_kho, sp.hoat_dong, sp.phe_duyet, sp.trang_thai_xoa, \r\n"
			+ "  sp.tien_nhap_hang, sp.chieu_cao, sp.chieu_dai, sp.chieu_rong,\r\n"
			+ "  sp.khoi_luong, sp.nhap_hang, ncc.ten_nhacc, th.ten_thuong_hieu, \r\n"
			+ "  dm.ten_loaidm from sanpham sp\r\n"
			+ "  LEFT JOIN danhmuc dm on sp.danh_muc_id = dm.danh_muc_id\r\n"
			+ "  LEFT JOIN thuonghieu th on th.thuong_hieuid = sp.thuong_hieuid\r\n"
			+ "  LEFT JOIN nhacungcapchitiet nccct on nccct.san_pham_id = sp.san_pham_id\r\n"
			+ "  LEFT JOIN nhacungcap ncc on ncc.nha_cung_capid = nccct.nha_cung_capid", nativeQuery = true)
	List<Object[]> listSanPhamMoi();
	
	// Xóa sản phẩm theo id
	@Modifying
	@Transactional
	@Query(value = "update sanpham\r\n"
			+ "  set trang_thai_xoa = N'Đã xóa'\r\n"
			+ "  where san_pham_id = :sanPhamId", nativeQuery = true)
	int updateSanPhamById(@Param("sanPhamId") String sanPhamId);
	
	// Xóa sản phẩm theo id
	@Modifying
	@Transactional
	@Query(value = "update sanpham\r\n"
			+ "  set trang_thai_xoa = NULL\r\n"
			+ "  where san_pham_id = :sanPhamId", nativeQuery = true)
	int reloadSanPhamById(@Param("sanPhamId") String sanPhamId);
	
	// Xem ghi chú 
	@Query(value = "select ghi_chu from sanpham\r\n"
			+ "  where san_pham_id = :sanPhamId", nativeQuery = true)
	List<Object[]> lietKeGhiChu(@Param("sanPhamId") String sanPhamId);
	
	// Xem chi tiết ở bên QLSP
	@Query(value = "select sp.san_pham_id, sp.ten_san_pham, sp.gia_goc, sp.gia_km,\r\n"
			+ "   sp.mo_ta, sp.phantram_gg, sp.han_gg, sp.hoat_dong from sanpham sp\r\n"
			+ "   where sp.san_pham_id = :sanPhamId", nativeQuery = true)
	List<Object[]> xemDetail(@Param("sanPhamId") String sanPhamId);
	
	// Liệt kê danh sách sản phẩm đang khuyến mãi
	@Query(value = "EXEC sp_UpdateGiaKhuyenMaiSP", nativeQuery = true)
	List<Object[]> lietKeDanhSachSPKhuyenMai();
	
	// Liệt kê nhật ký bên quản lý sản phẩm
	@Query(value = "select san_pham_id, ten_hanh_dong,  ngay_hanh_dong, accountid from hanhdong\r\n"
			+ "   where san_pham_id is not null and ten_hanh_dong = N'Cập nhật giá khuyến mãi'", nativeQuery = true)
	List<Object[]> danhSachNhatKyQLSP();
	
}
