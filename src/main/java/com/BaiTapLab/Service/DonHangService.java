//package com.BaiTapLab.Service;
//
//import java.time.LocalDate;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.BaiTapLab.Repository.DonHangRepository;
//
//@Service
//public class DonHangService {
//	@Autowired
//	DonHangRepository donhangRepository;
//	
//	public Integer getTotalDonHang() {
//		return donhangRepository.countAllDonHang(LocalDate.now());
//	}
//	
//	public double getDoanhThu() {
//		return donhangRepository.doanhthuDonHang();
//	}
//	
//	public Integer getKhachHang() {
//		return donhangRepository.countUniqueCustomersInCurrentMonth();
//	}
//	
//	public Double getLoiNhuan() {
//		return donhangRepository.tinhLoiNhuanDonHangHienTai();
//	}
//	
//}
