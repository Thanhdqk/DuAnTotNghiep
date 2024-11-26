package com.BaiTapLab.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.DonHang;
import com.BaiTapLab.Entity.Shipper;

import jakarta.transaction.Transactional;

public interface DonHangRepository extends JpaRepository<DonHang, String> {
    
//    @Query("SELECT COUNT(d) " +
//           "FROM DonHang d " +
//           "WHERE YEAR(d.ngay_tao) = YEAR(:currentDate) " +
//           "AND MONTH(d.ngay_tao) = MONTH(:currentDate) " +
//           "AND d.trang_thai = 'Đã giao'")
//    Integer countAllDonHang(LocalDate currentDate);
    
    @Query("SELECT COUNT(d) " +
    	       "FROM DonHang d " +
    	       "WHERE YEAR(d.ngay_tao) = YEAR(:currentDate) " +
    	       "AND MONTH(d.ngay_tao) = MONTH(:currentDate) " +
    	       "AND d.trang_thai = :trangThai")
    Integer countAllDonHang(LocalDate currentDate, String trangThai);

//    @Query("SELECT SUM(dh.tong_tien - dh.phi_ship) " +
//           "FROM DonHang dh " +
//           "WHERE MONTH(dh.ngay_tao) = MONTH(CURRENT_DATE()) " +
//           "AND YEAR(dh.ngay_tao) = YEAR(CURRENT_DATE()) " +
//           "AND dh.trang_thai = 'Đã giao'")
//    Double doanhthuDonHang();
    
    @Query("SELECT SUM(dh.tong_tien - dh.phi_ship) " +
            "FROM DonHang dh " +
            "WHERE MONTH(dh.ngay_tao) = MONTH(CURRENT_DATE()) " +
            "AND YEAR(dh.ngay_tao) = YEAR(CURRENT_DATE()) " +
            "AND dh.trang_thai = :trangThai")
    Double doanhthuDonHang(String trangThai);

//    @Query("SELECT COUNT(DISTINCT d.users.accountID) " +
//           "FROM DonHang d " +
//           "WHERE MONTH(d.ngay_tao) = MONTH(CURRENT_DATE()) " +
//           "AND YEAR(d.ngay_tao) = YEAR(CURRENT_DATE()) " +
//           "AND d.trang_thai = 'Đã giao'")
//    Integer countUniqueCustomersInCurrentMonth();
    
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

//    @Query("SELECT SUM(dh.tong_tien - dh.phi_ship) " +
//    	       "FROM DonHang dh " +
//    	       "WHERE MONTH(dh.ngay_tao) = :month " +
//    	       "AND YEAR(dh.ngay_tao) = :year " +
//    	       "AND dh.trang_thai = 'Đã giao'")
//    Double getDoanhThuByMonthAndYear(@Param("month") int month, @Param("year") int year);
    
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
    
//    @Query(value = "SELECT dh.don_hangid, dh.ghi_chu, dhct.so_luong as soLuongDonHang, " +
//            "dhct.tong_tien as tienSanPham, pttt.ten_phuong_thuc, sp.ten_san_pham, " +
//            "dh.tong_tien as tongTienDonHang, MIN(ha.ten_hinh) as tenHinh, vc.ma_voucher, dh.accountid, " +
//            "dh.thoi_gian_du_kien, dh.trang_thai, dh.phi_ship, us.so_dien_thoai, " +
//            "dc.dia_chi, dc.phuong, dc.quan, dc.thanh_pho " +
//            "FROM donhang dh " +
//            "JOIN donhangchitiet dhct ON dh.don_hangid = dhct.don_hangid " +
//            "JOIN phuongthuctt pttt ON dh.phuong_thucttid = pttt.phuong_thucttid " +
//            "JOIN sanpham sp ON dhct.san_pham_id = sp.san_pham_id " +
//            "JOIN hinhanh ha ON sp.san_pham_id = ha.san_pham_id " +
//            "JOIN voucher vc ON vc.voucherid = dh.voucherid " +
//            "JOIN users us ON us.accountid = dh.accountid " +
//            "JOIN diachi dc ON dc.accountid = dh.accountid " +
//            "WHERE dh.don_hangid = :donHangId " +
//            "GROUP BY dh.don_hangid, dh.ghi_chu, dhct.so_luong, dhct.tong_tien, " +
//            "pttt.ten_phuong_thuc, sp.ten_san_pham, dh.tong_tien, vc.ma_voucher, dh.accountid, " +
//            "dh.thoi_gian_du_kien, dh.trang_thai, dh.phi_ship, us.so_dien_thoai, " +
//            "dc.dia_chi, dc.phuong, dc.quan, dc.thanh_pho",
//    nativeQuery = true)
//    List<Object[]> getDonHangDetailById(@Param("donHangId") String donHangId);
    
    @Query(value = "SELECT dh.don_hangid, dh.ghi_chu, dhct.so_luong AS soLuongDonHang, " +
            "dhct.tong_tien AS tienSanPham, pttt.ten_phuong_thuc, sp.ten_san_pham, us.hovaten, dh.ngay_tao, dh.thoi_gianxn, " +
            "dh.tong_tien AS tongTienDonHang, " +
            "(SELECT TOP 1 ha.ten_hinh " +
            " FROM hinhanh ha " +
            " WHERE ha.san_pham_id = sp.san_pham_id " +
            " ORDER BY ha.id ASC) AS tenHinh, " +
            "vc.ma_voucher, dh.accountid, dh.thoi_gian_du_kien, dh.trang_thai, dh.phi_ship, " +
            "us.so_dien_thoai, dc.dia_chi, dc.phuong, dc.quan, dc.thanh_pho " +
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
            "dc.dia_chi, dc.phuong, dc.quan, dc.thanh_pho, sp.san_pham_id, us.hovaten, dh.ngay_tao, dh.thoi_gianxn",
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
            "dc.thanh_pho, sp.ten_san_pham, dhct.tong_tien, dhct.so_luong " +
            "FROM donhang dh " +
            "LEFT JOIN users us ON dh.accountid = us.accountid " +
            "LEFT JOIN diachi dc ON dc.accountid = dh.accountid " +
            "LEFT JOIN donhangchitiet dhct ON dhct.don_hangid = dh.don_hangid " +
            "LEFT JOIN sanpham sp ON sp.san_pham_id = dhct.san_pham_id " +
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
}
