package com.BaiTapLab.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.BaiTapLab.Entity.Banner;
import com.BaiTapLab.Entity.DanhMuc;
import com.BaiTapLab.Entity.HanhDong;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.BannerRepository;
import com.BaiTapLab.Repository.DanhMucRepository;
import com.BaiTapLab.Repository.HanhDongRepository;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Service.DanhmucService;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RescontrollerDanhmucLoi {
	
	@Autowired
	DanhmucService DanhmucService;
	
	@Autowired
	DanhMucRepository DanhmucRepository;
	
	@Autowired
	UsersRepository UsersRepository;
	
	@Autowired 
	BannerRepository BannerRepository;
	
	@Autowired
	HanhDongRepository HanhDongRepository;
	
	@GetMapping("findAllCategory")
	public List<DanhMuc> getMethodName() {
		
		return  DanhmucService.FindALL();
		
	}
	
	@GetMapping("findAllCategoryHanhDong")
	public List<DanhMuc> getMethodHanhDong() {
		return  DanhmucService.FindHanhDong();
	}
	
	// dùng để làm chức năng sản phẩm tương tự
	@GetMapping("findDanhMucBySanPhamId")
	public DanhMuc getMethodName(@RequestParam("id") String id) {
		DanhmucService.FindDanhMucByIDSanPham(id);
		return 	DanhmucService.FindDanhMucByIDSanPham(id);
	}
	// here
	// google
	@PostMapping("DanhMuc/ADD_DanhMuc")
	public void postMethodName1add(
			@RequestParam("name") String name, 
            @RequestParam("createdDate") LocalDate createdDate,
            @RequestParam("status") String status,
            @RequestParam("image") String image,
            @RequestParam("iduser") String iduser,
            @RequestParam("imgFile") MultipartFile imgFile) {
		List<String> ids = DanhmucRepository.findAllIdsDesc();
		String newid = generateNewId(ids);
		HanhDong hanhdong = new HanhDong();
		System.out.println("ảnh nè ccccccccccccccccccccccc: "+imgFile.getOriginalFilename());
		System.out.println("ảnh nè ccccccccccccccccccccccc: "+imgFile.getOriginalFilename());
	    try {
	    	Users user = UsersRepository.findByAccountID(iduser);	    
		    DanhMuc danhmuc = new DanhMuc();
		    danhmuc.setUsers(user);
		    danhmuc.setTrang_thai_xoa(null);
		    danhmuc.setHinh_anh(image);
		    danhmuc.setNgay_tao(createdDate);
		    danhmuc.setTen_loaiDM(name);
		    danhmuc.setHoat_dong(status);
		    danhmuc.setDanh_mucId(newid);
		    System.out.println("sadasd"+newid);
		    DanhmucService.ADD_DanhMuc(danhmuc);
		    hanhdong.setDanhmuc(danhmuc);
		    hanhdong.setTen_hanh_dong("Thêm");
		    HanhDongRepository.save(hanhdong);
		    System.out.println("sadsadsadasdasdsad");
		} catch (Exception e) {
			System.out.println(e);
		}
	}

	// here
	// google
	@PutMapping("DanhMuc/UPDATE_DanhMuc")
	public void postMethodName(
			@RequestParam("id") String id,
			@RequestParam("name") String name, 
			 @RequestParam("imgFile") MultipartFile imgFile,
            @RequestParam("createdDate") LocalDate createdDate,
           @RequestParam("status") String status,
            @RequestParam("image") String image,
           @RequestParam("iduser") String iduser) {
		System.out.println("ảnh nè UPDATE ccccccccccccccccccccccc: "+imgFile.getOriginalFilename());
		System.out.println("ảnh nè UPDATE ccccccccccccccccccccccc: "+imgFile.getOriginalFilename());
		HanhDong hanhdong = new HanhDong();
	    try {
	    	Users user = UsersRepository.findByAccountID(iduser);
		    DanhMuc danhmuc = new DanhMuc();
		    danhmuc.setUsers(user);
		    danhmuc.setTrang_thai_xoa(null);
		    danhmuc.setHinh_anh(imgFile.getOriginalFilename());
	    danhmuc.setNgay_tao(createdDate);
		    danhmuc.setTen_loaiDM(name);
		    danhmuc.setHoat_dong(status);
		    danhmuc.setDanh_mucId(id);
		    System.out.println("sadasd"+id);
		    DanhmucService.ADD_DanhMuc(danhmuc);
		    System.out.println("sadsadsadasdasdsad");
		    hanhdong.setDanhmuc(danhmuc);
		    hanhdong.setTen_hanh_dong("Cập Nhật");
		    HanhDongRepository.save(hanhdong);
		} catch (Exception e) {
			System.out.println(e);
		}
	}
	
	
	@PutMapping("DanhMuc/UPDATE_DanhMucNOImage")
	public void DanhMucNOImage(
			@RequestParam("id") String id,
			@RequestParam("name") String name, 
			
            @RequestParam("createdDate") LocalDate createdDate,
           @RequestParam("status") String status,
            @RequestParam("image") String image,
           @RequestParam("iduser") String iduser) {
		HanhDong hanhdong = new HanhDong();
	    try {
	    	Users user = UsersRepository.findByAccountID(iduser);
		    DanhMuc danhmuc = new DanhMuc();
		    danhmuc.setUsers(user);
		    danhmuc.setTrang_thai_xoa(null);
		    danhmuc.setHinh_anh(image);
	    danhmuc.setNgay_tao(createdDate);
		    danhmuc.setTen_loaiDM(name);
		    danhmuc.setHoat_dong(status);
		    danhmuc.setDanh_mucId(id);
		    System.out.println("sadasd"+id);
		    DanhmucService.ADD_DanhMuc(danhmuc);
		    System.out.println("sadsadsadasdasdsad");
		    hanhdong.setDanhmuc(danhmuc);
		    hanhdong.setTen_hanh_dong("Cập Nhật");
		    HanhDongRepository.save(hanhdong);
		} catch (Exception e) {
			System.out.println(e);
		}
	    
	}
	
	@DeleteMapping("DanhMuc/DeleteDanhMuc/{id}")
	public void DeleteDanhmuc(@PathVariable("id") String  id)
	{
		HanhDong hanhdong = new HanhDong();
		Optional<DanhMuc> danhmuc = DanhmucRepository.findById(id);
		DanhMuc newdanhmuc= danhmuc.get();
		hanhdong.setDanhmuc(newdanhmuc);
		hanhdong.setTen_hanh_dong("Xóa");
		HanhDongRepository.save(hanhdong);
		DanhmucService.Delete_DanhMuc(id);
	}
	
	@DeleteMapping("DanhMuc/BackDeleteDanhMuc/{id}")
	public void backDeleteDanhmuc(@PathVariable("id") String  id)
	{
		HanhDong hanhdong = new HanhDong();
		Optional<DanhMuc> danhmuc = DanhmucRepository.findById(id);
		DanhMuc newdanhmuc= danhmuc.get();
		hanhdong.setDanhmuc(newdanhmuc);
		hanhdong.setTen_hanh_dong("Quay Lại");
		hanhdong.setNgay_hanh_dong(LocalDate.now());
		HanhDongRepository.save(hanhdong);
		DanhmucService.Back_DanhMuc(id);
	}
	
	
	@GetMapping("findCategoryNotDelete")
	public List<DanhMuc> findCategoryNotDelete() {
		return  DanhmucService.FindALLNodelete();
	}
	
	@GetMapping("findCategoryDelete")
	public List<DanhMuc> findCategoryDelete() {
		return  DanhmucService.FindALLdeleted();
	}
	
	
	private String generateNewId(List<String> ids) {
	    if (ids.isEmpty()) {
	        return "DM001";
	    }
	    String lastId = ids.get(0);  
	    String prefix = lastId.replaceAll("[^a-zA-Z]", "");
	    String numberPart = lastId.replaceAll("[^0-9]", "");
	    int newNumber = Integer.parseInt(numberPart) + 1;
	    return prefix + String.format("%03d", newNumber);
	}
	
	@GetMapping("DanhMuc/findTrung")
	public DanhMuc getMethodNamefindTrung(@RequestParam String name) {
		DanhMuc dm =  DanhmucRepository.findDanhMucByname(name);
		return dm;
	}
	
	@GetMapping("DanhMuc/findALLNotWorking")
	public List<DanhMuc>  findALLNotWorking()
	{
		return DanhmucRepository.findALLNotWorking();
	}
	
	@GetMapping("DanhMuc/findALLWorking")
	public List<DanhMuc>  findALLWorking()
	{
		return DanhmucRepository.findALLWorking();
	}	
	
	@GetMapping("DanhMuc/FINDVIP/{id}")
	public List<String>  findIDDanhMucByBannerID(@PathVariable("id")String id)
	{
		return DanhmucRepository.findDanhMucIdBybannerID(id);
	}
}