package com.BaiTapLab.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.DanhMuc;
import com.BaiTapLab.Repository.DanhmucRepository;

import jakarta.transaction.Transactional;

@Service
public class DanhmucService {

	@Autowired
	DanhmucRepository DanhmucRepository;
	
	public List<DanhMuc> FindALL(){
		
		List<DanhMuc> listAllDanhMuc = DanhmucRepository.findALLVIP();
		
		return listAllDanhMuc;
		
	}
	
	public List<DanhMuc> FindHanhDong()
	{
		return DanhmucRepository.findDanhMucHanhDong();
	}
	
     public List<DanhMuc> FindALLNodelete(){
		
		
		
		return DanhmucRepository.findDanhMucByTrangThaiNULL();
		
	}

   public List<DanhMuc> FindALLdeleted(){
	
	
	
	return DanhmucRepository.findDanhMucByTrangThaiDeleted();
	
}
	
	public DanhMuc FindDanhMucByIDSanPham(String id)
	{
		
		return DanhmucRepository.findDanhMucBySanPhamId(id);
	}
	
	public void ADD_DanhMuc(DanhMuc DanhMuc)
	{
		DanhmucRepository.save(DanhMuc);
	}
	
	 @Transactional
	public void Delete_DanhMuc(String id)
	{
		DanhmucRepository.markDanhMucAsDeletedById(id);
	}
	 
	 @Transactional
		public void Back_DanhMuc(String id)
		{
			DanhmucRepository.backDanhMucAsDeletedById(id);
		}
	 
	 public List<String> findIDDanhMucByBannerID(String id)
	 {
		 return DanhmucRepository.findDanhMucIdBybannerID(id);
	 }
	
}
