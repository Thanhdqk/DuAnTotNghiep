package com.BaiTapLab.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Repository.SearchRepository;

@Service
public class SearchService {

	@Autowired
	SearchRepository SearchRepository;

	public List<Object[]> findSanPhamByDanhMuc(String id, boolean showDiscount) {
		return SearchRepository.findSanPhamByDanhMuc(id, showDiscount);
	}

	public List<Object[]> findSanPhamByDanhMucAndName(String id, String name, boolean showDiscount) {
		return SearchRepository.findSanPhamByDanhMucAndName(id, name, showDiscount);
	}

	public List<Object[]> findSanPhamByDanhMucAndSosao(String id, int sosao, boolean showDiscount) {
		return SearchRepository.findSanPhamByDanhMucAndSosao(id, sosao, showDiscount);
	}
}
