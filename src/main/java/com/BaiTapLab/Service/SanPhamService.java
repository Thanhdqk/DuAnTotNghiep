package com.BaiTapLab.Service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.DanhMuc;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Repository.DanhmucRepository;
import com.BaiTapLab.Repository.SanphamRepository;

@Service
public class SanPhamService {
	@Autowired
	DanhmucRepository DanhmucRepository;
	@Autowired
	SanphamRepository SanphamRepository;
	
	
	
	public List<SanPham> FindProductThisWeek(){
		LocalDate sevenDaysAgo = LocalDate.now().minusDays(7);
		
		return SanphamRepository.findSanPhamLast7Days(sevenDaysAgo);
	}
	
	public List<SanPham> FindProductTopSell()
	{
		return null;
	}
	
	public List<SanPham> FindProductDiscount()
	{
		return SanphamRepository.findSanPhamphantramGG();
	}
	
	public SanPham FindProductByID(String id)
	{
		return SanphamRepository.findSanPhamById(id);
	}
	
	
	public List<SanPham> FindProductSimilar(String SanPhamID)
	{
		DanhMuc ID_Danhmuc = DanhmucRepository.findDanhMucBySanPhamId(SanPhamID);
		
		
		return SanphamRepository.findSanPhamSimilar(ID_Danhmuc.getDanh_mucId());
	}
	
	public List<SanPham> FindSanPhamByDanhMucID(String id)
	{
		return SanphamRepository.findSanPhamByDanhmucId(id);
	}
	
	public List<SanPham> FindSanPhamLikeName(String name)
	{
		return SanphamRepository.findSanPhamByTenSanPham(name);
	}
	
	public List<SanPham> FindSanPhamLikeNameAndCategory(String name,String id)
	{
		return SanphamRepository.findSanPhanByTenAndDanhMuc(name, id);
	}
	
	
	public List<SanPham> FindSanPhamLikeNameAndCategoryWithDiscount(String name,String id)
	{
		return SanphamRepository.findSanPhamByTenAndDandMucAndGG(name, id);
	}
	
	public List<SanPham> FindSanPhamLikeNameAndCategoryWithoutDiscount(String name,String id)
	{
		return SanphamRepository.findSanPhamByTenAndDandMucAndWithOutGG(name, id);
	}
	
	
	public List<SanPham> FindSanPhamByNameWithDiscount(String name)
	{
		return SanphamRepository.findSanPhamByTenAndGG(name);
	}
	
	public List<SanPham> FindSanPhamByDanhmucWithDiscount(String id)
	{
		return SanphamRepository.findSanPhamByDandMucAndGG(id);
	}
}
