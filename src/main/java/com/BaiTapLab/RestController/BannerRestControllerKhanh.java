package com.BaiTapLab.RestController;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Array;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.BaiTapLab.DTO.BannerChiTietDTO;
import com.BaiTapLab.DTO.BannerDTO;
import com.BaiTapLab.DTO.BannerDTO2;
import com.BaiTapLab.DTO.DanhMucDTO;
/*import com.BaiTapLab.DTO.BannerDTO;*/
import com.BaiTapLab.DTO.UserDTO;
import com.BaiTapLab.DTO.UserDTO2;
import com.BaiTapLab.Entity.Banner;
import com.BaiTapLab.Entity.BannerChiTiet;
import com.BaiTapLab.Entity.DanhMuc;
import com.BaiTapLab.Entity.HanhDong;
import com.BaiTapLab.Entity.NhaCungCap;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.BannerChiTietRepository;
import com.BaiTapLab.Repository.BannerRepository;
import com.BaiTapLab.Repository.DanhMucRepository;
import com.BaiTapLab.Repository.HanhDongRepository;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Service.BannerService;
import com.google.cloud.storage.Acl;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/banners")
@CrossOrigin(origins = { "http://localhost:3000" })
public class BannerRestControllerKhanh {
	// Finish cloud
	private static final Logger logger = LoggerFactory.getLogger(BannerRestControllerKhanh.class);
	private static final String IMAGE_DIR = "C:\\Users\\DELL\\Downloads\\LoiFrontend\\public\\images";
	private static final String BUCKET_NAME = "staging.thanhnehihi.appspot.com";
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
        //return String.format("https://storage.googleapis.com/%s/%s", BUCKET_NAME, fileName);
        return String.format(fileName);
    }
	@Autowired
	private BannerService bannerService;

	@Autowired
	BannerChiTietRepository BannerChiTietRepository;

	@Autowired
	UsersRepository userrepository;

	@Autowired
	BannerRepository bannerRepository;

	@Autowired
	HanhDongRepository HanhDongReopository;

	@Autowired
	DanhMucRepository DanhmucRepository;

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
	public List<DanhMuc> getMethodDanhmuc() {
		List<DanhMuc> result = DanhmucRepository.findAll();

		return result;
	}


	@GetMapping("findalldanhmuc2")
	public List<BannerDTO2> getMethodDanhmucByDTO() {
		LocalDate now = LocalDate.now();
		return bannerRepository.findkohethan(now).stream().map(b -> new BannerDTO2(b.getBannerId(), b.getHinh_anh(),
				b.getHoat_dong(), b.getTrang_thai_xoa(), b.getNgay_tao(), b.getNgay_het_han(),
				new UserDTO2(b.getUsers().getAccountID(), b.getUsers().getHovaten()),
				b.getBannerchitiet().stream()
						.map(bct -> new BannerChiTietDTO(bct.getBannerchitietid(),
								new DanhMucDTO(bct.getDanhmuc().getDanh_mucId())))
						.collect(Collectors.toList())))
				.collect(Collectors.toList());

	}
	
	@GetMapping("findallbannerHetHan")
	public List<BannerDTO2> getMethodDanhmucByDTOHetHan() {
		LocalDate now = LocalDate.now();
		return bannerRepository.findExpiredBanners(now).stream().map(b -> new BannerDTO2(b.getBannerId(), b.getHinh_anh(),
				b.getHoat_dong(), b.getTrang_thai_xoa(), b.getNgay_tao(), b.getNgay_het_han(),
				new UserDTO2(b.getUsers().getAccountID(), b.getUsers().getHovaten()),
				b.getBannerchitiet().stream()
						.map(bct -> new BannerChiTietDTO(bct.getBannerchitietid(),
								new DanhMucDTO(bct.getDanhmuc().getDanh_mucId())))
						.collect(Collectors.toList())))
				.collect(Collectors.toList());

	}
	

	@GetMapping("findalldanhmuc3")
	public List<BannerDTO2> getMethodDanhmucByDTO3() {
		return bannerRepository.findAll().stream().map(b -> new BannerDTO2(b.getBannerId(), b.getHinh_anh(),
				b.getHoat_dong(), b.getTrang_thai_xoa(), b.getNgay_tao(), b.getNgay_het_han(),
				new UserDTO2(b.getUsers().getAccountID(), b.getUsers().getHovaten()),
				b.getBannerchitiet().stream()
						.map(bct -> new BannerChiTietDTO(bct.getBannerchitietid(),
								new DanhMucDTO(bct.getDanhmuc().getDanh_mucId())))
						.collect(Collectors.toList())))
				.collect(Collectors.toList());

	}

	@GetMapping("findall")
	public List<Map<String, Object>> getMethodName() {
		List<Object[]> result = BannerChiTietRepository.findBannerDanhMucAndUsersJPQL();

		return MapToData(result);
	}

	@GetMapping("loiyeudau")
	public List<Map<String, Object>> getMethodNameeee() {
		// Lấy dữ liệu từ phương thức truy vấn
		List<Object[]> result = BannerChiTietRepository.findBannerDanhMucAndUsersJPQLtest();

		// Chuyển dữ liệu thành dạng mong muốn (gộp các danh mục theo bannerId)
		return MapToData1(result);
	}

	public List<Map<String, Object>> MapToData1(List<Object[]> results) {
		// Sử dụng Map để nhóm các banner theo bannerId
		Map<String, Map<String, Object>> bannerMap = new HashMap<>();

		for (Object[] row : results) {
			String bannerId = (String) row[0]; // bannerId

			// Kiểm tra xem banner đã có trong map chưa, nếu chưa thì tạo mới
			Map<String, Object> banner = bannerMap.get(bannerId);

			// Nếu banner chưa có trong map, tạo mới
			if (banner == null) {
				banner = new HashMap<>();
				banner.put("bannerId", bannerId);
				banner.put("hinh_anh", row[1]); // hinh_anh
				banner.put("hoat_dong", row[2]); // hoat_dong
				banner.put("ngay_tao", row[3]); // ngay_tao
				banner.put("ngay_het_han", row[4]); // ngay_het_han
				banner.put("accountID", row[6]); // accountID
				banner.put("trang_thai_xoa", row[7]); // trang_thai_xoa
				// Khởi tạo danh mục là một HashSet để không trùng
				banner.put("danh_mucIds", new HashSet<String>());
				// Đưa banner vào map (dùng bannerId làm key để nhóm)
				bannerMap.put(bannerId, banner);
			}

			// Lấy danh sách danh mục của banner từ Set (gộp lại các danh mục trùng nhau)
			Set<String> danhMucIds = (Set<String>) banner.get("danh_mucIds");
			danhMucIds.add((String) row[5]); // Thêm danh mục vào Set (gộp lại)

			// Cập nhật lại danh mục
			banner.put("danh_mucIds", danhMucIds);
		}

		// Trả về danh sách các banner sau khi đã gộp danh mục
		return new ArrayList<>(bannerMap.values());
	}

	@GetMapping("findalldeleted")
	public List<Map<String, Object>> findalldeleted() {
		List<Object[]> result = BannerChiTietRepository.findBannerDanhMucAndUsersJPQLdeleted();

		return MapToData(result);
	}

	@PutMapping("put/{bannerId}")
	public ResponseEntity<Map<String, Object>> updateBanner(@PathVariable String bannerId,
			@RequestParam("hoat_dong") String hoatDong, @RequestParam("ngay_het_han") String ngayHetHan,
			@RequestParam("ngay_tao") String ngayTao, @RequestParam("id") String accountID,
			@RequestParam(value = "hinh_anh", required = false) MultipartFile hinhFile,
			@RequestParam(value = "san_pham", required = false) List<String> sanpham) {

		Map<String, Object> response = new HashMap<>();

		try {
			// Kiểm tra sự tồn tại của Banner
			Banner banner = bannerRepository.findById(bannerId).orElse(null);
			if (banner == null) {
				response.put("message", "Banner không tồn tại!");
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
			}

			// Kiểm tra sự tồn tại của User
			Users user = userrepository.findByAccountID(accountID);
			if (user == null) {
				response.put("message", "Không tìm thấy User với ID: " + accountID);
				return ResponseEntity.badRequest().body(response);
			}

			// Cập nhật thông tin cho Banner
			banner.setHoat_dong(hoatDong);
			banner.setNgay_het_han(LocalDate.parse(ngayHetHan));
			banner.setNgay_tao(LocalDate.parse(ngayTao));
			
			banner.setUsers(user);

			List<String> source = new ArrayList<String>();
			List<String> sourcetempt = new ArrayList<String>();
			for (String newsp : sanpham) {
				source.add(newsp);
				sourcetempt.add(newsp);
			}

			List<String> valuesToRemove = new ArrayList<String>();
			for (int i = 0; i < banner.getBannerchitiet().size(); i++) {
				valuesToRemove.add(banner.getBannerchitiet().get(i).getDanhmuc().getDanh_mucId());
			}
			System.out.println("mới: " + source);
			System.out.println("cũ: " + valuesToRemove);

			try {
				sourcetempt.removeAll(valuesToRemove);
				System.out.println("sourcetempt : " + sourcetempt);
				if (sourcetempt.size() > 0) {
					for (int i = 0; i < sourcetempt.size(); i++) {
						BannerChiTiet bct = new BannerChiTiet();
						bct.setDanhmuc(DanhmucRepository.findById(sourcetempt.get(i)).get());
						bct.setBanner(banner);
						BannerChiTietRepository.save(bct);
					}

				}
				valuesToRemove.removeAll(source);
				System.out.println("cần xóa: " + valuesToRemove);
				try {
					if (valuesToRemove.size() > 0) {
						for (int i = 0; i < valuesToRemove.size(); i++) {
							DanhMuc dm = DanhmucRepository.findById(valuesToRemove.get(i)).get();
							BannerChiTietRepository.removefromBannerChitiet(banner.getBannerId(), dm.getDanh_mucId());
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}

			} catch (Exception e) {
				e.printStackTrace();
			}

			// Xử lý lưu ảnh nếu có
			if (hinhFile != null && !hinhFile.isEmpty()) {
				String fileName = hinhFile.getOriginalFilename();
				String filePath = IMAGE_DIR + File.separator + fileName;

				hinhFile.transferTo(new File(filePath)); // Lưu ảnh vào thư mục
				banner.setHinh_anh(fileName); // Cập nhật tên ảnh vào database
			}
//	        if (hinhFile != null ) {
//	            String originalFileName = hinhFile.getOriginalFilename();
//	
//	            String imageUrl = uploadFileToGCS(hinhFile, originalFileName);
//	
//	            banner.setHinh_anh(imageUrl);
//	        }

			// Lưu banner đã cập nhật
			Banner updatedBanner = bannerRepository.save(banner);

			// Ghi lại hành động cập nhật
			HanhDong hanhDong = new HanhDong();
			hanhDong.setBanner(updatedBanner);
			hanhDong.setNgay_hanh_dong(LocalDate.now());
			hanhDong.setTen_hanh_dong("Upload");
			HanhDongReopository.save(hanhDong);

			// Trả về kết quả thành công
			response.put("message", "Banner đã được cập nhật thành công!");
			response.put("banner", updatedBanner);
			return ResponseEntity.ok(response);

		} catch (IOException e) {
			logger.error("Lỗi khi lưu hình ảnh cho banner ID {}: {}", bannerId, e.getMessage());
			response.put("message", "Không thể lưu hình ảnh: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);

		} catch (Exception e) {
			logger.error("Lỗi khi cập nhật banner: {}", e.getMessage());
			response.put("message", "Có lỗi xảy ra: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

	@PostMapping("add")
	public void createBannerss(@RequestParam("bannerId") String bannerId,

			@RequestParam("hoat_dong") String hoatDong,

			@RequestParam("ngay_tao") String ngayTao,

			@RequestParam("trang_thai_xoa") String trangThaiXoa,

			@RequestParam("ngay_het_han") String ngayHetHan,

			@RequestParam("id") String accountID,

			@RequestParam("san_pham") String sanpham,

			@RequestParam(value = "hinh_anh", required = false) MultipartFile hinhFile) throws IOException {

		List<String> array = Arrays.asList(sanpham.split(","));
		System.out.println("sadsa" + bannerId);
		System.out.println("sadsa" + ngayTao);
		System.out.println("sadsa" + trangThaiXoa);
		System.out.println("sadsa" + hoatDong);
		System.out.println("sadsa" + ngayHetHan);
		System.out.println("sadsa" + accountID);
		
		System.out.println("sadsa" + array.size());
		System.out.println("sadsa" + hinhFile.getOriginalFilename());

		Users user = userrepository.findByAccountID(accountID);
		Banner banner = new Banner();
		System.out.println("sdsad11111111111" + user.getAccountID());
		if (hinhFile != null ) {
		    // Lấy tên file
		    String fileName = hinhFile.getOriginalFilename();

		    System.out.println("Sdsadsadas"+fileName);
		    System.out.println("Sdsadsadas"+fileName);
		    System.out.println("Sdsadsadas"+fileName);
		    System.out.println("cccccccccccccccccccccccccccccccccccccc");
		    banner.setHinh_anh(fileName);
		}
//		if (hinhFile != null ) {
//            String originalFileName = hinhFile.getOriginalFilename();
//
//            String imageUrl = uploadFileToGCS(hinhFile, originalFileName);
//
//            banner.setHinh_anh(imageUrl);
//        }

		

		banner.setBannerId(bannerId);
	
		banner.setHoat_dong(hoatDong);
		banner.setNgay_het_han(LocalDate.parse(ngayHetHan));
		banner.setNgay_tao(LocalDate.parse(ngayTao));
		banner.setUsers(user);
		Banner nhaCungCap2 = bannerRepository.save(banner);
		HanhDong hd = new HanhDong();
		hd.setBanner(nhaCungCap2);
		hd.setNgay_hanh_dong(LocalDate.now());
		hd.setTen_hanh_dong("Thêm");
		HanhDongReopository.save(hd);

		for (int i = 0; i < array.size(); i++) {
			BannerChiTiet bnct = new BannerChiTiet();
			Optional<DanhMuc> dm = DanhmucRepository.findById(array.get(i));
			DanhMuc dmn = dm.get();
			bnct.setDanhmuc(dmn);
			bnct.setBanner(banner);
			BannerChiTietRepository.save(bnct);
		}

		bannerRepository.save(banner);

		System.out.println("Thêm Thành Công");

	}

	@GetMapping("/generateNewBannerId")
	public ResponseEntity<String> getNewBannerId() {
		String latestBannerId = bannerRepository.findLatestBannerId(PageRequest.of(0, 1)).stream().findFirst()
				.orElse("BN000");
		String newBannerId = generateNewBannerId(latestBannerId);
		return ResponseEntity.ok(newBannerId);
	}

	private String generateNewBannerId(String latestBannerId) {
		if (latestBannerId.startsWith("BN")) {
			int numberPart = Integer.parseInt(latestBannerId.substring(2)) + 1;
			return "BN" + String.format("%03d", numberPart);
		}
		return "BN001";
	}

	@GetMapping("/bannerhanhdong")
	public List<BannerDTO> getMethodName11() {
		return HanhDongReopository.findBanner();
	}

	@GetMapping("/delete/{id}")
	public void getAllAccountID(@PathVariable("id") String id) {
		Optional<Banner> banner = bannerRepository.findById(id);
		Banner uservip = banner.get();
		HanhDong hd = new HanhDong();
		hd.setBanner(uservip);
		hd.setTen_hanh_dong("Xóa");
		HanhDongReopository.save(hd);
		bannerRepository.markAsDeleted("Đã xóa", id);
	}

	@GetMapping("/back/{id}")
	public void back(@PathVariable("id") String id) {
		Optional<Banner> banner = bannerRepository.findById(id);
		Banner uservip = banner.get();
		HanhDong hd = new HanhDong();
		hd.setBanner(uservip);
		hd.setTen_hanh_dong("Reload");
		hd.setNgay_hanh_dong(LocalDate.now());
		HanhDongReopository.save(hd);
		bannerRepository.back(id);
	}

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