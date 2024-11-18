package com.BaiTapLab.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.DiaChi;
import com.BaiTapLab.Repository.DiaChiRepository;

import jakarta.transaction.Transactional;

@Service
public class DiaChiService {
	
	@Autowired
	DiaChiRepository DiaChiRepository;
	
	public List<DiaChi> FindDiaChiByID(String id)
	{
		return DiaChiRepository.getDiaChiByIdUser(id);
	}
	
	public DiaChi AddDiaChi(DiaChi diachi)
	{
		return DiaChiRepository.save(diachi);
	}
	
	@Transactional
	public void Delete_DiaChi(String id)
	{
		DiaChiRepository.DeleteDiaChiById(id);
	}
}