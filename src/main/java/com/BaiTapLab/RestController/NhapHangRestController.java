package com.BaiTapLab.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.Banner;
import com.BaiTapLab.Entity.DanhMuc;
import com.BaiTapLab.Entity.HanhDong;
import com.BaiTapLab.Entity.NhaCungCap;
import com.BaiTapLab.Entity.NhaCungCapChiTiet;
import com.BaiTapLab.Entity.NhapXuatSanPham;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Entity.ThuongHieu;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.BannerRepository;
import com.BaiTapLab.Repository.DanhMucRepository;
import com.BaiTapLab.Repository.HanhDongRepository;
import com.BaiTapLab.Repository.NhaCungCapChiTietRepository;
import com.BaiTapLab.Repository.NhaCungCapRepository;
import com.BaiTapLab.Repository.NhapXuatRepository;
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
  
  @Autowired
  NhaCungCapRepository nhaCungCapRepository;
  
  @Autowired
  HanhDongRepository hanhDongRepository;
  
  @Autowired
  NhapXuatRepository nhapXuatRepository;
  
  @Autowired
  NhaCungCapChiTietRepository nhaCungCapChiTietRepository;
  
  @PostMapping("/addSanPham")// Nhập hàng chờ phê duyệt
  public ResponseEntity<?> addSanPham(
		  @RequestParam("san_phamId") String san_phamId,
		  @RequestParam("ten_san_pham") String ten_san_pham,
		  @RequestParam("mo_ta") String mo_ta,
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
		  @RequestParam("ten_thuong_hieu") String ten_thuong_hieu,
		  @RequestParam("ten_nha_cung_cap") String ten_nha_cung_cap) {
	  System.out.println("Received ten_loaiDM: " + ten_loaiDM);
	  System.out.println("Received ten thuong hieu ne: " + ten_thuong_hieu);
	  System.out.println("Received ten nha cung cap: " + ten_nha_cung_cap);
	  SanPham sanpham = sanphamRepository.findByTenSP(ten_san_pham);
  	  sanpham = new SanPham();
  	  sanpham.setSan_phamId(san_phamId);
  	  sanpham.setTen_san_pham(ten_san_pham);
  	  sanpham.setChieu_cao(chieu_cao);
  	  sanpham.setChieu_dai(chieu_dai);
  	  sanpham.setChieu_rong(chieu_rong);
  	  sanpham.setKhoi_luong(khoi_luong);
  	  sanpham.setGia_goc(gia_goc);
  	  sanpham.setTien_nhap_hang(tien_nhap_hang);
  	  sanpham.setSo_luong(so_luong);
  	  sanpham.setMo_ta(mo_ta);
  	  sanpham.setNgay_tao(ngay_tao);
  	  sanpham.setTrang_thai_kho("Chờ phê duyệt");
  	  sanpham.setNhap_hang("Mới nhập hàng");
  	  sanpham.setPhe_duyet("Chưa phê duyệt");
  	  sanpham.setHoat_dong("Off");

  	  
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
    	  //return ResponseEntity.status(HttpStatus.BAD_REQUEST)
    	            //.body("Không tìm thấy người dùng với danh mục id: " + ten_loaiDM);
    	  String errorMessage = "Không tìm thấy danh mục với ten_loaiDM: " + ten_loaiDM;
    	    System.out.println(errorMessage);
    	    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
      }
      
      ThuongHieu thuonghieu = thuonghieuRepository.findByTen_thuong_hieu(ten_thuong_hieu);
      if(thuonghieu != null) {
    	  sanpham.setThuonghieu(thuonghieu);
      }else {
    	  return ResponseEntity.status(HttpStatus.BAD_REQUEST)
  	            .body("Không tìm thấy người dùng với thương hiệu id: " + thuonghieu);
      }
  	 
      NhapXuatSanPham nhapXuat = new NhapXuatSanPham();
      nhapXuat.setSo_luong(so_luong);
      nhapXuat.setTrang_thai_nhap("Nhập hàng");
      nhapXuat.setNgay_nhap_xuat(LocalDate.now());
      nhapXuat.setSanpham(sanpham);
      
      HanhDong hanhdong = new HanhDong();
      hanhdong.setTen_hanh_dong("Nhập hàng chờ phê duyệt");
      hanhdong.setNgay_hanh_dong(LocalDate.now());
      hanhdong.setUsers(user);
      hanhdong.setSanpham(sanpham);
      
      sanphamRepository.save(sanpham);
      
  	  NhaCungCap ncc = nhaCungCapRepository.findByTenNhaCC(ten_nha_cung_cap);
  	  NhaCungCapChiTiet nccct = new NhaCungCapChiTiet();
  	  nccct.setNhacungcap(ncc);
  	  nccct.setSanpham(sanpham);
      nhaCungCapChiTietRepository.save(nccct);
      
      //nhapXuatRepository.save(nhapXuat);
      
      hanhDongRepository.save(hanhdong);
      
      return ResponseEntity.ok(sanpham);
  }
  
  @PutMapping("/updateSanPham/{san_phamId}")
  public ResponseEntity<?> updateSanPham(
          @PathVariable("san_phamId") String san_phamId,
          @RequestParam("ten_san_pham") String ten_san_pham,
          @RequestParam("mo_ta") String mo_ta,
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
          @RequestParam("ten_thuong_hieu") String ten_thuong_hieu,
          @RequestParam("ten_nha_cung_cap") String ten_nha_cung_cap) {

      // Kiểm tra sản phẩm có tồn tại hay không
      SanPham sanpham = sanphamRepository.findById(san_phamId).orElse(null);
      if (sanpham == null) {
          return ResponseEntity.status(HttpStatus.NOT_FOUND)
                  .body("Không tìm thấy sản phẩm với ID: " + san_phamId);
      }

      // Cập nhật thông tin sản phẩm
      sanpham.setTen_san_pham(ten_san_pham);
      sanpham.setMo_ta(mo_ta);
      sanpham.setChieu_cao(chieu_cao);
      sanpham.setChieu_dai(chieu_dai);
      sanpham.setChieu_rong(chieu_rong);
      sanpham.setKhoi_luong(khoi_luong);
      sanpham.setGia_goc(gia_goc);
      sanpham.setTien_nhap_hang(tien_nhap_hang);
      sanpham.setSo_luong(so_luong);
      sanpham.setNgay_tao(ngay_tao);

      // Cập nhật người dùng
      Users user = userService.findByAccountID(accountID);
      if (user != null) {
          sanpham.setUsers(user);
      } else {
          return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                  .body("Không tìm thấy người dùng với accountID: " + accountID);
      }

      // Cập nhật danh mục
      DanhMuc danhmuc = danhmucRepository.findByTen_loaiDM(ten_loaiDM);
      if (danhmuc != null) {
          sanpham.setDanhmuc(danhmuc);
      } else {
          return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                  .body("Không tìm thấy danh mục với tên: " + ten_loaiDM);
      }

      // Cập nhật thương hiệu
      ThuongHieu thuonghieu = thuonghieuRepository.findByTen_thuong_hieu(ten_thuong_hieu);
      if (thuonghieu != null) {
          sanpham.setThuonghieu(thuonghieu);
      } else {
          return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                  .body("Không tìm thấy thương hiệu với tên: " + ten_thuong_hieu);
      }

      // Cập nhật nhà cung cấp
      NhaCungCap ncc = nhaCungCapRepository.findByTenNhaCC(ten_nha_cung_cap);
      if (ncc != null) {
    	  NhaCungCapChiTiet nccct = nhaCungCapChiTietRepository.findBySanphamAndNhacungcap(sanpham);
          nccct.setNhacungcap(ncc);
          nccct.setSanpham(sanpham);
          nhaCungCapChiTietRepository.save(nccct);
      } else {
          return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                  .body("Không tìm thấy nhà cung cấp với tên: " + ten_nha_cung_cap);
      }

      // Lưu sản phẩm đã cập nhật
      sanphamRepository.save(sanpham);

      return ResponseEntity.ok("Sản phẩm đã được cập nhật thành công!");
  }

  @PutMapping("/update/trangThaiXoa/{san_phamId}")// Xóa hàng hàng chưa duyệt
  public ResponseEntity<?> deleteSanPham(@PathVariable("san_phamId") String san_phamId) {
      Integer isUpdated = sanphamRepository.updateSanPhamById(san_phamId);
      if (isUpdated > 0) {
          return ResponseEntity.ok("Trạng thái sản phẩm với ID " + san_phamId + " đã được cập nhật thành 'Đã xóa'.");
      } else {
          return ResponseEntity.status(HttpStatus.NOT_FOUND)
                  .body("Không tìm thấy sản phẩm với ID: " + san_phamId);
      }
  }
  
  @PutMapping("/update/reload/{san_phamId}") // Khôi phục hàng chưa duyệt
  public ResponseEntity<?> reloadSanPham(@PathVariable("san_phamId") String san_phamId) {
      Integer isUpdated = sanphamRepository.reloadSanPhamById(san_phamId);
      if (isUpdated > 0) {
          return ResponseEntity.ok("Trạng thái sản phẩm với ID " + san_phamId + " đã được cập nhật thành 'Đã xóa'.");
      } else {
          return ResponseEntity.status(HttpStatus.NOT_FOUND)
                  .body("Không tìm thấy sản phẩm với ID: " + san_phamId);
      }
  }
  
	@GetMapping("/ghichu/{san_phamId}")
	public ResponseEntity<List<Map<String, Object>>> getSanPhamGhiChu(
			@PathVariable("san_phamId") String san_phamId){
		List<Object[]> listSanPham = sanphamRepository.lietKeGhiChu(san_phamId);
		List<Map<String, Object>> result = new ArrayList<>();
		for (Object[] obj : listSanPham) {
		        Map<String, Object> map = new HashMap<>();
		        map.put("ghi_chu", obj[0]);
		        result.add(map);
		}
		return ResponseEntity.ok(result);
	}
}
