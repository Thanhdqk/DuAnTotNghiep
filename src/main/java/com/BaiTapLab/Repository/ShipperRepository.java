package com.BaiTapLab.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.BaiTapLab.Entity.Shipper;
import com.BaiTapLab.Entity.Users;

import jakarta.transaction.Transactional;

public interface ShipperRepository extends JpaRepository<Shipper, String>{
	Optional<Shipper> findByShipperIDAndPassword(String shipperID, String password);
	Shipper findByShipperID(String shipperID);
	
	// Liệt kê shipper 
	@Query(value = "select sp.shipperid, sp.hovaten, sp.vai_tro, sp.hoat_dong, sp.hinh_anh, sp.trang_thai_xoa from shipper sp\r\n"
			, nativeQuery = true)
	List<Object[]> danhSachShipper();
		
	// Liệt kê shipper với đơn hàng mã shipper đã giao
	@Query(value = "select sp.shipperid, sp.hovaten, dh.don_hangid, sp.vai_tro, dh.thoi_gianxn, sp.hoat_dong, sp.hinh_anh"
			+ " from shipper sp\r\n"
			+ "JOIN donhang dh on sp.shipperid = dh.shipperid", nativeQuery = true)
	List<Object[]> danhSachShipperDaGiao();
	
	// Chi tiết shipper
	@Query(value = "select shipperid, hovaten, password, hoat_dong from shipper\r\n"
			+ "where shipperid = :shipperID", nativeQuery = true)
	List<Object[]> chiTietShipper(@Param("shipperID") String shipperID);
	
	// Update shipperID
	@Modifying
	@Transactional
	@Query(value = "update shipper\r\n"
			+ "set trang_thai_xoa = N'Đã xóa', hoat_dong = 'Off'\r\n"
			+ "where shipperid = :shipperid", nativeQuery = true)
	int updateShipper(@Param("shipperid") String shipperid);
	
	// Khôi phục shipperID
	@Modifying
	@Transactional
	@Query(value = "update shipper\r\n"
			+ "set trang_thai_xoa = NULL, hoat_dong = 'On'\r\n"
			+ "where shipperid = :shipperid", nativeQuery = true)
	int updateKhoiPhucShipper(@Param("shipperid") String shipperid);
}
