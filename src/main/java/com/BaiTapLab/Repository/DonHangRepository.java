package com.BaiTapLab.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.DonHang;
import com.BaiTapLab.Entity.DonHangChiTiet;
import com.BaiTapLab.Entity.Shipper;

import jakarta.transaction.Transactional;


public interface DonHangRepository extends JpaRepository<DonHang, String> {
	// Của Thành
	// Cập nhật trạng thái hoàn tiền
	@Transactional
	@Modifying
	@Query("update DonHang\r\n"
			+ "set trang_thai = :trangThai\r\n"
			+ "where online_payment_id = :online_payment_id")
	int updateHoanTien(@Param("trangThai") String trangThai, @Param("online_payment_id") String online_payment_id);
	
	// Liệt kê danh sách đơn hàng
	@Query("select don_hangid, dh.users.accountID, "
			+ "so_dien_thoai, ngay_tao, thoi_gianXN, trang_thai, tong_tien, dh.phuongthuctt.phuong_thucTTID, "
			+ "dh.online_payment_id from DonHang dh")
    List<Object[]> listAllDonHang();
	
    @Query("SELECT COUNT(d) " +
    	       "FROM DonHang d " +
    	       "WHERE YEAR(d.ngay_tao) = YEAR(:currentDate) " +
    	       "AND MONTH(d.ngay_tao) = MONTH(:currentDate) " +
    	       "AND d.trang_thai = :trangThai")
    Integer countAllDonHang(LocalDate currentDate, String trangThai);

    @Query("SELECT SUM(dh.tong_tien - dh.phi_ship) " +
            "FROM DonHang dh " +
            "WHERE MONTH(dh.ngay_tao) = MONTH(CURRENT_DATE()) " +
            "AND YEAR(dh.ngay_tao) = YEAR(CURRENT_DATE()) " +
            "AND dh.trang_thai = :trangThai")
    Double doanhthuDonHang(String trangThai);
    
    @Query("SELECT COUNT(DISTINCT d.users.accountID) " +
            "FROM DonHang d " +
            "WHERE MONTH(d.ngay_tao) = MONTH(CURRENT_DATE()) " +
            "AND YEAR(d.ngay_tao) = YEAR(CURRENT_DATE()) " +
            "AND d.trang_thai = :trangThai")
     Integer countUniqueCustomersInCurrentMonth(String trangThai);
    
    @Query("SELECT " +
    	       "    (dh.tong_tien - dh.phi_ship) - SUM(sp.tien_nhap_hang * dhct.so_luong) " +
    	       "FROM " +
    	       "    DonHang dh " +
    	       "JOIN " +
    	       "    DonHangChiTiet dhct ON dh = dhct.donhang " +
    	       "JOIN " +
    	       "    SanPham sp ON dhct.sanpham = sp " +
    	       "WHERE " +
    	       "    dh.trang_thai = :trangThai " +
    	       "    AND MONTH(dh.ngay_tao) = MONTH(CURRENT_DATE()) " +
    	       "    AND YEAR(dh.ngay_tao) = YEAR(CURRENT_DATE()) " +
    	       "GROUP BY " +
    	       "    dh.don_hangid, dh.tong_tien, dh.phi_ship")
    Double tinhLoiNhuanDonHangHienTai(String trangThai);
    
    @Query("SELECT SUM(dh.tong_tien - dh.phi_ship) " +
 	       "FROM DonHang dh " +
 	       "WHERE MONTH(dh.ngay_tao) = :month " +
 	       "AND YEAR(dh.ngay_tao) = :year " +
 	       "AND dh.trang_thai = :trangThai")
    Double getDoanhThuByMonthAndYear(@Param("month") int month, @Param("year") int year, String trangThai);
    
