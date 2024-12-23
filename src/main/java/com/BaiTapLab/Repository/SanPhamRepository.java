package com.BaiTapLab.Repository;

import java.time.LocalDate;
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
	
	// Kiểm lỗi sản phẩm trùng
	@Query(value = "select * from sanpham sp where sp.ten_san_pham = :ten_san_pham", nativeQuery = true)
	List<Object[]> trungTenSanPham(@Param("ten_san_pham") String ten_san_pham);
	
	@Query(value = "SELECT sp.san_phamId FROM SanPham sp ORDER BY sp.san_phamId DESC")
    List<String> getLatestProductId(Pageable pageable);
	
	// Liệt kê nhật ký hoạt động
	@Query(value = "select ten_hanh_dong, san_pham_id, ngay_hanh_dong, accountid from hanhdong\r\n"
			+ "  where san_pham_id is not null", nativeQuery = true)
	List<Object[]> listNhatKy();
	
	// Xem chi tiết sản phẩm
	@Query(value = "select sp.ten_san_pham, sp.ngay_tao, sp.so_luong, sp.mo_ta,\r\n"
			+ "  sp.chieu_cao, sp.chieu_dai, sp.chieu_rong, sp.khoi_luong, sp.tien_nhap_hang, sp.gia_goc,\r\n"
			+ "  dm.ten_loaidm, th.ten_thuong_hieu, ncc.ten_nhacc, sp.san_pham_id, sp.han_su_dung from sanpham sp\r\n"
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
			+ "  dm.ten_loaidm, sp.han_su_dung, sp.ghi_chu from sanpham sp\r\n"
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
	
	// Liệt kê danh sách hàng tồn đọng
	@Query(value = "EXEC sp_UpdateHangTonDong", nativeQuery = true)
	List<Object[]> danhSachTonDong();
	
	// Liệt kê danh sách hàng sắp hết hàng
	@Query(value = "EXEC sp_UpdateSapHetHang", nativeQuery = true)
	List<Object[]> danhSachSapHetHang();
	
	// Liệt kê danh sách hàng sắp hết hạn
	@Query(value = "EXEC sp_UpdateSapHetHan", nativeQuery = true)
	List<Object[]> danhSachSapHetHan();
	
	// Liệt kê danh sách hàng đã nhập
	@Query(value = "select sp.san_pham_id, sp.ten_san_pham, nxsp.trang_thai_nhap, nxsp.so_luong, sp.tien_nhap_hang, "
			+ "nxsp.ngay_nhap_xuat, sp.gia_goc from sanpham sp\r\n"
			+ "JOIN nhapxuatsanpham nxsp on sp.san_pham_id = nxsp.san_pham_id\r\n"
			+ "where trang_thai_nhap = N'Nhập hàng'", nativeQuery = true)
	List<Object[]> danhSachSanPhamNhap();
	
	// Liệt kê danh sách hàng đã xuất
	@Query(value = "select sp.san_pham_id, sp.ten_san_pham, nxsp.trang_thai_xuat, nxsp.so_luong, sp.tien_nhap_hang, "
			+ "nxsp.ngay_nhap_xuat, sp.gia_goc from sanpham sp\r\n"
			+ "JOIN nhapxuatsanpham nxsp on sp.san_pham_id = nxsp.san_pham_id\r\n"
			+ "where trang_thai_xuat = N'Xuất hàng'", nativeQuery = true)
	List<Object[]> danhSachSanPhamXuat();
	
	// Liệt kê danh sách hết hàng
	@Query(value = "EXEC sp_UpdateSanPhamHetHang", nativeQuery = true)
	List<Object[]> danhSachSanPhamHetHang();
	
	// Liệt kê danh sách quá hạn
	@Query(value = "EXEC sp_UpdateSanPhamQuaHan", nativeQuery = true)
	List<Object[]> danhSachSanPhamQuaHan();
	
	// Update cần nhập hàng
	@Modifying
	@Transactional
	@Query(value = "update sanpham\r\n"
			+ "set nhap_hang = N'Cần nhập hàng'\r\n"
			+ "where san_pham_id = :sanPhamId ", nativeQuery = true)
	int updateCanNhapHang(@Param("sanPhamId") String sanPhamId);
	
	// Chi tiết sản phẩm QLK
	@Query(value ="select san_pham_id, ten_san_pham, chieu_cao, chieu_dai, chieu_rong, khoi_luong, gia_goc from sanpham\r\n"
			+ "where san_pham_id = :sanPhamId", nativeQuery = true)
	List<Object[]> listchiTietQLK(@Param("sanPhamId") String sanPhamId);	
	
	// Liệt kê nhật ký trong quản lý kho
	@Query(value = "select ten_hanh_dong, san_pham_id, accountid, ngay_hanh_dong from hanhdong\r\n"
			+ "where ten_hanh_dong IN (N'Cập nhật cần nhập hàng', N'Cập nhật sản phẩm trong kho')", nativeQuery = true)
	List<Object[]> listNhatKyQLKho();
	
	// Update nhập hàng lại cho sản phẩm quá hạn
	@Modifying
	@Transactional
	@Query(value = "update sanpham\r\n"
			+ "  set han_su_dung = null, so_luong = 0, nhap_hang = N'Cần nhập hàng', hoat_dong = 'Off', phe_duyet = N'Chưa phê duyệt'\r\n"
			+ "  where san_pham_id = :sanPhamId", nativeQuery = true)
	int updateSanphamQuaHan(@Param("sanPhamId") String sanPhamId);
	
	//loi
	@Query("SELECT s FROM SanPham s WHERE s.ten_san_pham LIKE ?1")
	SanPham findONESanPhamByTenSanPham(String name);
	
	@Query("SELECT s.ten_san_pham FROM SanPham s")
	List<String> findallName();
	
	@Query(value = "SELECT s.san_pham_id,s.ten_san_pham,s.ngay_tao,s.gia_goc,s.gia_km,s.mo_ta,s.phantram_GG,s.so_luong,s.han_gg,s.trang_thai_kho,s.luot_mua,"
			+ "s.hoat_dong,s.phe_duyet,s.trang_thai_xoa,s.chieu_cao,s.chieu_dai,s.chieu_rong,s.khoi_luong ,s.ghi_chu, s.accountid "
			+ "FROM sanpham s where phe_duyet =N'Đã phê duyệt' ",nativeQuery = true)
	List<Object[]> getproductshavebeenApproved();
	
	@Query(value = "SELECT s.san_pham_id,s.ten_san_pham,s.ngay_tao,s.gia_goc,s.gia_km,s.mo_ta,s.phantram_GG,s.so_luong,s.han_gg,s.trang_thai_kho,s.luot_mua,"
			+ "s.hoat_dong,s.phe_duyet,s.trang_thai_xoa,s.chieu_cao,s.chieu_dai,s.chieu_rong,s.khoi_luong ,s.ghi_chu , s.accountid "
			+ "FROM sanpham s where phe_duyet =N'Chưa phê duyệt' ",nativeQuery = true)
	List<Object[]> getproductshavebeenNotApproved();
	@Query(value = "SELECT s.san_pham_id,s.ten_san_pham,s.ngay_tao,s.gia_goc,s.gia_km,s.mo_ta,s.phantram_GG,s.so_luong,s.han_gg,s.trang_thai_kho,s.luot_mua,"
			+ "s.hoat_dong,s.phe_duyet,s.trang_thai_xoa,s.chieu_cao,s.chieu_dai,s.chieu_rong,s.khoi_luong ,s.ghi_chu , s.accountid "
			+ "FROM sanpham s where phe_duyet =N'Bị từ chối' ",nativeQuery = true)
	List<Object[]>  getproductshaventbeenApproved();
	
	
	@Query(value = "SELECT " +
            "    s.san_pham_id, " +
            "    s.ten_san_pham, " +
            "    s.ngay_tao, " +
            "    s.gia_goc, " +
            "    s.gia_km, " +
            "    s.mo_ta, " +
            "    s.phantram_GG, " +
            "    s.so_luong, " +
            "    s.han_gg, " +
            "    s.trang_thai_kho, " +
            "    s.luot_mua, " +
            "    s.hoat_dong, " +
            "    s.phe_duyet, " +
            "    s.trang_thai_xoa, " +
            "    s.chieu_cao, " +
            "    s.chieu_dai, " +
            "    s.chieu_rong, " +
            "    s.khoi_luong, " +
            "    (SELECT CAST(AVG(so_sao) AS DECIMAL(10,1)) " +
            "     FROM DanhGia dg " +
            "     WHERE dg.san_pham_id = s.san_pham_id) AS soSao, " +
            "    (SELECT COUNT(*) " +
            "     FROM DanhGia dg " +
            "     WHERE dg.san_pham_id = s.san_pham_id) AS soDanhGia, " +
            "    (SELECT TOP 1 h.ten_hinh " +
            "     FROM HinhAnh h " +
            "     WHERE h.san_pham_id = s.san_pham_id " +
            "     ORDER BY h.id ASC) AS tenHinhDauTien " +
            "FROM DonHang dh " +
            "LEFT JOIN DonHangChiTiet dhct ON dh.don_hangid = dhct.don_hangid " +
            "LEFT JOIN SanPham s ON dhct.san_pham_id = s.san_pham_id " +
            "WHERE " +
            "    dh.trang_thai = N'Đã giao' " +
            "    AND MONTH(dh.ngay_tao) = :thang " +
            "    AND YEAR(dh.ngay_tao) = :nam " +
            " 	 AND s.hoat_dong = 'On' "+
            " 	 AND s.trang_thai_xoa is null "+
            "    AND s.so_luong > 0 "+
            "GROUP BY " +
            "    YEAR(dh.ngay_tao), " +
            "    MONTH(dh.ngay_tao), " +
            "    s.san_pham_id, " +
            "    s.ten_san_pham, " +
            "    s.ngay_tao, " +
            "    s.gia_goc, " +
            "    s.gia_km, " +
            "    s.mo_ta, " +
            "    s.phantram_GG, " +
            "    s.so_luong, " +
            "    s.han_gg, " +
            "    s.trang_thai_kho, " +
            "    s.luot_mua, " +
            "    s.hoat_dong, " +
            "    s.phe_duyet, " +
            "    s.trang_thai_xoa, " +
            "    s.chieu_cao, " +
            "    s.chieu_dai, " +
            "    s.chieu_rong, " +
            "    s.khoi_luong " +
            "ORDER BY " +
            "    SUM(dhct.so_luong) DESC", 
            nativeQuery = true)
	List<Object[]> findbestsellbymonththisyear(@Param("thang") int thang, @Param("nam") int nam);

	@Query("SELECT   s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, "
			+ "s.trang_thai_xoa,  s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM DonHang dh " + "LEFT JOIN dh.donhangchitiet dhct  " + "LEFT JOIN dhct.sanpham s  "
			+ "WHERE dh.trang_thai = :trangthai " + "AND MONTH(dh.ngay_tao) = :thang " + "AND YEAR(dh.ngay_tao) = :nam  "
//			+ "GROUP BY YEAR(dh.ngay_tao), MONTH(dh.ngay_tao), s.san_phamId, s.ten_san_pham, s.gia_goc,s.ngay_tao, s.gia_km, s.mo_ta, s.phantram_GG, "
//			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, "
//			+ "s.trang_thai_xoa,  s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong"
//			+ "ORDER BY SUM(dhct.so_luong)  DESC"
			)
	List<Object[]> FindBySanPhamTopSellByMonth(@Param("thang") int thang, @Param("nam") int nam,@Param("trangthai") String trangthai);

	// new sản phẩm từ thương hiệu
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s " + "WHERE s.thuonghieu.thuong_hieuID = ?1"
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null AND s.thuonghieu.hoat_dong = 'On' AND s.thuonghieu.trang_thai_xoa is null AND s.danhmuc.hoat_dong = 'On' AND s.danhmuc.trang_thai_xoa is null ")
	List<Object[]> findSanPhamThuongHieuID(String id);

	// new tìm tìm kiếm sản phẩm theo danh mục full
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId AND h.id = "
			+ "(SELECT MIN(hh.id) FROM HinhAnh hh WHERE hh.sanpham.san_phamId = s.san_phamId)) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE s.hoat_dong = 'On' AND s.trang_thai_xoa is null AND  s.danhmuc.danh_mucId = :danhMucId AND s.thuonghieu.hoat_dong = 'On' AND s.thuonghieu.trang_thai_xoa is null AND s.danhmuc.hoat_dong = 'On' AND s.danhmuc.trang_thai_xoa is null")
	List<Object[]> findSanPhamByDMId(@Param("danhMucId") String id);

	// tìm các sản phẩm có khuyến mãi Full
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE s.phantram_GG > 0"
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null AND s.thuonghieu.hoat_dong = 'On' AND s.thuonghieu.trang_thai_xoa is null AND s.danhmuc.hoat_dong = 'On' AND s.danhmuc.trang_thai_xoa is null ")
	List<Object[]> findSanPhamphantramGGfull();

	// new this week full
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s "
			+ "WHERE  s.hoat_dong = 'On' AND s.trang_thai_xoa  is null  AND s.ngay_tao BETWEEN ?1 AND CURRENT_DATE AND s.thuonghieu.hoat_dong = 'On' AND s.thuonghieu.trang_thai_xoa is null AND s.danhmuc.hoat_dong = 'On' AND s.danhmuc.trang_thai_xoa is null")
	List<Object[]> findSanPhamLast7Daysfull(LocalDate now);

	// new findListSimilar
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId AND h.id = "
			+ "(SELECT MIN(hh.id) FROM HinhAnh hh WHERE hh.sanpham.san_phamId = s.san_phamId)) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE  s.hoat_dong = 'On' AND s.trang_thai_xoa  is null  AND s.danhmuc.danh_mucId = :danhMucId AND s.thuonghieu.hoat_dong = 'On' AND s.thuonghieu.trang_thai_xoa is null AND s.danhmuc.hoat_dong = 'On' AND s.danhmuc.trang_thai_xoa is null")
	List<Object[]> finListdSanPhamById(@Param("danhMucId") String id, Pageable page);

