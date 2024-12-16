package com.BaiTapLab.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.DonHang;
import com.BaiTapLab.Repository.DonHangRepository;

@Service
public class DonHangServiceQuang {
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
		try {
			Optional<DonHang> optionalOrder = donHangRepository.findById(orderId);
			System.out.println("cc1 " + optionalOrder.get().getTrang_thai());
			if (optionalOrder.isPresent()) {
				DonHang order = optionalOrder.get();
				if (order.getTrang_thai().equalsIgnoreCase("Đang chờ xử lý")||order.getTrang_thai().equalsIgnoreCase("Chờ thanh toán")) {
					order.setTrang_thai("Đã hủy");
					System.out.println("cc3");
					order.setLy_do(lyDo); // Lưu lý do hủy
					donHangRepository.save(order);
					return true;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return false;
	}

}