    @Query("SELECT new map(CAST(dh.ngay_tao AS DATE) as date, SUM(dh.tong_tien - dh.phi_ship) as doanhThu) " +
    	       "FROM DonHang dh " +
    	       "WHERE dh.ngay_tao BETWEEN :startDate AND :endDate " +
    	       "AND dh.trang_thai = :trangThai " +
    	       "GROUP BY CAST(dh.ngay_tao AS DATE) " +
    	       "ORDER BY CAST(dh.ngay_tao AS DATE)")
    List<Map<String, Object>> getDoanhThuByDateRange(
    	        @Param("startDate") LocalDate startDate,
    	        @Param("endDate") LocalDate endDate,
    	        @Param("trangThai") String trangThai);


    @Query("SELECT d.trang_thai, COUNT(d) FROM DonHang d WHERE FUNCTION('MONTH', d.ngay_tao) = :month AND FUNCTION('YEAR', d.ngay_tao) = :year GROUP BY d.trang_thai")
    List<Object[]> countByTrangThaiAndMonthAndYear(@Param("month") int month, @Param("year") int year);   
    
    @Query(value = "SELECT dh.don_hangid, dh.ghi_chu, dhct.so_luong AS soLuongDonHang, " +
            "dhct.tong_tien AS tienSanPham, pttt.ten_phuong_thuc, sp.ten_san_pham, us.hovaten, dh.ngay_tao, dh.thoi_gianxn, " +
            "dh.tong_tien AS tongTienDonHang, " +
            "(SELECT TOP 1 ha.ten_hinh " +
            " FROM hinhanh ha " +
            " WHERE ha.san_pham_id = sp.san_pham_id " +
            " ORDER BY ha.id ASC) AS tenHinh, " +
            "vc.ma_voucher, dh.accountid, dh.thoi_gian_du_kien, dh.trang_thai, dh.phi_ship, " +
            "us.so_dien_thoai, dc.dia_chi, dc.phuong, dc.quan, dc.thanh_pho, dh.ly_do " +
            "FROM donhang dh " +
            "JOIN donhangchitiet dhct ON dh.don_hangid = dhct.don_hangid " +
            "JOIN phuongthuctt pttt ON dh.phuong_thucttid = pttt.phuong_thucttid " +
            "JOIN sanpham sp ON dhct.san_pham_id = sp.san_pham_id " +
            "LEFT JOIN voucher vc ON vc.voucherid = dh.voucherid " +
            "JOIN users us ON us.accountid = dh.accountid " +
            "JOIN diachi dc ON dc.accountid = dh.accountid " +
            "WHERE dh.don_hangid = :donHangId " +
            "GROUP BY dh.don_hangid, dh.ghi_chu, dhct.so_luong, dhct.tong_tien, " +
            "pttt.ten_phuong_thuc, sp.ten_san_pham, dh.tong_tien, vc.ma_voucher, dh.accountid, " +
            "dh.thoi_gian_du_kien, dh.trang_thai, dh.phi_ship, us.so_dien_thoai, " +
            "dc.dia_chi, dc.phuong, dc.quan, dc.thanh_pho, sp.san_pham_id, us.hovaten, dh.ngay_tao, dh.thoi_gianxn, dh.ly_do",
	    nativeQuery = true)
	List<Object[]> getDonHangDetailById(@Param("donHangId") String donHangId);
     
     @Modifying
     @Transactional
     @Query("update DonHang d set d.trang_thai = :trangThai where d.don_hangid = :donHangId")
     int updateTrangThaiDonHang(@Param("trangThai") String trangThai, @Param("donHangId") String donHangId);
	
	
	@Modifying
	@Transactional
	@Query("UPDATE DonHang d SET d.trang_thai = :trangThai, " +
	       "d.thoi_gianXN = :thoiGianXacNhan " +
	       "WHERE d.don_hangid = :donHangId")
	int updateTrangThaiDonHangDaXacNhan(@Param("trangThai") String trangThai, 
	                           @Param("thoiGianXacNhan") LocalDate thoiGianXacNhan, 
	                           @Param("donHangId") String donHangId);
	
	// Shipper nè
	@Query("select dh.don_hangid, dh.thoi_gian_du_kien from DonHang dh\r\n"
			+ "where dh.trang_thai = :trangThai") 
	List<Object[]> danhSachChuaNhanDon(@Param("trangThai") String trangThai);
	