//  new this week
	@Query("SELECT s FROM SanPham s WHERE s.ngay_tao BETWEEN  ?1 AND CURRENT_DATE")
	List<SanPham> findSanPhamLast7DaysTOP10(LocalDate now, Pageable page);

	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s "
			+ "WHERE  s.hoat_dong = 'On' AND s.trang_thai_xoa  is null  AND s.ngay_tao BETWEEN ?1 AND CURRENT_DATE AND s.thuonghieu.hoat_dong = 'On' AND s.thuonghieu.trang_thai_xoa is null AND s.danhmuc.hoat_dong = 'On' AND s.danhmuc.trang_thai_xoa is null")
	List<Object[]> findSanPhamLast7DaysTOP100(LocalDate now, Pageable page);

	// new luot mua
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE  s.hoat_dong = 'On' AND s.trang_thai_xoa  is null  AND s.thuonghieu.hoat_dong = 'On' AND s.thuonghieu.trang_thai_xoa is null AND s.danhmuc.hoat_dong = 'On' AND s.danhmuc.trang_thai_xoa is null   ORDER BY s.luot_mua DESC  ")
	List<Object[]> findTop10ByLuotMua(Pageable page);

	@Query("SELECT s.san_phamId, s.ten_san_pham "
			+ "FROM SanPham s WHERE  s.hoat_dong = 'On' AND s.trang_thai_xoa  is null  AND s.thuonghieu.hoat_dong = 'On' AND s.thuonghieu.trang_thai_xoa is null AND s.danhmuc.hoat_dong = 'On' AND s.danhmuc.trang_thai_xoa is null   ORDER BY s.luot_mua DESC ")
	List<Object[]> findSanphamonlyname(Pageable page);

	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE s.phantram_GG > 0 AND   s.hoat_dong = 'On' AND s.trang_thai_xoa  is null AND s.thuonghieu.hoat_dong = 'On' AND s.thuonghieu.trang_thai_xoa is null AND s.danhmuc.hoat_dong = 'On' AND s.danhmuc.trang_thai_xoa is null")
	List<Object[]> findSanPhamPhanTramGiamGia(Pageable pageable);

	@Query("select s from SanPham s where s.phe_duyet = '1'")
	List<SanPham> findSanPhamnotvalid();

	@Query("select s from SanPham s where s.phe_duyet != '1'")
	List<SanPham> findSanPhamvalid();

	@Query("SELECT s FROM SanPham s WHERE s.phantram_GG > 0 ")
	List<SanPham> findSanPhamphantramGGAndhaspopupid();

	@Query("SELECT s FROM SanPham s WHERE s.ngay_tao BETWEEN  ?1 AND CURRENT_DATE")
	List<SanPham> findSanPhamLast7Days(LocalDate now);

	@Query("SELECT s FROM SanPham s WHERE s.san_phamId = ?1 ")
	SanPham findSanPhamById(String id);

	@Query("SELECT s FROM SanPham s WHERE s.san_phamId = ?1 ")
	SanPham findSanPhamByIdIfItsValid(String id);

