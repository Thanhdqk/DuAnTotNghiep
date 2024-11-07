package com.BaiTapLab.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.YeuThich;
import com.BaiTapLab.Repository.YeuthichRepository;

@Service
public class YeuThichService {

	@Autowired
	YeuthichRepository YeuthichRepository;
	
	public List<YeuThich> ListALLByid(String id)
	{
		return YeuthichRepository.FindAllByid(id);
	}
	
	public YeuThich Check(String idsp, String iduser)
	{
		return YeuthichRepository.Check(idsp, iduser);
	}
	
	public YeuThich ADD(YeuThich yeuthich)
	{
		return YeuthichRepository.save(yeuthich);
	}
	
	public void deleteBYID(int id)
	{
		YeuthichRepository.deleteById(id);
	}
}
