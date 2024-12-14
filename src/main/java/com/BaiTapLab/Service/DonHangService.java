package com.BaiTapLab.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.DonHang;
import com.BaiTapLab.Repository.DonHangRepository;

@Service
public class DonHangService {
	@Autowired
	private DonHangRepository donHangRepository;

	public List<DonHang> getAllDonHang() {
		return donHangRepository.findAll();
	}

	public String getdonhang_Id(String id) {
		return donHangRepository.donhangid(id);
	}

	public List<DonHang> getDonHangByUserId(String userId) {
		return donHangRepository.findByUserIdWithAddress(userId);
	}

	public boolean cancelOrder(String orderId, String lyDo) {
		Optional<DonHang> optionalOrder = donHangRepository.findById(orderId);
		if (optionalOrder.isPresent()) {
			DonHang order = optionalOrder.get();
			if ("Đang chờ xử lý".equals(order.getTrang_thai())) {
				order.setTrang_thai("Đã Hủy");
				order.setLy_do_huy(lyDo); // Lưu lý do hủy
				donHangRepository.save(order);
				return true;
			}
		}
		return false;
	}

}