	@Query(value = "SELECT dh.don_hangid, dh.tong_tien, us.hovaten, " +
            "us.so_dien_thoai, dc.dia_chi, dc.phuong, dc.quan, " +
            "dc.thanh_pho, sp.ten_san_pham, dhct.tong_tien, dhct.so_luong, us.accountid, pttt.phuong_thucttid, "
            + "dh.trang_thai " +
            "FROM donhang dh " +
            "LEFT JOIN users us ON dh.accountid = us.accountid " +
            "LEFT JOIN diachi dc ON dc.accountid = dh.accountid " +
            "LEFT JOIN donhangchitiet dhct ON dhct.don_hangid = dh.don_hangid " +
            "LEFT JOIN sanpham sp ON sp.san_pham_id = dhct.san_pham_id " +
            "LEFT JOIN phuongthuctt pttt ON pttt.phuong_thucttid = dh.phuong_thucttid " +
            "WHERE dh.don_hangid = ?", nativeQuery = true)
	List<Object[]> findDonHangDetailsById(String donhangid);
	
	@Modifying
	@Transactional
	@Query("UPDATE DonHang " +
	       "SET trang_thai = :trangThai, " +
	       "shipper = (SELECT s FROM Shipper s WHERE s.id = :shipperId), " +
	       "trang_thai_nhan_don = :trangThaiNhanDon " +
	       "WHERE don_hangid = :donHangId")
	int updateDonHangShipper(
	        @Param("trangThai") String trangThai,
	        @Param("shipperId") String shipperId, // ID shipper từ frontend
	        @Param("trangThaiNhanDon") String trangThaiNhanDon,
	        @Param("donHangId") String donHangId);

	@Query("SELECT d.don_hangid, d.thoi_gian_du_kien FROM DonHang d WHERE d.shipper.shipperID = :shipperid and d.trang_thai_nhan_don =:trangThaiNhanDon")
	List<Object[]> findDonHangByShipperId(@Param("shipperid") String shipperid, @Param("trangThaiNhanDon") String trangThaiNhanDon);
	
	@Modifying
	@Transactional
	@Query("UPDATE DonHang dh " +
	       "SET dh.hinh_anh = :hinhAnh " +
	       "WHERE dh.don_hangid = :donHangId")
	int updateDonHangHinhAnhShipper(
	        @Param("hinhAnh") String hinhAnh,
	        @Param("donHangId") String donHangId);
	
	@Modifying
	@Transactional
	@Query("UPDATE DonHang dh " +
	       "SET dh.trang_thai = :trangThai, " +
	       "dh.trang_thai_nhan_don = :trangThaiNhanDon " +
	       "WHERE dh.don_hangid = :donHangId")
	int updateDonHangHoanThanhShipper(
	        @Param("trangThai") String trangThai,
	        @Param("trangThaiNhanDon") String trangThaiNhanDon,
	        @Param("donHangId") String donHangId);
	
	@Modifying
	@Transactional
	@Query("UPDATE DonHang dh " +
	       "SET dh.trang_thai = :trangThai, " +
	       "dh.trang_thai_nhan_don = :trangThaiNhanDon, " +
	       "dh.ly_do = :lydo " +
	       "WHERE dh.don_hangid = :donHangId")
	int updateDonHangBiHuyShipper(
	        @Param("trangThai") String trangThai,
	        @Param("trangThaiNhanDon") String trangThaiNhanDon,
	        @Param("lydo") String lydo,
	        @Param("donHangId") String donHangId);
	
	@Query("SELECT d.hinh_anh FROM DonHang d WHERE d.don_hangid = :donHangId")
    String findHinhAnhByDonHangId(@Param("donHangId") String donHangId);
	
