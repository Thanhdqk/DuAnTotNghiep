package com.BaiTapLab.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.DonHang;

public interface DonHangRepository extends JpaRepository<DonHang, String> {
    
    @Query("SELECT COUNT(d) " +
           "FROM DonHang d " +
           "WHERE YEAR(d.ngay_tao) = YEAR(:currentDate) " +
           "AND MONTH(d.ngay_tao) = MONTH(:currentDate) " +
           "AND d.trang_thai = 'Đã giao'")
    Integer countAllDonHang(LocalDate currentDate);

    @Query("SELECT SUM(dh.tong_tien - dh.phi_ship) " +
           "FROM DonHang dh " +
           "WHERE MONTH(dh.ngay_tao) = MONTH(CURRENT_DATE()) " +
           "AND YEAR(dh.ngay_tao) = YEAR(CURRENT_DATE()) " +
           "AND dh.trang_thai = 'Đã giao'")
    Double doanhthuDonHang();

    @Query("SELECT COUNT(DISTINCT d.users.accountID) " +
           "FROM DonHang d " +
           "WHERE MONTH(d.ngay_tao) = MONTH(CURRENT_DATE()) " +
           "AND YEAR(d.ngay_tao) = YEAR(CURRENT_DATE()) " +
           "AND d.trang_thai = 'Đã giao'")
    Integer countUniqueCustomersInCurrentMonth();
    
    @Query("SELECT " +
    	       "    (dh.tong_tien - dh.phi_ship) - SUM(sp.tien_nhap_hang) " +
    	       "FROM " +
    	       "    DonHang dh " +
    	       "JOIN " +
    	       "    DonHangChiTiet dhct ON dh = dhct.donhang " +
    	       "JOIN " +
    	       "    SanPham sp ON dhct.sanpham = sp " +
    	       "WHERE " +
    	       "    dh.trang_thai = 'Đã giao' " +
    	       "    AND MONTH(dh.ngay_tao) = MONTH(CURRENT_DATE()) " +
    	       "    AND YEAR(dh.ngay_tao) = YEAR(CURRENT_DATE()) " +
    	       "GROUP BY " +
    	       "    dh.don_hangid, dh.tong_tien, dh.phi_ship")
    Double tinhLoiNhuanDonHangHienTai();

    @Query("SELECT SUM(dh.tong_tien - dh.phi_ship) " +
    	       "FROM DonHang dh " +
    	       "WHERE MONTH(dh.ngay_tao) = :month " +
    	       "AND YEAR(dh.ngay_tao) = :year " +
    	       "AND dh.trang_thai = 'Đã giao'")
    Double getDoanhThuByMonthAndYear(@Param("month") int month, @Param("year") int year);

    @Query("SELECT d.trang_thai, COUNT(d) FROM DonHang d WHERE FUNCTION('MONTH', d.ngay_tao) = :month AND FUNCTION('YEAR', d.ngay_tao) = :year GROUP BY d.trang_thai")
    List<Object[]> countByTrangThaiAndMonthAndYear(@Param("month") int month, @Param("year") int year);
}
