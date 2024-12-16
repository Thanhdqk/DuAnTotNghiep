package com.BaiTapLab.RestController;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.BaiTapLab.DTO.BaiDangDTO;
import com.BaiTapLab.Entity.BaiDang;
import com.BaiTapLab.Entity.HanhDong;
import com.BaiTapLab.Repository.BaiDangRepository;
import com.BaiTapLab.Repository.HanhDongRepository;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Service.BaiDangService;
import com.google.cloud.storage.Acl;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

@RestController
public class BaiDangRestController {
	private static final String BUCKET_NAME = "staging.thanhnehihi.appspot.com";
	@Autowired
	BaiDangService baidangService;
	
	@Autowired
	BaiDangRepository baidangRepository;
	
	@Autowired
    UsersRepository userRepository;
	
	@Autowired
	HanhDongRepository HanhDongRepository;
	
	@GetMapping("/loadBaiDang")
    public ResponseEntity<List<BaiDang>> getBaiDang(){
		List<BaiDang> listBaiDang = baidangRepository.findAll();
		System.out.println(listBaiDang);
		return ResponseEntity.ok(listBaiDang);
	}
	
	@GetMapping("/baidang/getNewBaiDangID")
    public ResponseEntity<String> getNewBaiDangId(){
        String latestBaiDangId = getLatestBaiDangId();
        
        String newBaiDangId = generateNewBaiDangId(latestBaiDangId);
        
        return ResponseEntity.ok(newBaiDangId);
    }

	private String getLatestBaiDangId() {
        // Lấy mã mới nhất từ cơ sở dữ liệu
        List<String> latestBaiDangIds = baidangRepository.getLatestBaiDangId(PageRequest.of(0, 1));
        if (latestBaiDangIds.isEmpty()) {
            return "BaiDang001";  // Nếu không có bản ghi, trả về mã mặc định
        }
        String latestBaiDangId = latestBaiDangIds.get(0);
        System.out.println("Latest BaiDangId: " + latestBaiDangId); // In để kiểm tra
        return latestBaiDangId;
    }
    
    private String generateNewBaiDangId(String latestBaiDangId) {
        // Kiểm tra xem mã cũ có hợp lệ không
        if (latestBaiDangId != null && latestBaiDangId.startsWith("BaiDang")) {
            try {
                // Lấy phần số từ mã (tách sau "BaiDang")
                String numberPart = latestBaiDangId.substring("BaiDang".length()); 
                System.out.println("Number part before increment: " + numberPart); // Debug

                // Chuyển phần số thành integer và tăng lên 1
                int newIdNumber = Integer.parseInt(numberPart) + 1;

                // Định dạng lại số mới để luôn có 3 chữ số
                String formattedId = String.format("%03d", newIdNumber); // Đảm bảo luôn có 3 chữ số

                System.out.println("Formatted new ID: " + formattedId); // Debug

                // Trả về mã mới, ví dụ: ThuongHieu010
                return "BaiDang" + formattedId;
            } catch (NumberFormatException e) {
                // Xử lý lỗi nếu phần số không hợp lệ
                return "BaiDang001"; // Trả về mã mặc định nếu có lỗi
            }
        }
        return "BaiDang001"; // Nếu mã cũ không hợp lệ, trả về mã mặc định
    }
    
    @GetMapping("/edit/baidang/{bai_dangID}")
	public ResponseEntity<BaiDang> getBaiDangById(@PathVariable String bai_dangID){
		Optional<BaiDang> baidang = baidangRepository.findById(bai_dangID);
	    return baidang.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}
    
