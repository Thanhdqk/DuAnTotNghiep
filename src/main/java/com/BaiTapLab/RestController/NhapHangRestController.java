package com.BaiTapLab.RestController;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.Banner;
import com.BaiTapLab.Entity.DanhMuc;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Entity.ThuongHieu;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.BannerRepository;
import com.BaiTapLab.Repository.DanhMucRepository;
import com.BaiTapLab.Repository.SanPhamRepository;
import com.BaiTapLab.Repository.ThuongHieuRepository;
import com.BaiTapLab.Service.UsersService;

@RestController
@RequestMapping("/api/nhaphang")
@CrossOrigin(origins = "http://localhost:3000")
public class NhapHangRestController {
  @Autowired
  SanPhamRepository sanphamRepository;
  
  @Autowired
  DanhMucRepository danhmucRepository;
	
  @Autowired
  BannerRepository bannerRepository;
  
  @Autowired
  ThuongHieuRepository thuonghieuRepository;
  
  @Autowired
  UsersService userService;
  
  @PostMapping("/addSanPham")
  public ResponseEntity<?> addSanPham(
		  @RequestParam("san_phamId") String san_phamId,
		  @RequestParam("ten_san_pham") String ten_san_pham,
		  @RequestParam("chieu_cao") double chieu_cao,
		  @RequestParam("chieu_dai") double chieu_dai,
		  @RequestParam("chieu_rong") double chieu_rong,
		  @RequestParam("khoi_luong") double khoi_luong,
		  @RequestParam("gia_goc") double gia_goc,
		  @RequestParam("tien_nhap_hang") double tien_nhap_hang,
		  @RequestParam("so_luong") int so_luong,
		  @RequestParam("ngay_tao") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate ngay_tao,
		  @RequestParam("accountID") String accountID,
		  @RequestParam("ten_loaiDM") String ten_loaiDM,
		  @RequestParam("ten_thuong_hieu") String ten_thuong_hieu) {
  	  SanPham sanpham = new SanPham();
  	  sanpham.setSan_phamId(san_phamId);
  	  sanpham.setTen_san_pham(ten_san_pham);
  	  sanpham.setChieu_cao(chieu_cao);
  	  sanpham.setChieu_dai(chieu_dai);
  	  sanpham.setChieu_rong(chieu_rong);
  	  sanpham.setKhoi_luong(khoi_luong);
  	  sanpham.setGia_goc(gia_goc);
  	  sanpham.setTien_nhap_hang(tien_nhap_hang);
  	  sanpham.setSo_luong(so_luong);
  	  sanpham.setNgay_tao(ngay_tao);
  	  sanpham.setHanh_dong("Thêm");
  	  sanpham.setTrang_thai_kho("Hàng mới nhập");
  	  sanpham.setPhe_duyet("Chưa phê duyệt");
  	  sanpham.setHoat_dong("Ngừng hoạt động");
  	  
  	  Users user = userService.findByAccountID(accountID);
      if (user != null) {
        sanpham.setUsers(user);
      } else {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body("Không tìm thấy người dùng với accountID: " + accountID);
      }
      
      DanhMuc danhmuc = danhmucRepository.findByTen_loaiDM(ten_loaiDM);
      if(danhmuc != null) {
    	  sanpham.setDanhmuc(danhmuc);
      }else {
    	  return ResponseEntity.status(HttpStatus.BAD_REQUEST)
    	            .body("Không tìm thấy người dùng với danh mục id: " + ten_loaiDM);
      }
      
      ThuongHieu thuonghieu = thuonghieuRepository.findByTen_thuong_hieu(ten_thuong_hieu);
      if(thuonghieu != null) {
    	  sanpham.setThuonghieu(thuonghieu);
      }else {
    	  return ResponseEntity.status(HttpStatus.BAD_REQUEST)
  	            .body("Không tìm thấy người dùng với thương hiệu id: " + thuonghieu);
      }
      
      sanphamRepository.save(sanpham);
      return ResponseEntity.ok(sanpham);
  }
  
  
  
}
