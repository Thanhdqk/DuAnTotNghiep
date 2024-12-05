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

	public boolean cancelOrder(String orderId) {
		// Fetch the order by orderId
		Optional<DonHang> optionalOrder = donHangRepository.findById(orderId);
		if (optionalOrder.isPresent()) {
			DonHang order = optionalOrder.get();

			// Check if the order is in "Nhận Đơn" status
			if ("Đang chờ xử lý".equals(order.getTrang_thai())) {
				// Change the status to "Đã Hủy"
				order.setTrang_thai("Đã Hủy");
				// Save the updated order
				donHangRepository.save(order);
				return true;
			}
		}
		return false; // Return false if the order can't be canceled
	}

}
