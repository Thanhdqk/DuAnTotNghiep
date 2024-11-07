package com.BaiTapLab.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.DanhMuc;
import com.BaiTapLab.Repository.DanhmucRepository;

@Service
public class DanhmucService {

	@Autowired
	DanhmucRepository DanhmucRepository;
	
	public List<DanhMuc> FindALL(){
		
		List<DanhMuc> listAllDanhMuc = DanhmucRepository.findAll();
		
		return listAllDanhMuc;
		
	}
	
	public DanhMuc FindDanhMucByIDSanPham(String id)
	{
		
		return DanhmucRepository.findDanhMucBySanPhamId(id);
	}
	
}
