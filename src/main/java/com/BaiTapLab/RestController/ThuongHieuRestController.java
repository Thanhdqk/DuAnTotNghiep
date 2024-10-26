package com.BaiTapLab.RestController;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.BaiTapLab.Entity.ThuongHieu;
import com.BaiTapLab.Service.ThuongHieuService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class ThuongHieuRestController {
    @Autowired
    private ThuongHieuService thuonghieuService;

    @GetMapping("/loadAll")
    public List<ThuongHieu> loadAll() {
        return thuonghieuService.findAll();
    }
    

    @PostMapping("/add")
    public ThuongHieu addThuongHieu(
    		@RequestParam("thuong_hieuID") String thuonghieuID,
    		@RequestParam("ten_thuong_hieu") String tenthuonghieu,
    		@RequestParam("ngay_tao") String ngaytao,
    		@RequestParam("hoat_dong") String hoatdong,
    		@RequestParam("trang_thai_xoa") String trangthaixoa,
    		@RequestParam (value = "hinh_anh", required = false) MultipartFile hinhAnh)throws IOException {
    	ThuongHieu th = new ThuongHieu();
    	th.setThuong_hieuID(thuonghieuID);
    	th.setTen_thuong_hieu(tenthuonghieu);
    	th.setNgay_tao(null);
    	th.setHoat_dong(hoatdong);
    	th.setTrang_thai_xoa(trangthaixoa);
    	
	    if (hinhAnh != null && !hinhAnh.isEmpty()) {
	    	// Lưu ảnh vào thư mục public/images (từ thư mục gốc của dự án)
	        String filePath = "C:\\Users\\HP\\Downloads" + hinhAnh.getOriginalFilename();
	        hinhAnh.transferTo(new File(filePath)); // Lưu ảnh vào server
	        th.setHinh_anh(hinhAnh.getOriginalFilename()); // Lưu tên file vào cơ sở dữ liệu
	    }
        return thuonghieuService.save(th);
        
    }
    

    @PutMapping("/update/{thuong_hieuID}")
    public ThuongHieu updateThuongHieu(@PathVariable("thuong_hieuID") String thuong_hieuID, @RequestBody ThuongHieu thuongHieu) {
        ThuongHieu existingTH = thuonghieuService.findByID(thuong_hieuID);
        // Update fields here if necessary
        return thuonghieuService.save(thuongHieu);
    }

    @DeleteMapping("/delete/{thuong_hieuID}")
    public void deleteThuongHieu(@PathVariable("thuong_hieuID") String thuong_hieuID) {
        thuonghieuService.deleteByID(thuong_hieuID);
    }
}
