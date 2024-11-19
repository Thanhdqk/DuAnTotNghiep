package com.BaiTapLab.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.HinhAnh;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Repository.HinhAnhRepository;

@Service
public class HinhAnhService {

	@Autowired
	HinhAnhRepository HinhAnhRepository;
	
	public List<Object[]> FindALL()
	{
		return HinhAnhRepository.findTenSanPhamAndHinhAnh();
	}
	
	
	 public List<Map<String, Object>> getAllSanPhamWithFourImages() {
		 List<Object[]> results = HinhAnhRepository.findAllTenSanPhamAndHinhanh();
	        
	        // Sử dụng Map để nhóm hình ảnh theo tên sản phẩm
	        Map<String, Map<String, Object>> sanPhamMap = new HashMap<>();

	        for (Object[] result : results) {
	            String tenSanPham = (String) result[0];
	            HinhAnh hinhanh = (HinhAnh) result[1];
	            
	            // Kiểm tra nếu sản phẩm đã tồn tại trong Map
	            if (!sanPhamMap.containsKey(tenSanPham)) {
	                // Tạo mới một sản phẩm với mảng hình ảnh rỗng
	                Map<String, Object> sanPhamData = new HashMap<>();
	                sanPhamData.put("tenSanPham", tenSanPham);
	                sanPhamData.put("hinhanh", new ArrayList<Map<String, Object>>());
	                sanPhamMap.put(tenSanPham, sanPhamData);
	            }

	            // Thêm hình ảnh vào danh sách hình ảnh của sản phẩm
	            Map<String, Object> hinhanhData = new HashMap<>();
	            hinhanhData.put("id", hinhanh.getId());
	            hinhanhData.put("ten_hinh", hinhanh.getTen_hinh());

	            ((List<Map<String, Object>>) sanPhamMap.get(tenSanPham).get("hinhanh")).add(hinhanhData);
	        }

	        return new ArrayList<>(sanPhamMap.values());
	 }

}
