package com.BaiTapLab.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.Popup;
import com.BaiTapLab.Repository.PopupRepository;

@Service
public class PopupService {

	@Autowired
	PopupRepository PopupRepository;
	
	public List<Popup> FindALL()
	{
		return  PopupRepository.findAll();
	}
	
	public List<Popup> FindALLSpare(String id)
	{
		return  PopupRepository.findAllByIdNot(id);
	}
}
