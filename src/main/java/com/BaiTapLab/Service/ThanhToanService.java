package com.BaiTapLab.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.PhuongThucTT;
import com.BaiTapLab.Repository.ThanhToanRepository;


@Service
public class ThanhToanService {
	@Autowired
	private ThanhToanRepository ttRepository;
	
	public List<PhuongThucTT> findAll(){
		return ttRepository.findAll();
	}
	
	public PhuongThucTT save(PhuongThucTT tt) {
		return ttRepository.save(tt);
	}
	
	public void deleteByID(String phuong_thucTTID) {
		ttRepository.deleteById(phuong_thucTTID);
	}
	
	public PhuongThucTT findByID(String phuong_thucTTID) {
		Optional<PhuongThucTT> th = ttRepository.findById(phuong_thucTTID);
		return th.orElseThrow(() -> new RuntimeException("Không tồn tại!"));
	}
}
