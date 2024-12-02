package com.BaiTapLab.RestController;

import com.BaiTapLab.DTO.NhaCungCapDTO;
/*import com.BaiTapLab.DTO.NhaCungCapDTO;*/
import com.BaiTapLab.DTO.UserDTO;
import com.BaiTapLab.Entity.HanhDong;
import com.BaiTapLab.Entity.NhaCungCap;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.BannerRepository;
import com.BaiTapLab.Repository.HanhDongReopository;
import com.BaiTapLab.Repository.NhaCungCapRepository;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Service.NhaCungCapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/nhacungcap")	
@CrossOrigin(origins = { "http://localhost:3000" })
public class NhaCungCapRestController {
	
	@Autowired
	UsersRepository userrepository;
	
	@Autowired
	HanhDongReopository HanhDongReopository; 
	
	@Autowired
	NhaCungCapRepository nhacupcaprepository;
	
    @Autowired
    private NhaCungCapService nhaCungCapService;
	/*
	 * @Autowired NhaCungCapDTO NhaCungCapDTO;
	 */

    @GetMapping
    public List<NhaCungCap> getAllNhaCungCap() {
        return nhaCungCapService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<NhaCungCap> getNhaCungCapById(@PathVariable String id) {
        return nhaCungCapService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/delete/{id}")
	public void getAllAccountID(@PathVariable("id")String id) {
		Optional<NhaCungCap> nhacungcap = nhacupcaprepository.findById(id);
		NhaCungCap uservip = nhacungcap.get();
		HanhDong hd = new HanhDong();
		hd.setNhacungcap(uservip);
		hd.setTen_hanh_dong("Xóa");
		HanhDongReopository.save(hd);
		 nhacupcaprepository.markAsDeleted(id);
	}
	
	@GetMapping("/back/{id}")
	public void back(@PathVariable("id")String id) {
		Optional<NhaCungCap> nhacungcap = nhacupcaprepository.findById(id);
		NhaCungCap uservip = nhacungcap.get();
		HanhDong hd = new HanhDong();
		hd.setNhacungcap(uservip);
		hd.setTen_hanh_dong("Reload");
		HanhDongReopository.save(hd);
		 nhacupcaprepository.back(id);
	}


    
//    @PostMapping("/save")
//    public ResponseEntity<Map<String, Object>> createNhaCungCap(@RequestBody NhaCungCap nhaCungCap) {
//        Map<String, Object> response = new HashMap<>();
//
//        // Kiểm tra các trường bắt buộc
//        if (nhaCungCap.getNha_cung_capID() == null || nhaCungCap.getTen_nhaCC() == null ||
//            nhaCungCap.getTen_mat_hang() == null || nhaCungCap.getSo_dien_thoai() == null ||
//            nhaCungCap.getDia_chi() == null || nhaCungCap.getTrang_thai_xoa() == null) {
//            response.put("message", "Tất cả các trường là bắt buộc!");
//            return ResponseEntity.badRequest().body(response);
//        }
//
//        // Kiểm tra accountID và tìm người dùng
//        if (nhaCungCap.getUsers() != null && nhaCungCap.getUsers().getAccountID() != null) {
//            String accountID = nhaCungCap.getUsers().getAccountID();
//            
//            // In accountID ra để kiểm tra
//            System.out.println("accountID nhận được: " + accountID);
//
//            Users user = userrepository.findByAccountID(accountID);
//            if (user != null) {
//                System.out.println("Tìm thấy người dùng với accountID: " + accountID);
//                nhaCungCap.setUsers(user);
//            } else {
//                response.put("message", "accountID không hợp lệ. Không tìm thấy người dùng với accountID: " + accountID);
//                return ResponseEntity.badRequest().body(response);
//            }
//        } else {
//            response.put("message", "accountID không hợp lệ hoặc chưa được cung cấp.");
//            return ResponseEntity.badRequest().body(response);
//        }
//        System.out.println("NhaCungCap nhận được: " + nhaCungCap);
//        NhaCungCap createdNhaCungCap = nhaCungCapService.save(nhaCungCap);
//        response.put("message", "Nhà cung cấp đã được tạo thành công!");
//        response.put("nhaCungCap", createdNhaCungCap);
//        return new ResponseEntity<>(response, HttpStatus.CREATED);
//    }


    @PutMapping("/saveee")
    public void createNhaCungCap1(
           
    		
            @RequestParam("id") String accountID,
            @RequestParam("nha_cung_capID") String nha_cung_capID,
            @RequestParam("ten_nhaCC") String ten_nhaCC,
            @RequestParam("ten_mat_hang") String ten_mat_hang,
            @RequestParam("dia_chi") String dia_chi,
            @RequestParam("so_dien_thoai") String so_dien_thoai,
            @RequestParam("trang_thai_xoa") String trang_thai_xoa)
    	 {
      
       System.out.println("id"+accountID);
       System.out.println("nha_cung_capID"+nha_cung_capID);
       System.out.println("nha_cung_capID"+ten_nhaCC);
       System.out.println("nha_cung_capID"+ten_mat_hang);
       System.out.println("nha_cung_capID"+dia_chi);
       System.out.println("nha_cung_capID"+so_dien_thoai);
       System.out.println("nha_cung_capID"+trang_thai_xoa);
       Users user = userrepository.findByAccountID(accountID);
       NhaCungCap cc = new NhaCungCap();
       cc.setUsers(user);
       cc.setNha_cung_capID(nha_cung_capID);
       cc.setDia_chi(dia_chi);
       cc.setSo_dien_thoai(so_dien_thoai);
       cc.setTen_nhaCC(ten_nhaCC);
       cc.setTen_mat_hang(ten_mat_hang);
       cc.setTrang_thai_xoa(trang_thai_xoa);
       NhaCungCap nhaCungCap2 = nhacupcaprepository.save(cc);
  	HanhDong hd = new HanhDong();
		hd.setNhacungcap(nhaCungCap2);
		hd.setTen_hanh_dong("Thêm");
		HanhDongReopository.save(hd);
      System.out.println("ccccccccccccc");
    
        
    }
    @PostMapping("/save")
    public void createNhaCungCap(
           
    		
            @RequestParam("id") String accountID,
            @RequestParam("nha_cung_capID") String nha_cung_capID,
            @RequestParam("ten_nhaCC") String ten_nhaCC,
            @RequestParam("ten_mat_hang") String ten_mat_hang,
            @RequestParam("dia_chi") String dia_chi,
            @RequestParam("so_dien_thoai") String so_dien_thoai,
            @RequestParam("trang_thai_xoa") String trang_thai_xoa)
    	 {
      
       System.out.println("id"+accountID);
       System.out.println("nha_cung_capID"+nha_cung_capID);
       System.out.println("nha_cung_capID"+ten_nhaCC);
       System.out.println("nha_cung_capID"+ten_mat_hang);
       System.out.println("nha_cung_capID"+dia_chi);
       System.out.println("nha_cung_capID"+so_dien_thoai);
       System.out.println("nha_cung_capID"+trang_thai_xoa);
       Users user = userrepository.findByAccountID(accountID);
       NhaCungCap cc = new NhaCungCap();
       cc.setUsers(user);
       cc.setNha_cung_capID(nha_cung_capID);
       cc.setDia_chi(dia_chi);
       cc.setSo_dien_thoai(so_dien_thoai);
       cc.setTen_nhaCC(ten_nhaCC);
       cc.setTen_mat_hang(ten_mat_hang);
       cc.setTrang_thai_xoa(trang_thai_xoa);
       NhaCungCap nhaCungCap2 = nhacupcaprepository.save(cc);
  	HanhDong hd = new HanhDong();
		hd.setNhacungcap(nhaCungCap2);
		hd.setTen_hanh_dong("Upload");
		HanhDongReopository.save(hd);
      System.out.println("ccccccccccccc");
    
        
    }
    

    
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteNhaCungCap(@PathVariable String id) {
        Map<String, String> response = new HashMap<>();

        // Check if the entity exists
        Optional<NhaCungCap> nhaCungCap = nhaCungCapService.findById(id);
        if (nhaCungCap.isEmpty()) {
            response.put("message", "Nhà cung cấp không tồn tại!");
            return ResponseEntity.notFound().build();
        }

        nhaCungCapService.deleteById(id);
        response.put("message", "Nhà cung cấp đã được xóa thành công!");
        return ResponseEntity.ok(response);
    }
    @GetMapping("/ncchanhdong")
	public List<NhaCungCapDTO> getMethodName() {
		return HanhDongReopository.findNhaCungCap();
	}
    @GetMapping("/generateNewNccId")
    public ResponseEntity<String> getNewBannerId() {
        String latestBannerId = nhacupcaprepository.findLatestBannerId(PageRequest.of(0, 1)).stream().findFirst().orElse("NCC000");
        String newBannerId = generateNewBannerId(latestBannerId);
        return ResponseEntity.ok(newBannerId);
    }

    private String generateNewBannerId(String latestBannerId) {
        if (latestBannerId.startsWith("NCC")) {
            int numberPart = Integer.parseInt(latestBannerId.substring(3)) + 1;
            return "NCC" + String.format("%03d", numberPart);
        }
        return "NCC001";
        
    }
}