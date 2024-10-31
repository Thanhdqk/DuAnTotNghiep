package com.BaiTapLab.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.BaiDang;
import com.BaiTapLab.Repository.BaiDangRepository;

@Service
public class BaiDangService {

	@Autowired
	BaiDangRepository BaiDangRepository;
	
	public List<BaiDang> FindALL(){
		return BaiDangRepository.findAll();
	}
	
	public List<BaiDang> Find2new(Pageable page)
	{
		return BaiDangRepository.findBaiDangNew(page);
	}
	
	public Optional<BaiDang> FindByID(String id)
	{
		return BaiDangRepository.findById(id);
	}
}
