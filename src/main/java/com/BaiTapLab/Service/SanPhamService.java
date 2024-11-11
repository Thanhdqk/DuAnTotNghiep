package com.BaiTapLab.Service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

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
		LocalDate sevenDaysAgo = LocalDate.now().minusDays(9);
		
		return SanphamRepository.findSanPhamLast7Days(sevenDaysAgo);
	}
	
	public List<SanPham> FindProductTopSell(Pageable pageable)
	{
		return SanphamRepository.findTop10ByLuotMua(pageable);
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
	// today
	public List<SanPham> FindSanPhamByNameWithoutDiscount(String name)
	{
		return SanphamRepository.findSanPhamByTenWithOutGG(name);
	}
	
	public List<SanPham> FindSanPhamByDanhmucWithDiscount(String id)
	{
		return SanphamRepository.findSanPhamByDandMucAndGG(id);
	}
	// today
	public List<SanPham> FindSanPhamByDanhmucWithoutDiscount(String id)
	{
		return SanphamRepository.findSanPhamByDandMucAndWithOutGG(id);
	}
	
	
	public List<SanPham> FindSanPhamBySoSao(int sosao)
	{
		return SanphamRepository.findSanPhamBySoSao(sosao);
	}
	
	public List<SanPham> findSanPhamByTotalSoSaoEquals5(){
		return SanphamRepository.findSanPhamByTotalSoSaoEquals5();
	}
	
	public List<SanPham> FindSanPhamByGiaDefault(Long Default1 ,Long Default2 )
	{
		return SanphamRepository.findSanPhamByPriceDefault(Default1, Default2);
	}
	
	public List<SanPham> FindSanPhamByPriceLESS(Long price)
	{
		return SanphamRepository.findSanPhamByPriceLess(price);
	}
	
	public List<SanPham> FindSanPhamByPriceMORE(Long price)
	{
		return SanphamRepository.findSanPhamByPriceMore(price);
	}
	
	public List<SanPham> FindSanPhamBySoSaoAndNameHaveDisCount(int sosao,String name)
	{
		return SanphamRepository.findSanPhamBySoSaoAndNameHaveDisCount(sosao, name);
	}
	public List<SanPham> FindSanPhamBySoSaoAndDanhMucHaveDisCount(int sosao,String id)
	{
		return SanphamRepository.findSanPhamBySoSaoAndDanhMucHaveDisCount(sosao, id);
	}
	
	public List<SanPham> FindSanPhamBySoSaoAndDanhMucAndNameHaveDisCount(int sosao,String id,String name)
	{
		return SanphamRepository.findSanPhamBySoSaoAndDanhMucAndNameHaveDisCount(sosao, id, name);
	}
	
	public List<SanPham> FindSanPhamBySoSaoAndName(int sosao,String name)
	{
		return SanphamRepository.findSanPhamBySoSaoAndName(sosao, name);
	}
	
	public List<SanPham> FindSanPhamBySoSaoAndDanhMuc(int sosao,String id)
	{
		return SanphamRepository.findSanPhamBySoSaoAndDanhMuc(sosao, id);
	}
	
	public List<SanPham>  FindSanPhamBySoSaoAndDanhMucAndName(int sosao,String id,String name)
	{
		return SanphamRepository.findSanPhamBySoSaoAndDanhMucAndName(sosao, id, name);
	}
	
	public List<SanPham> FindSanPhamBySoSaoHaveDiscount(int sosao)
	{
		return SanphamRepository.findSanPhamBySoSaoHaveDiscount(sosao);
	}
	
	                          //  tìm theo 5 sao
	public List<SanPham> findSanPhamBySoSaoEqual5AndNameHaveDisCount(String name)
	{
		return SanphamRepository.findSanPhamBySoSaoEqual5AndNameHaveDisCount(name);
	}
	
	public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucHaveDisCount(String id)
	{
		return SanphamRepository.findSanPhamBySoSaoEqual5AndDanhMucHaveDisCount(id);
	}
	
	public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucAndNameHaveDisCount(String id,String name)
	{
		return SanphamRepository.findSanPhamBySoSaoEqual5AndDanhMucAndNameHaveDisCount(id,name);
	}
	
	public List<SanPham> findSanPhamBySoSaoEqual5AndName(String name)
	{
		return SanphamRepository.findSanPhamBySoSaoEqual5AndName(name);
	}
	
	public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMuc(String id)
	{
		return SanphamRepository.findSanPhamBySoSaoEqual5AndDanhMuc(id);
	}
	
	public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucAndName(String id,String name)
	{
		return SanphamRepository.findSanPhamBySoSaoEqual5AndDanhMucAndName(id,name);
	}
	
	public List<SanPham> findSanPhamBySoSaoEqual5HaveDiscount()
	{
		return SanphamRepository.findSanPhamBySoSaoEqual5HaveDiscount();
	}
	
	public List<SanPham> findSanPhamByThuonghieuId(String id)
	{
		return SanphamRepository.findSanPhamByThuongHieuId(id);
	}
	
	public List<SanPham> findAllByDanhMucIds(List<String> ids )
	{
		 return SanphamRepository.findAllByDanhMucIds(ids);
	}
	
}