    @PostMapping("/baidang/add")
	public ResponseEntity<?> addBaiDang(
	        @RequestParam("bai_dangID") String bai_dangID,
	        @RequestParam(value = "hinh_anh", required = false) MultipartFile[] hinh_anh,
	        @RequestParam("tieu_de_phu") String tieu_de_phu,
	        @RequestParam("tieu_de_chinh") String tieu_de_chinh,
	        @RequestParam("noi_dung") String noi_dung,
	        @RequestParam("ngay_tao") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate ngay_tao,
	        @RequestParam("hoat_dong") String hoat_dong,
    		@RequestParam("accountID") String accountID){
    	
    		HanhDong hd = new HanhDong();
    	
	    try {
	    	
	        // Tạo đối tượng BaiDang từ các tham số
	        BaiDang baidang = new BaiDang();
	        baidang.setBai_dangID(bai_dangID);
	        baidang.setTieu_de_phu(tieu_de_phu);
	        baidang.setTieu_de_chinh(tieu_de_chinh);
	        baidang.setNoi_dung(noi_dung);
	        baidang.setNgay_tao(ngay_tao);
	        baidang.setHoat_dong(hoat_dong);
	        baidang.setUsers(userRepository.findByAccountID(accountID));
	        // Xử lý file ảnh nếu được upload
	        if (hinh_anh != null && hinh_anh.length > 0) {
	            String originalFileName = hinh_anh[0].getOriginalFilename();

	            String imageUrl = uploadFileToGCS(hinh_anh[0], originalFileName);

	            baidang.setHinh_anh(imageUrl);
	        }
	        
	        
	        // Lưu baidang vào DB qua service
	        BaiDang savedBaiDang = baidangService.createBaiDang(baidang);
	        hd.setBaidang(baidang);
            hd.setTen_hanh_dong("Thêm");
//            Thêm ngày hành động
           hd.setNgay_hanh_dong(LocalDate.now());
            HanhDongRepository.save(hd);
	        // Trả về thông tin baidang đã lưu
	        return ResponseEntity.ok(savedBaiDang);

	    } catch (IOException e) {
	        System.out.println(e);
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Lỗi khi lưu file: " + e.getMessage());
	    } catch (Exception e) {
	        // Xử lý lỗi chung
	    	System.out.println(e);
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Lỗi khi tạo bài đăng: " + e.getMessage());
	    }
	}
    private String uploadFileToGCS(MultipartFile file, String fileName) throws IOException {
        // 1. Xác thực với Google Cloud
        Storage storage = StorageOptions.newBuilder()
                .setProjectId("thanhnehihi") // Project ID
                .setCredentials(StorageOptions.getDefaultInstance().getCredentials())
                .build()
                .getService();

        // 2. Tạo thông tin Blob
        BlobId blobId = BlobId.of(BUCKET_NAME, fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(file.getContentType()).build();

        // 3. Tải file lên bucket
        Blob blob = storage.create(blobInfo, file.getBytes());

        // 4. Cấp quyền công khai cho file (allUsers có thể đọc)
        Acl acl = Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER); 
        storage.createAcl(blobId, acl); // Thêm quyền đọc cho tất cả người dùng

        // 5. Tạo URL công khai
        return String.format("https://storage.googleapis.com/%s/%s", BUCKET_NAME, fileName);
    }
    
