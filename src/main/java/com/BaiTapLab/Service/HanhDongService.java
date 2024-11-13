package com.BaiTapLab.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.DTO.HanhDongDTO;
import com.BaiTapLab.Entity.HanhDong;
import com.BaiTapLab.Repository.HanhDongRepository;

@Service
public class HanhDongService {
	
	@Autowired
	HanhDongRepository HanhDongRepository;
	
	public List<HanhDongDTO> findHanhDongByDanhMuc()
	{
		return HanhDongRepository.findHangDongDanhMuc();
	}
}
