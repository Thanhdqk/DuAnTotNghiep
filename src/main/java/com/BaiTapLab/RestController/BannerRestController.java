package com.BaiTapLab.RestController;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Array;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.BaiTapLab.DTO.BannerDTO;
/*import com.BaiTapLab.DTO.BannerDTO;*/
import com.BaiTapLab.DTO.UserDTO;
import com.BaiTapLab.Entity.Banner;
import com.BaiTapLab.Entity.BannerChiTiet;
import com.BaiTapLab.Entity.DanhMuc;
import com.BaiTapLab.Entity.HanhDong;
import com.BaiTapLab.Entity.NhaCungCap;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.BannerChiTietRepository;
import com.BaiTapLab.Repository.BannerRepository;
import com.BaiTapLab.Repository.DanhmucRepository;
import com.BaiTapLab.Repository.HanhDongReopository;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Service.BannerService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/banners")
@CrossOrigin(origins = { "http://localhost:3000" })
public class BannerRestController {

    private static final Logger logger = LoggerFactory.getLogger(BannerRestController.class);
    private static final String IMAGE_DIR = "C:\\Users\\DELL\\Downloads\\LoiFrontend\\public\\images";

    @Autowired
    private BannerService bannerService;
    
    @Autowired
    BannerChiTietRepository BannerChiTietRepository;

	@Autowired
	UsersRepository userrepository;
	
    @Autowired
    BannerRepository bannerRepository;
    
    @Autowired
    HanhDongReopository HanhDongReopository;
    
    @Autowired
    DanhmucRepository DanhmucRepository;
    
    public List<Map<String, Object>> MapToData(List<Object[]> results) {
		List<Map<String, Object>> bannerList = new ArrayList<>();

		for (Object[] row : results) {
			Map<String, Object> banner = new HashMap<>();
			banner.put("bannerId", row[0]);
			banner.put("hinh_anh", row[1]);
			banner.put("hoat_dong", row[2]);
			banner.put("ngay_tao", row[3]);
			banner.put("ngay_het_han", row[4]);
			banner.put("danh_mucId", row[5]);
			banner.put("accountID", row[6]);
			banner.put("trang_thai_xoa", row[7]);
			bannerList.add(banner);
		}

		return bannerList;
	}
    
    @GetMapping("findalldanhmuc")
    public List<DanhMuc>  getMethodDanhmuc() {
    	List<DanhMuc>  result =  DanhmucRepository.findAll();
    	
        return result;
    }
    
    
    @GetMapping("findall")
    public List<Map<String, Object>>  getMethodName() {
    	List<Object[]>  result =  BannerChiTietRepository.findBannerDanhMucAndUsersJPQL();
    	
        return MapToData(result);
    }
    
