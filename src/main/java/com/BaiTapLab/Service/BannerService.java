package com.BaiTapLab.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.Banner;
import com.BaiTapLab.Repository.BannerRepository;

@Service
public class BannerService {
	@Autowired
	BannerRepository BannerRepository;
	
	public List<Banner> FindALL(){
		return BannerRepository.findAll();
	}
}