    @PutMapping("/baidang/update/{bai_dangID}")
	public ResponseEntity<?> updateBaiDang(
	        @PathVariable String bai_dangID,
	        @RequestParam(value = "hinh_anh", required = false) MultipartFile[] hinh_anh,
	        @RequestParam("tieu_de_phu") String tieu_de_phu,
	        @RequestParam("tieu_de_chinh") String tieu_de_chinh,
	        @RequestParam("noi_dung") String noi_dung,
	        @RequestParam("ngay_tao") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate ngay_tao,
	        @RequestParam("hoat_dong") String hoat_dong,
    		@RequestParam("accountID") String accountID) {
    	
    		HanhDong hd = new HanhDong();

	    try {
	        // Tìm baidang theo ID
	        BaiDang baidang = baidangService.findByBaiDangID(bai_dangID);
	        
	        // Cập nhật các thuộc tính của baidang
	        baidang.setTieu_de_phu(tieu_de_phu);
	        baidang.setTieu_de_chinh(tieu_de_chinh);
	        baidang.setNoi_dung(noi_dung);
	        baidang.setNgay_tao(ngay_tao);
	        baidang.setHoat_dong(hoat_dong);
	        baidang.setUsers(userRepository.findByAccountID(accountID));

	        // Xử lý file ảnh nếu được upload
	        if (hinh_anh != null && hinh_anh.length > 0) {
	            String tenHinhAnh = hinh_anh[0].getOriginalFilename();
	            String uploadDir = System.getProperty("user.dir") + "/uploads/images/";

	            // Tạo thư mục nếu chưa tồn tại
	            File hinhFile = new File(uploadDir + tenHinhAnh);
	            if (!hinhFile.getParentFile().exists()) {
	                hinhFile.getParentFile().mkdirs();
	            }

	            // Lưu file ảnh vào thư mục
	            hinh_anh[0].transferTo(hinhFile);

	            // Tạo URL để truy cập ảnh và lưu vào đối tượng Voucher
	            String imageUrl = "http://localhost:8080/images/" + tenHinhAnh;
	            baidang.setHinh_anh(tenHinhAnh);
	        }

	        // Lưu baidang vào DB qua service
	        
	        BaiDang updatedBaiDang = baidangService.updateBaiDang(baidang);
	        
	        hd.setBaidang(baidang);
            hd.setTen_hanh_dong("Cập nhật");
          
            hd.setNgay_hanh_dong(LocalDate.now());
            HanhDongRepository.save(hd);

	        // Trả về thông tin baidang đã lưu
	        return ResponseEntity.ok(updatedBaiDang);

	    } catch (IOException e) {
	        // Xử lý lỗi IO
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Lỗi khi lưu file: " + e.getMessage());
	    } catch (Exception e) {
	        // Xử lý lỗi chung
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Lỗi khi cập nhật bài đăng: " + e.getMessage());
	    }
	}
    

    
    @PutMapping("/baidang/deleteToGarbage/{bai_dangID}")
	public ResponseEntity<Object> deleteBaiDangToGarbage(@PathVariable String bai_dangID) {
	    boolean isDeleted = baidangService.deleteBaiDangById(bai_dangID);
	    if (isDeleted) {
	    	HanhDong hd = new HanhDong();
	    	BaiDang baidang = baidangService.findByBaiDangID(bai_dangID);
	    	hd.setBaidang(baidang);
	    	hd.setTen_hanh_dong("Xóa");
	    	hd.setNgay_hanh_dong(LocalDate.now());
	    	HanhDongRepository.save(hd);
	        // Trả về một đối tượng JSON
	        return ResponseEntity.ok(Collections.singletonMap("message", "Bài đăng đã được cập nhật trạng thái xóa"));
	    } else {
	        // Trả về một đối tượng JSON chứa thông báo lỗi
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "Không tìm thấy bài đăng với ID: " + bai_dangID));
	    }
	}

	@PutMapping("/baidang/reloadFromGarbage/{bai_dangID}")
	public ResponseEntity<Object> deleteBaiDangToGarbageNull(@PathVariable String bai_dangID) {
	    boolean isDeleted = baidangService.reloadBaiDangById(bai_dangID);
	    if (isDeleted) {
	        // Trả về một đối tượng JSON
	    	HanhDong hd = new HanhDong();
	    	BaiDang baidang = baidangService.findByBaiDangID(bai_dangID);
	    	hd.setBaidang(baidang);
	    	hd.setTen_hanh_dong("Phục hồi");
	    	hd.setNgay_hanh_dong(LocalDate.now());
	    	HanhDongRepository.save(hd);
	        return ResponseEntity.ok(Collections.singletonMap("message", "Bài đăng đã được cập nhật trạng thái chưa xóa"));
	    } else {
	        // Trả về một đối tượng JSON chứa thông báo lỗi
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "Không tìm thấy bài đăng với ID: " + bai_dangID));
	    }
	}
	
	@GetMapping("baidang/gethanhdong")
	public List<BaiDangDTO> getMethodName() {
		return HanhDongRepository.findBaiDang();
	}
}