    @GetMapping("findalldeleted")
    public List<Map<String, Object>>  findalldeleted() {
    	List<Object[]>  result =  BannerChiTietRepository.findBannerDanhMucAndUsersJPQLdeleted();
    	
        return MapToData(result);
    }
    
    
    @PutMapping("put")
    public void createBanner( @RequestParam("bannerId") String bannerId,
    		  
    		  @RequestParam("hoat_dong") String hoatDong,
    		  
    		  @RequestParam("ngay_tao") String ngayTao,
    		 
    		  @RequestParam("trang_thai_xoa") String trangThaiXoa,
    		  
    		  @RequestParam("ngay_het_han") String ngayHetHan,
    		  
    		  @RequestParam("id") String accountID,
    		  
    		  @RequestParam("san_pham") String sanpham,
    		 
    		  @RequestParam(value = "hinh_anh", required = false) MultipartFile hinhFile) {
        
    	List<String> array =  Arrays.asList(sanpham.split(","));
        System.out.println("sadsa"+bannerId);
        System.out.println("sadsa"+ngayTao);
        System.out.println("sadsa"+trangThaiXoa);
        System.out.println("sadsa"+hoatDong);
        System.out.println("sadsa"+ngayHetHan);
        System.out.println("sadsa"+accountID);
        System.out.println("sadsa"+array.get(0));
        System.out.println("sadsa"+array.get(1));
        System.out.println("sadsa"+array.size());
        System.out.println("sadsa"+accountID);
       
      Users user = userrepository.findByAccountID(accountID);
  
     System.out.println("sdsad11111111111"+user.getAccountID());
      
     
    
      BannerChiTiet bnct = new BannerChiTiet();
      Banner banner = new Banner();
      
      banner.setBannerId(bannerId);
      banner.setHinh_anh(bannerId);
      banner.setHoat_dong(hoatDong);
      banner.setTrang_thai_xoa(trangThaiXoa);
      banner.setNgay_het_han(LocalDate.parse(ngayHetHan));
      banner.setNgay_tao(LocalDate.parse(ngayTao));
      banner.setUsers(user);
      Banner nhaCungCap2 = bannerRepository.save(banner);
    	HanhDong hd = new HanhDong();
  		hd.setBanner(nhaCungCap2);
  		hd.setTen_hanh_dong("Upload");
  		HanhDongReopository.save(hd);
      bnct.setBanner(banner);
      for (int i = 0; i < array.size(); i++) {
		Optional<DanhMuc> dm = DanhmucRepository.findById(array.get(i));
		DanhMuc dmn = dm.get();
	  bnct.setDanhmuc(dmn);
	}
      System.out.println("ss"+bnct.getBanner().getBannerId());
      bannerRepository.save(banner);
      BannerChiTietRepository.save(bnct);
      
    System.out.println(" Cập Nhật Thành Công");
        
    }
    @PostMapping("add")
    public void createBannerss( @RequestParam("bannerId") String bannerId,
    		  
    		  @RequestParam("hoat_dong") String hoatDong,
    		  
    		  @RequestParam("ngay_tao") String ngayTao,
    		 
    		  @RequestParam("trang_thai_xoa") String trangThaiXoa,
    		  
    		  @RequestParam("ngay_het_han") String ngayHetHan,
    		  
    		  @RequestParam("id") String accountID,
    		  
    		  @RequestParam("san_pham") String sanpham,
    		 
    		  @RequestParam(value = "hinh_anh", required = false) MultipartFile hinhFile) {
        
    	List<String> array =  Arrays.asList(sanpham.split(","));
        System.out.println("sadsa"+bannerId);
        System.out.println("sadsa"+ngayTao);
        System.out.println("sadsa"+trangThaiXoa);
        System.out.println("sadsa"+hoatDong);
        System.out.println("sadsa"+ngayHetHan);
        System.out.println("sadsa"+accountID);
        System.out.println("sadsa"+array.get(0));
        System.out.println("sadsa"+array.get(1));
        System.out.println("sadsa"+array.size());
        System.out.println("sadsa"+accountID);
       
      Users user = userrepository.findByAccountID(accountID);
  
     System.out.println("sdsad11111111111"+user.getAccountID());
      
     
    
      BannerChiTiet bnct = new BannerChiTiet();
      Banner banner = new Banner();
      
      banner.setBannerId(bannerId);
      banner.setHinh_anh(bannerId);
      banner.setHoat_dong(hoatDong);
      banner.setTrang_thai_xoa(trangThaiXoa);
      banner.setNgay_het_han(LocalDate.parse(ngayHetHan));
      banner.setNgay_tao(LocalDate.parse(ngayTao));
      banner.setUsers(user);
      Banner nhaCungCap2 = bannerRepository.save(banner);
    	HanhDong hd = new HanhDong();
  		hd.setBanner(nhaCungCap2);
  		hd.setTen_hanh_dong("Thêm");
  		HanhDongReopository.save(hd);
      bnct.setBanner(banner);
      for (int i = 0; i < array.size(); i++) {
		Optional<DanhMuc> dm = DanhmucRepository.findById(array.get(i));
		DanhMuc dmn = dm.get();
	  bnct.setDanhmuc(dmn);
	}
      System.out.println("ss"+bnct.getBanner().getBannerId());
      bannerRepository.save(banner);
      BannerChiTietRepository.save(bnct);
      
    System.out.println("Thêm Thành Công");
        
    }
    
   

    
    
	 @GetMapping("/generateNewBannerId") public ResponseEntity<String>
	  getNewBannerId() { String latestBannerId =
	  bannerRepository.findLatestBannerId(PageRequest.of(0,
	  1)).stream().findFirst().orElse("BN000"); String newBannerId =
	  generateNewBannerId(latestBannerId); return ResponseEntity.ok(newBannerId); }
	  
	  private String generateNewBannerId(String latestBannerId) { if
	  (latestBannerId.startsWith("BN")) { int numberPart =
	  Integer.parseInt(latestBannerId.substring(2)) + 1; return "BN" +
	  String.format("%03d", numberPart); } return "BN001"; }
    
