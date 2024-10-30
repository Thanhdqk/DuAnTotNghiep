package com.BaiTapLab.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.ThuongHieu;
import com.BaiTapLab.Repository.ThuongHieuRepository;
@Service
public class ThuongHieuService {
	@Autowired
	private ThuongHieuRepository thRepository;
	
	public List<ThuongHieu> findAll(){
		return thRepository.findAll();
	}
	
	public ThuongHieu save(ThuongHieu th) {
		return thRepository.save(th);
	}
	
	public void deleteByID(String thuong_hieuID) {
		thRepository.deleteById(thuong_hieuID);
	}
	
	public ThuongHieu findByID(String thuong_hieuID) {
		Optional<ThuongHieu> th = thRepository.findById(thuong_hieuID);
		return th.orElseThrow(() -> new RuntimeException("Không tồn tại!"));
	}
}