// 	
	// tìm các sản phẩm có khuyến mãi
	@Query("SELECT s FROM SanPham s WHERE s.phantram_GG > 0")
	List<SanPham> findSanPhamphantramGG();

	@Query(value = "SELECT s.ten_san_pham " + "FROM SanPham s "
			+ "WHERE PATINDEX('%' + ?1 + '%', s.ten_san_pham COLLATE SQL_Latin1_General_CP1_CI_AI) > 0", nativeQuery = true)
	List<String> findSanPhamSuggestByRegex(String name, Pageable page);

	@Query("SELECT s FROM SanPham s WHERE s.phantram_GG > 0")
	List<SanPham> findSanPhamphantramGGTOP10(Pageable page);

	// tìm sản phẩm cùng loại categoty
	@Query("SELECT s FROM SanPham s where s.danhmuc.danh_mucId = ?1")
	List<SanPham> findSanPhamSimilar(String id);

	// tìm sản phẩm theo id category

	@Query("SELECT s FROM SanPham s  where s.danhmuc.danh_mucId = ?1 ")
	List<SanPham> findSanPhamByDanhmucId(String id);

	// tìm các sản phẩm bán nhiều nhất

// tìm kiếm  theo tên
	// tìm kiếm theo tên
	@Query(value = "SELECT * FROM SanPham WHERE ten_san_pham COLLATE SQL_Latin1_General_CP1_CI_AI LIKE %?1%", nativeQuery = true)
	List<SanPham> findSanPhamByTenSanPham(String name);

	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s "
			+ "WHERE s.ten_san_pham = ?1 AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null AND s.thuonghieu.hoat_dong = 'On' AND s.thuonghieu.trang_thai_xoa is null AND s.danhmuc.hoat_dong = 'On' AND s.danhmuc.trang_thai_xoa is null ")
	List<Object[]> findbyname(String id);

	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId ORDER BY h.id ASC LIMIT 1) AS tenHinhDauTien "
			+ "FROM SanPham s " + "WHERE LOWER(s.ten_san_pham) LIKE LOWER(CONCAT('%', :name, '%')) "
			+ "AND s.hoat_dong = 'On' AND s.trang_thai_xoa  is null  AND s.thuonghieu.hoat_dong = 'On' AND s.thuonghieu.trang_thai_xoa is null AND s.danhmuc.hoat_dong = 'On' AND s.danhmuc.trang_thai_xoa is null")
	List<Object[]> findbynamelike(@Param("name") String name);

	// tìm kiếm theo tên ko có khuyến mãi
	@Query("SELECT p FROM SanPham p WHERE p.ten_san_pham LIKE %?1%  ")
	List<SanPham> findSanPhamByTenWithOutGG(String name);

	// tìm kiếm theo tên và danh mục và có khuyến mãi
	@Query("SELECT p FROM SanPham p WHERE p.ten_san_pham LIKE %?1%  AND p.danhmuc.danh_mucId = ?2 AND p.phantram_GG >0")
	List<SanPham> findSanPhamByTenAndDandMucAndGG(String name, String id);

	// tìm kiếm theo tên và có khuyến mãi
	@Query("SELECT p FROM SanPham p WHERE p.ten_san_pham LIKE %?1%  AND p.phantram_GG >0")
	List<SanPham> findSanPhamByTenAndGG(String name);

	// tìm theo danh muc có khuyến mãi

	// tìm kiếm theo danh mục và có khuyến mãi
	@Query("SELECT p FROM SanPham p WHERE p.danhmuc.danh_mucId = ?1 AND p.phantram_GG >0")
	List<SanPham> findSanPhamByDandMucAndGG(String id);

	// tìm kiếm theo tên và danh mực
	@Query("SELECT p FROM SanPham p WHERE p.ten_san_pham LIKE %?1%  AND p.danhmuc.danh_mucId = ?2 AND p.phantram_GG >0")
	List<SanPham> findSanPhanByTenAndDanhMuc(String name, String id);

	// Tìm sản phẩm theo danh mục và số sao (rating) không có khuyến mãi:
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.danhmuc.danh_mucId = ?1 AND d.so_sao = ?2 AND p.phantram_GG >0")
	List<SanPham> findSanPhamByDandMucAndRatingWithGG(String id, int rating);

	// Tìm sản phẩm theo tên và danh mục và số sao (rating) không có khuyến mãi:
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE  p.ten_san_pham LIKE %?1% AND p.danhmuc.danh_mucId = ?2 AND d.so_sao = ?3 AND p.phantram_GG >0 ")
	List<SanPham> findSanPhamByTenAndDandMucAndRatingWithGG(String name, String id, int rating);

	// tìm theo danh muc KHÔNG có khuyến mãi
	// tìm theo danh muc KHÔNG có khuyến mãi
	@Query("SELECT p FROM SanPham p WHERE p.danhmuc.danh_mucId = ?1 ")
	List<SanPham> findSanPhamByDandMuc(String id);

	// tìm kiếm theo tên và danh mục và ko có khuyến mãi
	@Query("SELECT p FROM SanPham p WHERE p.ten_san_pham LIKE %?1%  AND p.danhmuc.danh_mucId = ?2 ")
	List<SanPham> findSanPhamByTenAndDandMucAndWithOutGG(String name, String id);

	// tìm kiếm danh mục và ko có khuyến mãi
	@Query("SELECT p FROM SanPham p WHERE  p.danhmuc.danh_mucId = ?1 ")
	List<SanPham> findSanPhamByDandMucAndWithOutGG(String id);

	// Tìm sản phẩm theo danh mục và số sao (rating) không có khuyến mãi:
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.danhmuc.danh_mucId = ?1 AND d.so_sao = ?2")
	List<SanPham> findSanPhamByDandMucAndRatingWithOutGG(String id, int rating);

	// Tìm sản phẩm theo tên và danh mục và số sao (rating) không có khuyến mãi:
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.ten_san_pham LIKE %?1% AND p.danhmuc.danh_mucId = ?2 AND d.so_sao = ?3")
	List<SanPham> findSanPhamByTenAndDandMucAndRatingWithOutGG(String name, String id, int rating);

	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE d.so_sao = ?1")
	List<SanPham> findSanPhamBySoSao(int sosao);

	@Query("SELECT p FROM SanPham p JOIN p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5")
	List<SanPham> findSanPhamByTotalSoSaoEquals5();

	@Query("SELECT s FROM SanPham s WHERE s.ngay_tao BETWEEN ?1 AND CURRENT_DATE ORDER BY s.luot_mua DESC")
	List<SanPham> findSanPhamLast7DaysWith(LocalDate startDate);

	// start tìm sản phẩm theo giá default

	// tìm sản phẩm theo giá default
	@Query("SELECT p FROM SanPham p  WHERE p.gia_goc BETWEEN  ?1 AND  ?2")
	List<SanPham> findSanPhamByPriceDefault(Long Default1, Long Default2);

	// Theo price (khoảng giá) và danhmuc
	@Query("SELECT p FROM SanPham p WHERE p.gia_goc BETWEEN ?1 AND ?2 AND p.danhmuc.danh_mucId = ?3")
	List<SanPham> findSanPhamByPriceDefaultAndDanhMuc(Long Default1, Long Default2, String danhmuc);

	// Theo price (khoảng giá) và text
	@Query("SELECT p FROM SanPham p WHERE p.gia_goc BETWEEN ?1 AND ?2 AND p.ten_san_pham = ?3")
	List<SanPham> findSanPhamByPriceDefaultAndText(Long Default1, Long Default2, String text);

	// Theo price (khoảng giá) và isChecked (có giảm giá)
	@Query("SELECT p FROM SanPham p WHERE p.gia_goc BETWEEN ?1 AND ?2 AND p.phantram_GG > 0")
	List<SanPham> findSanPhamByPriceDefaultAndDiscount(Long Default1, Long Default2);

	// Theo price (khoảng giá) và sosao
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.gia_goc BETWEEN ?1 AND ?2 AND d.so_sao = ?3")
	List<SanPham> findSanPhamByPriceDefaultAndSosao(Long Default1, Long Default2, int sosao);

	// Theo price (khoảng giá), danhmuc, và text
	@Query("SELECT p FROM SanPham p WHERE p.gia_goc BETWEEN ?1 AND ?2 AND p.danhmuc.danh_mucId = ?3 AND p.ten_san_pham = ?4")
	List<SanPham> findSanPhamByPriceDefaultAndDanhMucAndText(Long Default1, Long Default2, String danhmuc, String text);

	// Theo price (khoảng giá), danhmuc, và isChecked (có giảm giá)
	@Query("SELECT p FROM SanPham p WHERE p.gia_goc BETWEEN ?1 AND ?2 AND p.danhmuc.danh_mucId = ?3 AND p.phantram_GG > 0")
	List<SanPham> findSanPhamByPriceDefaultAndDanhMucAndDiscount(Long Default1, Long Default2, String danhmuc);

	// Theo price (khoảng giá), danhmuc, và sosao
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.gia_goc BETWEEN ?1 AND ?2 AND p.danhmuc.danh_mucId = ?3 AND d.so_sao = ?4")
	List<SanPham> findSanPhamByPriceDefaultAndDanhMucAndSosao(Long Default1, Long Default2, String danhmuc, int sosao);

	// Theo price (khoảng giá), text, và isChecked (có giảm giá)
	@Query("SELECT p FROM SanPham p WHERE p.gia_goc BETWEEN ?1 AND ?2 AND p.ten_san_pham = ?3 AND p.phantram_GG > 0")
	List<SanPham> findSanPhamByPriceDefaultAndTextAndDiscount(Long Default1, Long Default2, String text);

	// Theo price (khoảng giá), text, và sosao
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.gia_goc BETWEEN ?1 AND ?2 AND p.ten_san_pham = ?3 AND d.so_sao = ?4")
	List<SanPham> findSanPhamByPriceDefaultAndTextAndSosao(Long Default1, Long Default2, String text, int sosao);

	// Theo price (khoảng giá), isChecked (có giảm giá), và sosao
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.gia_goc BETWEEN ?1 AND ?2 AND p.phantram_GG > 0 AND d.so_sao = ?3")
	List<SanPham> findSanPhamByPriceDefaultAndDiscountAndSosao(Long Default1, Long Default2, int sosao);

	// . Theo price (khoảng giá), danhmuc, text, và isChecked (có giảm giá)
	@Query("SELECT p FROM SanPham p WHERE p.gia_goc BETWEEN ?1 AND ?2 AND p.danhmuc.danh_mucId = ?3 AND p.ten_san_pham = ?4 AND p.phantram_GG > 0")
	List<SanPham> findSanPhamByPriceDefaultAndDanhMucAndTextAndDiscount(Long Default1, Long Default2, String danhmuc,
			String text);

	// Theo price (khoảng giá), danhmuc, text, và sosao
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.gia_goc BETWEEN ?1 AND ?2 AND p.danhmuc.danh_mucId = ?3 AND p.ten_san_pham = ?4 AND d.so_sao = ?5")
	List<SanPham> findSanPhamByPriceDefaultAndDanhMucAndTextAndSosao(Long Default1, Long Default2, String danhmuc,
			String text, int sosao);

	// Theo price (khoảng giá), danhmuc, isChecked (có giảm giá), và sosao
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.gia_goc BETWEEN ?1 AND ?2 AND p.danhmuc.danh_mucId = ?3 AND p.phantram_GG > 0 AND d.so_sao = ?4")
	List<SanPham> findSanPhamByPriceDefaultAndDanhMucAndDiscountAndSosao(Long Default1, Long Default2, String danhmuc,
			int sosao);

	// Theo price (khoảng giá), text, isChecked (có giảm giá), và sosao
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.gia_goc BETWEEN ?1 AND ?2 AND p.ten_san_pham = ?3 AND p.phantram_GG > 0 AND d.so_sao = ?4")
	List<SanPham> findSanPhamByPriceDefaultAndTextAndDiscountAndSosao(Long Default1, Long Default2, String text,
			int sosao);

	// Theo tất cả các điều kiện: price (khoảng giá), danhmuc, text, isChecked (có
	// giảm giá), và sosao
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.gia_goc BETWEEN ?1 AND ?2 AND p.danhmuc.danh_mucId = ?3 AND p.ten_san_pham = ?4 AND p.phantram_GG > 0 AND d.so_sao = ?5")
	List<SanPham> findSanPhamByAllConditionsWithPriceDefault(Long Default1, Long Default2, String danhmuc, String text,
			int sosao);

	// end tìm sản phẩm theo giá default

	// start tìm kiếm theo giá dưới 10000

	// tìm sản phẩm theo giá nhỏ hơn
	@Query("SELECT p FROM SanPham p WHERE p.gia_goc <= ?1")
	List<SanPham> findSanPhamByPriceLess(Long price);

	@Query("SELECT p FROM SanPham p WHERE p.gia_goc <= ?1 AND p.danhmuc.danh_mucId = ?2")
	List<SanPham> findSanPhamByPriceLessHaveDanhMuc(Long price, String danhmuc);

	@Query("SELECT p FROM SanPham p WHERE p.gia_goc <= ?1 AND p.ten_san_pham = ?2")
	List<SanPham> findSanPhamByPriceLessHaveText(Long price, String text);

	@Query("SELECT p FROM SanPham p WHERE p.gia_goc <= ?1 AND p.phantram_GG >0")
	List<SanPham> findSanPhamByPriceLessHaveDiscount(Long price);

	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.gia_goc <= ?1 AND d.so_sao = ?2")
	List<SanPham> findSanPhamByPriceLessHaveSosao(Long price, int sosao);

	// Theo price, danhmuc và text
	@Query("SELECT p FROM SanPham p WHERE p.gia_goc <= ?1 AND p.danhmuc.danh_mucId = ?2 AND p.ten_san_pham = ?3")
	List<SanPham> findSanPhamByPriceLessHaveDanhMucAndText(Long price, String danhmuc, String text);

	// Theo price, danhmuc và isChecked (có giảm giá)
	@Query("SELECT p FROM SanPham p WHERE p.gia_goc <= ?1 AND p.danhmuc.danh_mucId = ?2 AND p.phantram_GG > 0")
	List<SanPham> findSanPhamByPriceLessHaveDanhMucAndDiscount(Long price, String danhmuc);

	// Theo price, danhmuc và sosao
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.gia_goc <= ?1 AND p.danhmuc.danh_mucId = ?2 AND d.so_sao = ?3")
	List<SanPham> findSanPhamByPriceLessHaveDanhMucAndSosao(Long price, String danhmuc, int sosao);

	// Theo price, text và isChecked (có giảm giá)
	@Query("SELECT p FROM SanPham p WHERE p.gia_goc <= ?1 AND p.ten_san_pham = ?2 AND p.phantram_GG > 0")
	List<SanPham> findSanPhamByPriceLessHaveTextAndDiscount(Long price, String text);

	// . Theo price, text và sosao
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.gia_goc <= ?1 AND p.ten_san_pham = ?2 AND d.so_sao = ?3")
	List<SanPham> findSanPhamByPriceLessHaveTextAndSosao(Long price, String text, int sosao);

	// Theo price, isChecked (có giảm giá) và sosao
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.gia_goc <= ?1 AND p.phantram_GG > 0 AND d.so_sao = ?2")
	List<SanPham> findSanPhamByPriceLessHaveDiscountAndSosao(Long price, int sosao);

	// Theo price, danhmuc, text, và isChecked (có giảm giá)
	@Query("SELECT p FROM SanPham p WHERE p.gia_goc <= ?1 AND p.danhmuc.danh_mucId = ?2 AND p.ten_san_pham = ?3 AND p.phantram_GG > 0")
	List<SanPham> findSanPhamByPriceLessHaveDanhMucAndTextAndDiscount(Long price, String danhmuc, String text);

	// Theo price, danhmuc, text, và sosao
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.gia_goc <= ?1 AND p.danhmuc.danh_mucId = ?2 AND p.ten_san_pham = ?3 AND d.so_sao = ?4")
	List<SanPham> findSanPhamByPriceLessHaveDanhMucAndTextAndSosao(Long price, String danhmuc, String text, int sosao);

	// Theo price, danhmuc, isChecked (có giảm giá) và sosao
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.gia_goc <= ?1 AND p.danhmuc.danh_mucId = ?2 AND p.phantram_GG > 0 AND d.so_sao = ?3")
	List<SanPham> findSanPhamByPriceLessHaveDanhMucAndDiscountAndSosao(Long price, String danhmuc, int sosao);

	// Theo price, text, isChecked (có giảm giá) và sosao
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.gia_goc <= ?1 AND p.ten_san_pham = ?2 AND p.phantram_GG > 0 AND d.so_sao = ?3")
	List<SanPham> findSanPhamByPriceLessHaveTextAndDiscountAndSosao(Long price, String text, int sosao);

	// Theo tất cả các điều kiện: price, danhmuc, text, isChecked (có giảm giá), và
	// sosao
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.gia_goc <= ?1 AND p.danhmuc.danh_mucId = ?2 AND p.ten_san_pham = ?3 AND p.phantram_GG > 0 AND d.so_sao = ?4")
	List<SanPham> findSanPhamByAllConditions(Long price, String danhmuc, String text, int sosao);

	// end tìm kiếm theo giá dưới 10000

	// start tìm sản phẩm theo giá lớn hơn 100000
	// tìm sản phẩm theo giá lớn hơn
	@Query("SELECT p FROM SanPham p WHERE p.gia_goc >= ?1")
	List<SanPham> findSanPhamByPriceMore(Long price);

	// Theo price lớn hơn và danhmuc
	@Query("SELECT p FROM SanPham p WHERE p.gia_goc >= ?1 AND p.danhmuc.danh_mucId = ?2")
	List<SanPham> findSanPhamByPriceMoreAndDanhMuc(Long price, String danhmuc);

	// Theo price lớn hơn và text
	@Query("SELECT p FROM SanPham p WHERE p.gia_goc >= ?1 AND p.ten_san_pham = ?2")
	List<SanPham> findSanPhamByPriceMoreAndText(Long price, String text);

	// Theo price lớn hơn và isChecked (có giảm giá)
	@Query("SELECT p FROM SanPham p WHERE p.gia_goc >= ?1 AND p.phantram_GG > 0")
	List<SanPham> findSanPhamByPriceMoreAndDiscount(Long price);

	// Theo price lớn hơn và sosao
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.gia_goc >= ?1 AND d.so_sao = ?2")
	List<SanPham> findSanPhamByPriceMoreAndSosao(Long price, int sosao);

	// Theo price lớn hơn, danhmuc và text
	@Query("SELECT p FROM SanPham p WHERE p.gia_goc >= ?1 AND p.danhmuc.danh_mucId = ?2 AND p.ten_san_pham = ?3")
	List<SanPham> findSanPhamByPriceMoreAndDanhMucAndText(Long price, String danhmuc, String text);

	// Theo price lớn hơn, danhmuc và isChecked (có giảm giá)
	@Query("SELECT p FROM SanPham p WHERE p.gia_goc >= ?1 AND p.danhmuc.danh_mucId = ?2 AND p.phantram_GG > 0")
	List<SanPham> findSanPhamByPriceMoreAndDanhMucAndDiscount(Long price, String danhmuc);

	// Theo price lớn hơn, danhmuc và sosao
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.gia_goc >= ?1 AND p.danhmuc.danh_mucId = ?2 AND d.so_sao = ?3")
	List<SanPham> findSanPhamByPriceMoreAndDanhMucAndSosao(Long price, String danhmuc, int sosao);

	// Theo price lớn hơn, text và isChecked (có giảm giá)
	@Query("SELECT p FROM SanPham p WHERE p.gia_goc >= ?1 AND p.ten_san_pham = ?2 AND p.phantram_GG > 0")
	List<SanPham> findSanPhamByPriceMoreAndTextAndDiscount(Long price, String text);

	// Theo price lớn hơn, text và sosao
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.gia_goc >= ?1 AND p.ten_san_pham = ?2 AND d.so_sao = ?3")
	List<SanPham> findSanPhamByPriceMoreAndTextAndSosao(Long price, String text, int sosao);

	// Theo price lớn hơn, isChecked (có giảm giá) và sosao
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.gia_goc >= ?1 AND p.phantram_GG > 0 AND d.so_sao = ?2")
	List<SanPham> findSanPhamByPriceMoreAndDiscountAndSosao(Long price, int sosao);

	// Theo price lớn hơn, danhmuc, text, và isChecked (có giảm giá)
	@Query("SELECT p FROM SanPham p WHERE p.gia_goc >= ?1 AND p.danhmuc.danh_mucId = ?2 AND p.ten_san_pham = ?3 AND p.phantram_GG > 0")
	List<SanPham> findSanPhamByPriceMoreAndDanhMucAndTextAndDiscount(Long price, String danhmuc, String text);

	// Theo price lớn hơn, danhmuc, text, và sosao
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.gia_goc >= ?1 AND p.danhmuc.danh_mucId = ?2 AND p.ten_san_pham = ?3 AND d.so_sao = ?4")
	List<SanPham> findSanPhamByPriceMoreAndDanhMucAndTextAndSosao(Long price, String danhmuc, String text, int sosao);

	// Theo price lớn hơn, danhmuc, isChecked (có giảm giá) và sosao
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.gia_goc >= ?1 AND p.danhmuc.danh_mucId = ?2 AND p.phantram_GG > 0 AND d.so_sao = ?3")
	List<SanPham> findSanPhamByPriceMoreAndDanhMucAndDiscountAndSosao(Long price, String danhmuc, int sosao);

	// Theo price lớn hơn, text, isChecked (có giảm giá) và sosao
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.gia_goc >= ?1 AND p.ten_san_pham = ?2 AND p.phantram_GG > 0 AND d.so_sao = ?3")
	List<SanPham> findSanPhamByPriceMoreAndTextAndDiscountAndSosao(Long price, String text, int sosao);

	// Theo tất cả các điều kiện: price lớn hơn, danhmuc, text, isChecked (có giảm
	// giá) và sosao
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE p.gia_goc >= ?1 AND p.danhmuc.danh_mucId = ?2 AND p.ten_san_pham = ?3 AND p.phantram_GG > 0 AND d.so_sao = ?4")
	List<SanPham> findSanPhamByAllConditionsWithPriceMore(Long price, String danhmuc, String text, int sosao);

	// end tìm sản phẩm theo giá lớn hơn 100000

	// tìm kiếm sản phẩn theo tên và số sao có GG
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE d.so_sao = ?1 AND p.ten_san_pham LIKE %?2% AND p.phantram_GG >0")
	List<SanPham> findSanPhamBySoSaoAndNameHaveDisCount(int sosao, String name);

	// tìm kiếm sản phẩn theo danh mục và số sao có GG
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE d.so_sao = ?1 AND p.danhmuc.danh_mucId = ?2 AND p.phantram_GG >0")
	List<SanPham> findSanPhamBySoSaoAndDanhMucHaveDisCount(int sosao, String id);

	// tìm kiếm sản phẩn theo danh mục và name và số sao có GG
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE d.so_sao = ?1 AND p.danhmuc.danh_mucId = ?2 AND  p.ten_san_pham LIKE %?3% AND  p.phantram_GG >0")
	List<SanPham> findSanPhamBySoSaoAndDanhMucAndNameHaveDisCount(int sosao, String id, String name);

	// tìm kiếm sản phẩn theo tên và số sao có GG
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE d.so_sao = ?1 AND p.ten_san_pham LIKE %?2%")
	List<SanPham> findSanPhamBySoSaoAndName(int sosao, String name);

	// tìm kiếm sản phẩn theo danh mục và số sao có GG
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE d.so_sao = ?1 AND p.danhmuc.danh_mucId = ?2 ")
	List<SanPham> findSanPhamBySoSaoAndDanhMuc(int sosao, String id);

	// tìm kiếm sản phẩn theo danh mục và name và số sao có GG
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE d.so_sao = ?1 AND p.danhmuc.danh_mucId = ?2 AND  p.ten_san_pham LIKE %?3% ")
	List<SanPham> findSanPhamBySoSaoAndDanhMucAndName(int sosao, String id, String name);

	// tìm sản phẩm theo số sao có gg
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d WHERE d.so_sao = ?1 AND p.phantram_GG >0")
	List<SanPham> findSanPhamBySoSaoHaveDiscount(int sosao);

