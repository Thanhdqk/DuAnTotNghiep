package com.BaiTapLab.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.DTO.HinhAnhHanhDongDTO;
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
	 
	 public List<Map<String, Object>> getAllSanPhamWithFourImagesID(String id) {
		 List<Object[]> results = HinhAnhRepository.findBySanphamid(id);
	        
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
	 
	 public List<HinhAnhHanhDongDTO> getSanPhamWithImagesAndActions() {
		    List<Object[]> result = HinhAnhRepository.findSanPhamWithImagesAndActions();
		    List<HinhAnhHanhDongDTO> dtos = new ArrayList<>();

		    for (Object[] row : result) {
		        String tenSanPham = (String) row[0];
		        String tenHinh = (String) row[1];
		        // Chuyển đổi từ java.sql.Date sang java.time.LocalDate
		        LocalDate ngayHanhDong = row[2] != null ? ((java.sql.Date) row[2]).toLocalDate() : null;
		        String tenHanhDong = (String) row[3];

		        HinhAnhHanhDongDTO dto = new HinhAnhHanhDongDTO(tenSanPham, tenHinh, ngayHanhDong, tenHanhDong);
		        dtos.add(dto);
		    }

		    return dtos;
		}



	 public List<Map<String, Object>> getAllSanPhamWithFourImagesAction() {
		 List<Object[]> results = HinhAnhRepository.findActionsWithProductsAndImages();
		 List<Map<String, Object>> listImg = new ArrayList<Map<String,Object>>();
		 for (Object[] row : results) {
			 Map<String, Object> img = new HashMap<String, Object>();
			    String tenHanhDong = (String) row[0];
			    Date ngayHanhDong = (Date) row[1];
			    String tenSanPham = (String) row[2]; // Có thể null
			    String tenHinh = (String) row[3]; // Có thể null
			   
			    img.put("tenHanhDong", tenHanhDong);
			    img.put("ngayHanhDong", ngayHanhDong);
			    img.put("tenSanPham", tenSanPham);
			    img.put("tenHinh", tenHinh);
			    listImg.add(img);
			  
			}
		 return listImg;
		 
	 }
}
