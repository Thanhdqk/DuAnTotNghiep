package com.BaiTapLab.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.DanhGia;
import com.BaiTapLab.Repository.DanhGiaRepository;

@Service
public class DanhGiaService {
	@Autowired
	DanhGiaRepository DanhGiaRepository;
	
	public List<DanhGia> FindDanhGiaByIdSanPham(String id)
	{
		return DanhGiaRepository.findDangGiaByidSanPham(id);
	}
	
	public List<DanhGia> FindDanhGiaByIdSanPhamWithSoSao(String id ,int sosao)
	{
		return DanhGiaRepository.findDangGiaByidSanPhamWithSoSao(id, sosao);
	}
	
	public List<DanhGia> FindDanhGiaByIdSanPhamWithDay(String id)
	{
		return DanhGiaRepository.findAllDanhGiasOrderedByDate(id);
	}
}