//	            tìm theo 5 SAO

	// tìm kiếm sản phẩn theo tên và số sao có GG
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.ten_san_pham LIKE %?1% AND p.phantram_GG >0")
	List<SanPham> findSanPhamBySoSaoEqual5AndNameHaveDisCount(String name);

	// tìm kiếm sản phẩn theo danh mục và số sao có GG
	@Query("SELECT p FROM SanPham p JOIN p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.danhmuc.danh_mucId = ?1 AND p.phantram_GG >0")
	List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucHaveDisCount(String id);

	// tìm kiếm sản phẩn theo danh mục và name và số sao có GG
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.danhmuc.danh_mucId = ?1 AND  p.ten_san_pham LIKE %?2% AND  p.phantram_GG >0")
	List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucAndNameHaveDisCount(String id, String name);

	// tìm sản phẩm theo số sao có gg
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.phantram_GG >0")
	List<SanPham> findSanPhamBySoSaoEqual5HaveDiscount();

	// tìm sản phẩm theo giá nhỏ hơn 10000 5 sao có gg
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.gia_goc <= ?1  AND p.phantram_GG >0")
	List<SanPham> findSanPhamBySoSaoEqual5Less10kHaveDiscount(long price);

	// tìm sản phẩm theo giá lớn hơn 100000 5 sao có gg
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.gia_goc >= ?1  AND p.phantram_GG >0")
	List<SanPham> findSanPhamBySoSaoEqual5More100kHaveDiscount(long price);

	// tìm sản phẩm default 5 sao có gg
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.gia_goc BETWEEN ?1 AND  ?2  AND p.phantram_GG >0")
	List<SanPham> findSanPhamBySoSaoEqual5DefaultHaveDiscount(long default1, long default2);

	// tìm name nhỏ 5 sao có gg
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.gia_goc <= ?1 AND p.ten_san_pham LIKE %?2%   AND p.phantram_GG >0")
	List<SanPham> findSanPhamBySoSaoAndNameEqual5Less10kHaveDiscount(long price, String name);

	// tìm name lớn 5 sao lớn có gg
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.gia_goc >= ?1 AND p.ten_san_pham LIKE %?2%   AND p.phantram_GG >0")
	List<SanPham> findSanPhamBySoSaoAndNameEqual5More100kHaveDiscount(long price, String name);

	// tìm danhmuc nhỏ 5 sao có gg
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.gia_goc <= ?1 AND p.danhmuc.danh_mucId =?2   AND p.phantram_GG >0")
	List<SanPham> findSanPhamBySoSaoAnddanhmucEqual5Less10kHaveDiscount(long price, String danhmuc);

	// tìm danhmuc lớn 5 sao lớn có gg
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.gia_goc >= ?1 AND p.danhmuc.danh_mucId =?2   AND p.phantram_GG >0")
	List<SanPham> findSanPhamBySoSaoAnddanhmucEqual5More100kHaveDiscount(long price, String danhmuc);

	// tìm name danh muc 5 nhỏ sao có gg
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.gia_goc <= ?1 AND p.ten_san_pham LIKE %?2%  AND p.danhmuc.danh_mucId = ?3  AND p.phantram_GG >0")
	List<SanPham> findSanPhamBySoSaoAndNameAndDanhmucEqual5Less10kHaveDiscount(long price, String name, String danhmuc);

	// tìm name danh muc lớn 5 sao có gg
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.gia_goc >= ?1 AND p.ten_san_pham LIKE %?2% AND p.danhmuc.danh_mucId = ?3  AND p.phantram_GG >0")
	List<SanPham> findSanPhamBySoSaoAndNameAndDanhmucEqual5More100kHaveDiscount(long price, String name,
			String danhmuc);

	// tìm name min max 5 sao có gg
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.gia_goc BETWEEN ?1 AND  ?2 AND p.ten_san_pham LIKE %?3%    AND p.phantram_GG >0")
	List<SanPham> findSanPhamBySoSaoEqual5DefaulAnhdNametHaveDiscount(long default1, long default2, String name);

	// tìm danhmuc min max 5 sao có gg
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.gia_goc BETWEEN ?1 AND  ?2 AND p.danhmuc.danh_mucId = ?3 AND p.phantram_GG >0")
	List<SanPham> findSanPhamBySoSaoEqual5DefaulAndDanhmuctHaveDiscount(long default1, long default2, String danhmuc);

	// tìm name danhmuc min max 5 sao có gg
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.gia_goc BETWEEN ?1 AND  ?2 AND p.danhmuc.danh_mucId = ?3 AND p.ten_san_pham LIKE %?4%  AND p.phantram_GG >0")
	List<SanPham> findSanPhamBySoSaoEqual5DefaulAndDanhmucAndNametHaveDiscount(long default1, long default2,
			String danhmuc, String name);

	// ko có giảm giá
	// tìm sản phẩm theo số sao có gg
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 ")
	List<SanPham> findSanPhamBySoSaoEqual5();

	// tìm kiếm sản phẩn theo tên và số sao

	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.ten_san_pham LIKE %?1%")
	List<SanPham> findSanPhamBySoSaoEqual5AndName(String name);

	// tìm kiếm sản phẩn theo danh mục và số sao
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.danhmuc.danh_mucId = ?1 ")
	List<SanPham> findSanPhamBySoSaoEqual5AndDanhMuc(String id);

	// tìm kiếm sản phẩn theo danh mục và name và số sao
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.danhmuc.danh_mucId = ?1 AND  p.ten_san_pham LIKE %?2% ")
	List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucAndName(String id, String name);

	// tìm sản phẩm theo giá nhỏ hơn 10000 5 sao có gg
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.gia_goc <= ?1 ")
	List<SanPham> findSanPhamBySoSaoEqual5Less10k(long price);

	// tìm sản phẩm theo giá lớn hơn 100000 5 sao có gg
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.gia_goc >= ?1  ")
	List<SanPham> findSanPhamBySoSaoEqual5More100k(long price);

	// tìm sản phẩm default 5 sao có gg
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.gia_goc BETWEEN ?1 AND  ?2 ")
	List<SanPham> findSanPhamBySoSaoEqual5Default(long default1, long default2);

	// tìm name nhỏ 5 sao có gg
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.gia_goc <= ?1 AND p.ten_san_pham LIKE %?2%   ")
	List<SanPham> findSanPhamBySoSaoAndNameEqual5Less10k(long price, String name);

	// tìm name lớn 5 sao có gg
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.gia_goc >= ?1 AND p.ten_san_pham LIKE %?2%  ")
	List<SanPham> findSanPhamBySoSaoAndNameEqual5More100k(long price, String name);

	// tìm name danh muc 5 nhỏ sao có gg
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.gia_goc <= ?1 AND p.ten_san_pham LIKE %?2%  AND p.danhmuc.danh_mucId = ?3 ")
	List<SanPham> findSanPhamBySoSaoAndNameAndDanhmucEqual5Less10k(long price, String name, String danhmuc);

	// tìm name danh muc lớn 5 sao có gg
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.gia_goc >= ?1 AND p.ten_san_pham LIKE %?2% AND p.danhmuc.danh_mucId = ?3 ")
	List<SanPham> findSanPhamBySoSaoAndNameAndDanhmucEqual5More100k(long price, String name, String danhmuc);

	// tìm name min max 5 sao có gg
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.gia_goc BETWEEN ?1 AND  ?2 AND p.ten_san_pham LIKE %?3%   ")
	List<SanPham> findSanPhamBySoSaoEqual5DefaultAndName(long default1, long default2, String name);

	// tìm danhmuc min max 5 sao có gg
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.gia_goc BETWEEN ?1 AND  ?2 AND p.danhmuc.danh_mucId = ?3 ")
	List<SanPham> findSanPhamBySoSaoEqual5DefaultAndDanhmuc(long default1, long default2, String danhmuc);

	// tìm name danhmuc min max 5 sao có gg
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.gia_goc BETWEEN ?1 AND  ?2 AND p.danhmuc.danh_mucId = ?3 AND p.ten_san_pham LIKE %?4%  ")
	List<SanPham> findSanPhamBySoSaoEqual5DefaultAndDanhmucAndName(long default1, long default2, String danhmuc,
			String name);

	// tìm danhmuc nhỏ 5 sao
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.gia_goc <= ?1 AND p.danhmuc.danh_mucId =?2   ")
	List<SanPham> findSanPhamBySoSaoAnddanhmucEqual5Less10k(long price, String danhmuc);

	// tìm danhmuc lớn 5 sao lớn
	@Query("SELECT p FROM SanPham p JOIN  p.danhgia d GROUP BY p HAVING AVG(d.so_sao) = 5 AND p.gia_goc >= ?1 AND p.danhmuc.danh_mucId =?2  ")
	List<SanPham> findSanPhamBySoSaoAnddanhmucEqual5More100k(long price, String danhmuc);

	// END tìm theo 5 SAO