	  @GetMapping("/bannerhanhdong") public List<BannerDTO> getMethodName11() {
			 return HanhDongReopository.findBanner(); }
    
	  
	  @GetMapping("/delete/{id}") public void
		  getAllAccountID(@PathVariable("id")String id) { Optional<Banner> banner =
		  bannerRepository.findById(id); Banner uservip = banner.get(); HanhDong hd =
		  new HanhDong(); hd.setBanner(uservip); hd.setTen_hanh_dong("Xóa");
		  HanhDongReopository.save(hd); bannerRepository.markAsDeleted("Đã xóa", id); 
		  } 

		  
	  @GetMapping("/back/{id}") public void back(@PathVariable("id")String id) {
			 Optional<Banner> banner = bannerRepository.findById(id); Banner uservip =
			  banner.get(); HanhDong hd = new HanhDong(); hd.setBanner(uservip);
			 hd.setTen_hanh_dong("Reload"); HanhDongReopository.save(hd);
			 bannerRepository.back(id); }
	  

    
	/*
	 * @GetMapping public List<Banner> getAllBanners() { return
	 * bannerService.getAllBanners(); }
	 * 
	 * @GetMapping("/delete/{id}") public void
	 * getAllAccountID(@PathVariable("id")String id) { Optional<Banner> banner =
	 * bannerRepository.findById(id); Banner uservip = banner.get(); HanhDong hd =
	 * new HanhDong(); hd.setBanner(uservip); hd.setTen_hanh_dong("Xóa");
	 * HanhDongReopository.save(hd); bannerRepository.markAsDeleted(id); }
	 * 
	 * @GetMapping("/back/{id}") public void back(@PathVariable("id")String id) {
	 * Optional<Banner> banner = bannerRepository.findById(id); Banner uservip =
	 * banner.get(); HanhDong hd = new HanhDong(); hd.setBanner(uservip);
	 * hd.setTen_hanh_dong("Reload"); HanhDongReopository.save(hd);
	 * bannerRepository.back(id); }
	 * 
	 * 
	 * 
	 * @PostMapping public ResponseEntity<Map<String, Object>> createBanner(
	 * 
	 * @RequestParam("bannerId") String bannerId,
	 * 
	 * @RequestParam("hoat_dong") String hoatDong,
	 * 
	 * @RequestParam("ngay_tao") String ngayTao,
	 * 
	 * @RequestParam("trang_thai_xoa") String trangThaiXoa,
	 * 
	 * @RequestParam("ngay_het_han") String ngayHetHan,
	 * 
	 * @RequestParam("id") String accountID,
	 * 
	 * @RequestParam(value = "hinh_anh", required = false) MultipartFile hinhFile) {
	 * 
	 * Map<String, Object> response = new HashMap<>();
	 * 
	 * // Kiểm tra trùng lặp bannerId if
	 * (bannerRepository.existsByBannerId(bannerId)) { response.put("message",
	 * "Mã banner đã tồn tại!"); return
	 * ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response); }
	 * 
	 * // Kiểm tra các trường bắt buộc if (bannerId == null || hoatDong == null ||
	 * trangThaiXoa == null || ngayHetHan == null || ngayTao == null ||
	 * bannerId.trim().isEmpty() || hoatDong.trim().isEmpty() ||
	 * trangThaiXoa.trim().isEmpty() || ngayHetHan.trim().isEmpty() ||
	 * ngayTao.trim().isEmpty()) { response.put("message",
	 * "Tất cả các trường là bắt buộc!"); return
	 * ResponseEntity.badRequest().body(response); }
	 * 
	 * // Kiểm tra và lấy thông tin tài khoản Users user =
	 * userrepository.findByAccountID(accountID); if (user == null) {
	 * response.put("message", "Tài khoản không tồn tại!"); return
	 * ResponseEntity.status(HttpStatus.NOT_FOUND).body(response); }
	 * 
	 * // Tạo đối tượng Banner Banner banner = new Banner();
	 * banner.setBannerId(bannerId); banner.setHoat_dong(hoatDong);
	 * banner.setTrang_thai_xoa(trangThaiXoa);
	 * banner.setNgay_het_han(LocalDate.parse(ngayHetHan));
	 * banner.setNgay_tao(LocalDate.parse(ngayTao)); banner.setUsers(user);
	 * 
	 * // Xử lý lưu ảnh nếu có if (hinhFile != null && !hinhFile.isEmpty()) { String
	 * filePath = IMAGE_DIR + File.separator + hinhFile.getOriginalFilename(); try {
	 * hinhFile.transferTo(new File(filePath));
	 * banner.setHinh_anh(hinhFile.getOriginalFilename()); } catch (IOException e) {
	 * logger.error("Lỗi khi lưu hình ảnh cho banner ID {}: {}", bannerId,
	 * e.getMessage()); response.put("message", "Không thể lưu hình ảnh!"); return
	 * ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response); } }
	 * 
	 * // Lưu banner try { Banner createdBanner =
	 * bannerService.createBanner(banner); response.put("message",
	 * "Banner đã được tạo thành công!"); response.put("banner", createdBanner);
	 * return new ResponseEntity<>(response, HttpStatus.CREATED); } catch (Exception
	 * e) { logger.error("Lỗi khi lưu banner: {}", e.getMessage());
	 * response.put("message", "Không thể lưu banner!"); return
	 * ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response); } }
	 * 
	 * 
	 * @PutMapping("/{bannerId}") public ResponseEntity<Map<String, Object>>
	 * updateBanner(
	 * 
	 * @PathVariable String bannerId,
	 * 
	 * @RequestParam("hoat_dong") String hoatDong,
	 * 
	 * @RequestParam("trang_thai_xoa") String trangThaiXoa,
	 * 
	 * @RequestParam("ngay_het_han") String ngayHetHan,
	 * 
	 * @RequestParam("ngay_tao") String ngayTao,
	 * 
	 * @RequestParam(value = "hinh_anh", required = false) MultipartFile hinhFile) {
	 * 
	 * Map<String, Object> response = new HashMap<>();
	 * 
	 * // Tìm banner theo ID Optional<Banner> existingBannerOpt =
	 * Optional.ofNullable(bannerService.getBannerById(bannerId)); if
	 * (existingBannerOpt.isEmpty()) { response.put("message",
	 * "Banner không tồn tại!"); return ResponseEntity.notFound().build(); } // Cập
	 * nhật thông tin banner Banner banner = existingBannerOpt.get();
	 * banner.setHoat_dong(hoatDong); banner.setTrang_thai_xoa(trangThaiXoa);
	 * banner.setNgay_het_han(LocalDate.parse(ngayHetHan));
	 * banner.setNgay_tao(LocalDate.parse(ngayTao));
	 * 
	 * // Xử lý lưu ảnh nếu có if (hinhFile != null && !hinhFile.isEmpty()) { String
	 * filePath = IMAGE_DIR + File.separator + hinhFile.getOriginalFilename(); try {
	 * hinhFile.transferTo(new File(filePath));
	 * banner.setHinh_anh(hinhFile.getOriginalFilename()); } catch (IOException e) {
	 * logger.error("Lỗi khi lưu hình ảnh cho banner ID {}: {}", bannerId,
	 * e.getMessage()); response.put("message", "Không thể lưu hình ảnh!"); return
	 * ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response); } }
	 * 
	 * // Cập nhật banner try { Banner updatedBanner =
	 * bannerService.updateBanner(bannerId, banner); response.put("message",
	 * "Banner đã được cập nhật thành công!"); response.put("banner",
	 * updatedBanner); return new ResponseEntity<>(response, HttpStatus.OK); } catch
	 * (Exception e) { logger.error("Lỗi khi cập nhật banner: {}", e.getMessage());
	 * response.put("message", "Không thể cập nhật banner!"); return
	 * ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response); } }
	 * 
	 * @DeleteMapping("/{bannerId}") public ResponseEntity<Void>
	 * deleteBanner(@PathVariable String bannerId) { // Check if the banner exists
	 * if (!bannerService.getBannerById(bannerId).isPresent()) { return
	 * ResponseEntity.notFound().build(); } bannerService.deleteBanner(bannerId);
	 * return ResponseEntity.noContent().build(); }
	 * 
	 * @GetMapping("/bannerhanhdong") public List<BannerDTO> getMethodName() {
	 * return HanhDongReopository.findBanner(); }
	 * 
	 * @GetMapping("/generateNewBannerId") public ResponseEntity<String>
	 * getNewBannerId() { String latestBannerId =
	 * bannerRepository.findLatestBannerId(PageRequest.of(0,
	 * 1)).stream().findFirst().orElse("BN000"); String newBannerId =
	 * generateNewBannerId(latestBannerId); return ResponseEntity.ok(newBannerId); }
	 * 
	 * private String generateNewBannerId(String latestBannerId) { if
	 * (latestBannerId.startsWith("BN")) { int numberPart =
	 * Integer.parseInt(latestBannerId.substring(2)) + 1; return "BN" +
	 * String.format("%03d", numberPart); } return "BN001"; }
	 */
}