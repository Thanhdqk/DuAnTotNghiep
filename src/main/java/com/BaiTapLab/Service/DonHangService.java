package com.BaiTapLab.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Repository.DonHangRepository;

@Service
public class DonHangService {
	@Autowired
	DonHangRepository donhangRepository;
	
	public Integer getTotalDonHang() {
		return donhangRepository.countAllDonHang(LocalDate.now(), "Đã giao");
	}
	
	public double getDoanhThu() {
		return donhangRepository.doanhthuDonHang("Đã giao");
	}
	
	public Integer getKhachHang() {
		return donhangRepository.countUniqueCustomersInCurrentMonth("Đã giao");
	}
	
	public Double getLoiNhuan() {
		return donhangRepository.tinhLoiNhuanDonHangHienTai("Đã giao");
	}
	

	
}