//						 START Thương hiệu
	@Query("SELECT s.san_phamId, s.ten_san_pham, s.ngay_tao, s.gia_goc, s.gia_km, s.mo_ta, s.phantram_GG, "
			+ "s.so_luong, s.han_gg, s.trang_thai_kho, s.luot_mua, s.hoat_dong, s.phe_duyet, s.trang_thai_xoa, "
			+ "s.chieu_cao, s.chieu_dai, s.chieu_rong, s.khoi_luong, "
			+ "(SELECT AVG(dg.so_sao) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soSao, "
			+ "(SELECT COUNT(dg) FROM DanhGia dg WHERE dg.sanpham.san_phamId = s.san_phamId) AS soDanhGia, "
			+ "(SELECT h.ten_hinh FROM HinhAnh h WHERE h.sanpham.san_phamId = s.san_phamId AND h.id = "
			+ "(SELECT MIN(hh.id) FROM HinhAnh hh WHERE hh.sanpham.san_phamId = s.san_phamId)) AS tenHinhDauTien "
			+ "FROM SanPham s WHERE  s.hoat_dong = 'On' AND s.trang_thai_xoa is null AND  s.thuonghieu.thuong_hieuID = ?1  AND s.thuonghieu.hoat_dong = 'On' AND s.thuonghieu.trang_thai_xoa is null AND s.danhmuc.hoat_dong = 'On' AND s.danhmuc.trang_thai_xoa is null")
	List<Object[]> findSanPhamByThuongHieuId(String id);

//	                   END Thương hiệu

	// tìm theo nhiều id
	@Query("SELECT s FROM SanPham s WHERE s.danhmuc.danh_mucId IN :ids")
	List<SanPham> findAllByDanhMucIds(@Param("ids") List<String> danhMucIds);

	// new

	@Query("SELECT s FROM SanPham s JOIN s.danhgia d WHERE  d.so_sao = ?1 AND s.ten_san_pham LIKE %?2% AND s.phantram_GG >0")
	List<SanPham> findSanPhambyTextAndSoSaoHaveDiscount(int sosao, String name);

	@Query("SELECT s FROM SanPham s JOIN s.danhgia d WHERE  d.so_sao = ?1 AND s.ten_san_pham LIKE %?2%")
	List<SanPham> findSanPhambyTextAndSoSao(int sosao, String name);
	//end lợi
	
}
