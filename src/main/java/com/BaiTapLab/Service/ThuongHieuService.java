package com.BaiTapLab.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.ThuongHieu;
import com.BaiTapLab.Repository.ThuongHieuRepository;

@Service
public class ThuongHieuService {
	@Autowired
	ThuongHieuRepository ThuongHieuRepository;
	
	public List<ThuongHieu> FINDALL()
	{
		 return ThuongHieuRepository.findAll();
	}
}