	// Best seller trên dashboard
	@Query(value = "SELECT TOP 10 \r\n"
            + "    MONTH(dh.ngay_tao) AS thang, \r\n"
            + "    YEAR(dh.ngay_tao) AS nam, \r\n"
            + "    sp.san_pham_id, \r\n"
            + "    sp.ten_san_pham, \r\n"
            + "    sp.gia_goc, \r\n"
            + "    (SELECT TOP 1 ha.ten_hinh \r\n"
            + "     FROM hinhanh ha \r\n"
            + "     WHERE sp.san_pham_id = ha.san_pham_id) AS ten_hinh, \r\n"
            + "    SUM(dhct.so_luong) AS tong_so_luong_ban\r\n"
            + "FROM \r\n"
            + "    donhang dh\r\n"
            + "LEFT JOIN \r\n"
            + "    donhangchitiet dhct ON dh.don_hangid = dhct.don_hangid\r\n"
            + "LEFT JOIN \r\n"
            + "    sanpham sp ON sp.san_pham_id = dhct.san_pham_id\r\n"
            + "WHERE \r\n"
            + "    dh.trang_thai = N'Đã giao' \r\n"
            + "    AND dh.trang_thai_nhan_don = N'Đã hoàn thành đơn'\r\n"
            + "    AND MONTH(dh.ngay_tao) = :thang AND YEAR(dh.ngay_tao) = :nam\r\n"
            + "GROUP BY \r\n"
            + "    YEAR(dh.ngay_tao), \r\n"
            + "    MONTH(dh.ngay_tao), \r\n"
            + "    sp.san_pham_id, \r\n"
            + "    sp.ten_san_pham, \r\n"
            + "    sp.gia_goc\r\n"
            + "ORDER BY \r\n"
            + "    tong_so_luong_ban DESC;", nativeQuery = true)
	List<Object[]> listSanPhamBestSeller(@Param("thang") int thang, @Param("nam") int nam);

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
            "    (SELECT AVG(so_sao) " +
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
            "    AND MONTH(dh.ngay_tao) = 11 " +
            "    AND YEAR(dh.ngay_tao) = 2024 " +
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
    List<Object[]> findSanPhamTheoThang11();
    
    // Count đơn hàng chưa nhận
    @Query(value = "select count(*) from donhang\r\n"
    		+ "where trang_thai = N'Đã xác nhận'", nativeQuery = true)
    int soLuongHangChuaNhan();
    
    // Count đơn hàng đã nhận
    @Query(value = "select count(*) from donhang\r\n"
    		+ "where trang_thai = N'Đang giao' and shipperid = :shipperid", nativeQuery = true)
    int soLuongHangDaNhan(@Param("shipperid") String shipperid);
    
    // Count đơn hàng đã giao
    @Query(value = "select count(*) from donhang\r\n"
    		+ "where trang_thai = N'Đã giao' and shipperid = :shipperid", nativeQuery = true)
    int soLuongHangDaGiao(@Param("shipperid") String shipperid);
    
    // Danh sách đơn đã giao
    @Query("SELECT d.don_hangid, d.thoi_gian_du_kien FROM DonHang d WHERE d.shipper.shipperID = :shipperid and d.trang_thai_nhan_don =:trangThaiNhanDon")
	List<Object[]> findDaGiaoByShipperID(@Param("shipperid") String shipperid, @Param("trangThaiNhanDon") String trangThaiNhanDon);
	
	// Phát
	@Query("Select p from DonHang p where p.phuongthuctt.phuong_thucTTID='ptt01' order by p.thoi_gianXN DESC limit 1 ")
	DonHang findlastedDH();

	@Query("Select p from DonHang p where p.trang_thai = ?1 ")
	List<DonHang> findbyStatus(String dieukien);

	@Query("SELECT dh FROM DonHang dh LEFT JOIN dh.diachi dc WHERE dh.users.accountID = :accountID")
	List<DonHang> findByUserIdWithAddress(@Param("accountID") String accountID);

	@Query("Select p from DonHang p where p.online_payment_id =?1")
	DonHang findbypaymentid(String id);


	@Query("select p.don_hangid from DonHang p where p.online_payment_id=?1 ")
	String donhangid(String id);
	
}
