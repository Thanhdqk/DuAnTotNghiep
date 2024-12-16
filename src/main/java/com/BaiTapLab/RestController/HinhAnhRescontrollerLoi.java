package com.BaiTapLab.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.BaiTapLab.DTO.HinhAnhHanhDongDTO;
import com.BaiTapLab.Entity.HanhDong;
import com.BaiTapLab.Entity.HinhAnh;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Repository.HanhDongRepository;
import com.BaiTapLab.Repository.HinhAnhRepository;
import com.BaiTapLab.Repository.SanPhamRepository;
import com.BaiTapLab.Service.HinhAnhService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class HinhAnhRescontrollerLoi {

	@Autowired
	HinhAnhService HinhAnhService;

	@Autowired
	HinhAnhRepository hinhAnhRepository;

	@Autowired
	SanPhamRepository sanPhamRepository;

	@Autowired
	HanhDongRepository HanhDongRepository;

	@GetMapping("HinhAnh/FindALL")
	public List<Map<String, Object>> getMethodName() {
		List<Map<String, Object>> result = HinhAnhService.getAllSanPhamWithFourImages();
		return result;
	}

	@PostMapping("HinhAnh/ADDhinhanh")
	public void postMethodName() {

	}

	@GetMapping("findbyname")
	public List<Map<String, Object>> getMethodName(@RequestParam String name) {
		SanPham sanpham = sanPhamRepository.findONESanPhamByTenSanPham(name);
		List<Map<String, Object>> result = HinhAnhService.getAllSanPhamWithFourImagesID(sanpham.getSan_phamId());
		return result;
	}

	@PutMapping("update/images")
	public ResponseEntity<?> updateHinhAnhSanPham(@RequestParam("name") String name,
			@RequestParam("imagemain") String imagemain, @RequestParam("imagephu1") String imagephu1,
			@RequestParam("imagephu2") String imagephu2, @RequestParam("imagemainold") String imagemainold,
			@RequestParam("imagephu1old") String imagephu1old, @RequestParam("imagephu2old") String imagephu2old

	) {

		System.out.println("" + name);
		System.out.println("" + imagemain);
		System.out.println("" + imagephu1);
		System.out.println("" + imagephu2);

		System.out.println("" + name);
		System.out.println("" + imagemainold);
		System.out.println("" + imagephu1old);
		System.out.println("" + imagephu2old);

		SanPham sanpham = sanPhamRepository.findONESanPhamByTenSanPham(name);

		String id = sanpham.getSan_phamId();

		if (sanpham.getHinhanh().size() >= 0) {

			List<HinhAnh> hanh = hinhAnhRepository.findBySanphamAndTenHinh(id, imagemainold);
			System.out.println("size" + hanh.size());
			if (hanh.size() == 0) {

				HinhAnh haphu1 = new HinhAnh();
				haphu1.setSanpham(sanpham);
				haphu1.setTen_hinh(imagemain);
				hinhAnhRepository.save(haphu1);

				HanhDong hd = new HanhDong();
				hd.setHinhanh(haphu1);
				hd.setTen_hanh_dong("Thêm");
				hd.setNgay_hanh_dong(LocalDate.now());
				HanhDongRepository.save(hd);
			} else {
				if (hanh.get(0) != null) {
					HinhAnh hamain = hanh.get(0);
					hamain.setTen_hinh(imagemain);
					hinhAnhRepository.save(hamain);

					if (!hamain.getTen_hinh().equals(imagemainold)) {
						HanhDong hd = new HanhDong();
						hd.setHinhanh(hamain);
						hd.setTen_hanh_dong("Cập nhật ảnh chính của " + sanpham.getTen_san_pham());
						hd.setNgay_hanh_dong(LocalDate.now());
						HanhDongRepository.save(hd);
						HanhDongRepository.save(hd);
					}

				}
			}

		}
		if (sanpham.getHinhanh().size() >= 1) {
			List<HinhAnh> hanh = hinhAnhRepository.findBySanphamAndTenHinh(id, imagephu1old);
			System.out.println("size" + hanh.size());
			if (hanh.size() == 0) {

				HinhAnh haphu1 = new HinhAnh();
				haphu1.setSanpham(sanpham);
				haphu1.setTen_hinh(imagephu1);
				hinhAnhRepository.save(haphu1);

				HanhDong hd = new HanhDong();
				hd.setHinhanh(haphu1);
				hd.setTen_hanh_dong("Thêm");
				hd.setNgay_hanh_dong(LocalDate.now());
				HanhDongRepository.save(hd);
			} else {
				HinhAnh haphu1 = hanh.get(0);

				haphu1.setTen_hinh(imagephu1);
				hinhAnhRepository.save(haphu1);

				if (!haphu1.getTen_hinh().equals(imagephu1old)) {
					HanhDong hd = new HanhDong();
					hd.setHinhanh(haphu1);
					hd.setTen_hanh_dong("Update ảnh phụ 1 của " + sanpham.getTen_san_pham());
					hd.setNgay_hanh_dong(LocalDate.now());
					HanhDongRepository.save(hd);
				}

			}

		}
		if (sanpham.getHinhanh().size() >= 2) {
			List<HinhAnh> hanh = hinhAnhRepository.findBySanphamAndTenHinh(id, imagephu2old);
			System.out.println("size" + hanh.size());
			if (hanh.size() == 0) {
				System.out.println("nullllllllllllllllllllllllllllllll");
				HinhAnh haphu1 = new HinhAnh();
				haphu1.setSanpham(sanpham);
				haphu1.setTen_hinh(imagephu2);
				hinhAnhRepository.save(haphu1);
				System.out.println("hết nullllllllllllllllllllllllllllllll");
				HanhDong hd = new HanhDong();
				hd.setHinhanh(haphu1);
				hd.setTen_hanh_dong("Thêm");
				hd.setNgay_hanh_dong(LocalDate.now());
				HanhDongRepository.save(hd);
			} else {

				HinhAnh haphu1 = hanh.get(0);
				haphu1.setTen_hinh(imagephu2);
				hinhAnhRepository.save(haphu1);

				if (!haphu1.getTen_hinh().equals(imagephu2old)) {
					HanhDong hd = new HanhDong();
					hd.setHinhanh(haphu1);
					hd.setTen_hanh_dong("Update ảnh phụ của " + sanpham.getTen_san_pham());
					hd.setNgay_hanh_dong(LocalDate.now());
					HanhDongRepository.save(hd);
				}

			}

		}

		return ResponseEntity.ok("Hình ảnh sản phẩm đã được cập nhật!");

	}

	@PostMapping("update/images")
	public ResponseEntity<?> ADDHinhAnhSanPham(@RequestParam("name") String name,
			@RequestParam("imagemain") String imagemain, @RequestParam("imagephu1") String imagephu1,
			@RequestParam("imagephu2") String imagephu2, @RequestParam("imagemainold") String imagemainold,
			@RequestParam("imagephu1old") String imagephu1old, @RequestParam("imagephu2old") String imagephu2old

	) {

		System.out.println("s1 :" + name);
		System.out.println("s1" + imagemain);
		System.out.println("s1" + imagephu1);
		System.out.println("s1" + imagephu2);

		System.out.println("s1" + name);
		System.out.println("s1" + imagemainold);
		System.out.println("s1" + imagephu1old);
		System.out.println("s1" + imagephu2old);

		SanPham sanpham = sanPhamRepository.findONESanPhamByTenSanPham(name);

		String id = sanpham.getSan_phamId();

		if (imagemain != null && !imagemain.isEmpty()) {
			System.out.println("running ");
			HinhAnh ha = new HinhAnh();
			List<HinhAnh> hanh = hinhAnhRepository.findBySanphamAndTenHinh(id, imagemain);

			ha.setSanpham(sanpham);
			ha.setTen_hinh(imagemain);
			hinhAnhRepository.save(ha);
			HanhDong hd = new HanhDong();
			hd.setHinhanh(ha);
			hd.setTen_hanh_dong("Thêm ảnh chính của " + sanpham.getTen_san_pham());
			hd.setNgay_hanh_dong(LocalDate.now());
			HanhDongRepository.save(hd);
		}
		if (imagephu1 != null && !imagephu1.isEmpty()) {
			System.out.println("running 1");
			HinhAnh ha = new HinhAnh();
			List<HinhAnh> hanh = hinhAnhRepository.findBySanphamAndTenHinh(id, imagephu1);

			ha.setSanpham(sanpham);
			ha.setTen_hinh(imagephu1);
			hinhAnhRepository.save(ha);
			HanhDong hd = new HanhDong();
			hd.setHinhanh(ha);
			hd.setTen_hanh_dong("Thêm ảnh phụ 1 của " + sanpham.getTen_san_pham());
			hd.setNgay_hanh_dong(LocalDate.now());
			HanhDongRepository.save(hd);
		}
		if (imagephu2 != null && !imagephu2.isEmpty()) {
			System.out.println("running 2");
			HinhAnh ha = new HinhAnh();
			List<HinhAnh> hanh = hinhAnhRepository.findBySanphamAndTenHinh(id, imagephu2);

			ha.setSanpham(sanpham);
			ha.setTen_hinh(imagephu2);
			hinhAnhRepository.save(ha);
			HanhDong hd = new HanhDong();
			hd.setHinhanh(ha);
			hd.setTen_hanh_dong("Thêm ảnh phụ 2 của " + sanpham.getTen_san_pham());
			hd.setNgay_hanh_dong(LocalDate.now());
			HanhDongRepository.save(hd);
		}

		return ResponseEntity.ok("Hình ảnh sản phẩm đã được cập nhật!");

	}

//	 @GetMapping("HinhAnh/HANHDONG")
//	    public ResponseEntity<List<HinhAnhHanhDongDTO>> getAllSanPhamWithImagesAndActions() {
//	        List<HinhAnhHanhDongDTO> sanPhamList = hinhAnhRepository.findHinhAnhWithDetails();
//	        return ResponseEntity.ok(sanPhamList);
//	    }

	@GetMapping("HinhAnh/HANHDONG")
	public ResponseEntity<List<HinhAnhHanhDongDTO>> getSanPhamWithImagesAndActions() {
		List<HinhAnhHanhDongDTO> dtos = HinhAnhService.getSanPhamWithImagesAndActions();
		return ResponseEntity.ok(dtos);
	}

	@GetMapping("HinhAnh/HANHDONG2")
	public List<Map<String, Object>> getSanPhamWithImagesAndActions2() {

		return HinhAnhService.getAllSanPhamWithFourImagesAction();
	}

	////////////////////////////
	// update 3 ảnh
	@PutMapping("update/images3ANH")
	public ResponseEntity<?> updateHinhAnhSanPham3ANH(@RequestParam("name") String name,
			@RequestParam("imagemain") MultipartFile imagemain, @RequestParam("imagephu1") MultipartFile imagephu1,
			@RequestParam("imagephu2") MultipartFile imagephu2, @RequestParam("imagemainold") String imagemainold,
			@RequestParam("imagephu1old") String imagephu1old, @RequestParam("imagephu2old") String imagephu2old

	) {

		
		
		
		System.out.println("" + name);

		System.out.println("" + name);
		System.out.println("" + imagemainold);
		System.out.println("" + imagephu1old);
		System.out.println("" + imagephu2old);

		String TenANHMAIN = imagemain.getOriginalFilename();
		String TenanhPhu1 = imagephu1.getOriginalFilename();
		String TenanhPhu2 = imagephu2.getOriginalFilename();

		System.out.println("" + TenANHMAIN);
		System.out.println("kích thước : " + imagemain.getSize());
		System.out.println("" + TenanhPhu1);
		System.out.println("" + TenanhPhu2);

		SanPham sanpham = sanPhamRepository.findONESanPhamByTenSanPham(name);

		String id = sanpham.getSan_phamId();
		
		HinhAnh hanhmain = hinhAnhRepository.findBySanphamAndTenHinhNEW(id, imagemainold);
		HinhAnh hanh1 = hinhAnhRepository.findBySanphamAndTenHinhNEW(id, imagephu1old);
		HinhAnh hanh2 = hinhAnhRepository.findBySanphamAndTenHinhNEW(id, imagephu2old);
		
		String main = hanhmain.getTen_hinh();
		String anh1 = hanh1.getTen_hinh();
		String anh2 = hanh2.getTen_hinh();
		
		hanhmain.setTen_hinh(TenANHMAIN);
		hanh1.setTen_hinh(TenanhPhu1);
		hanh2.setTen_hinh(TenanhPhu2);
		
		hanhmain.setSanpham(sanpham);
		hanh1.setSanpham(sanpham);
		hanh2.setSanpham(sanpham);
		
		hinhAnhRepository.save(hanhmain);
		hinhAnhRepository.save(hanh1);
		hinhAnhRepository.save(hanh2);
		
		
		if(TenANHMAIN != main )
		{
			HanhDong hd = new HanhDong();
			hd.setHinhanh(hanhmain);
			hd.setTen_hanh_dong("Cập nhật");
			hd.setNgay_hanh_dong(LocalDate.now());
			HanhDongRepository.save(hd);
			
		}
		if(TenanhPhu1 != anh1)
		{
			HanhDong hd = new HanhDong();
			hd.setHinhanh(hanh1);
			hd.setTen_hanh_dong("Cập nhật  " );
			hd.setNgay_hanh_dong(LocalDate.now());
			HanhDongRepository.save(hd);
			
		}
		
		if(TenanhPhu1 != anh2)
		{
			HanhDong hd = new HanhDong();
			hd.setHinhanh(hanh2);
			hd.setTen_hanh_dong("Cập nhật  " );
			hd.setNgay_hanh_dong(LocalDate.now());
			HanhDongRepository.save(hd);
			
		}
		
		

		

		return ResponseEntity.ok("Hình ảnh sản phẩm đã được cập nhật!");

	}

	// update 2 ảnh mainand1
	@PutMapping("update/imagesmainand1")
	public ResponseEntity<?> updateHinhAnhSanPhammainand1(@RequestParam("name") String name,
			@RequestParam("imagemain") MultipartFile imagemain, @RequestParam("imagephu1") MultipartFile imagephu1,
			@RequestParam("imagemainold") String imagemainold, @RequestParam("imagephu1old") String imagephu1old

	) {

		System.out.println("" + name);

		System.out.println("" + name);
		System.out.println("" + imagemainold);
		System.out.println("" + imagephu1old);
		

		String TenANHMAIN = imagemain.getOriginalFilename();
		String TenanhPhu1 = imagephu1.getOriginalFilename();
		
		System.out.println("" + TenANHMAIN);
		System.out.println("kích thước : " + imagemain.getSize());
		System.out.println("" + TenanhPhu1);
	

		SanPham sanpham = sanPhamRepository.findONESanPhamByTenSanPham(name);

		String id = sanpham.getSan_phamId();

		HinhAnh hanhmain = hinhAnhRepository.findBySanphamAndTenHinhNEW(id, imagemainold);
		HinhAnh hanh1 = hinhAnhRepository.findBySanphamAndTenHinhNEW(id, imagephu1old);
		String main = hanhmain.getTen_hinh();
		String anh1 = hanh1.getTen_hinh();
		
		hanhmain.setTen_hinh(TenANHMAIN);
		hanh1.setTen_hinh(TenanhPhu1);
		
		
		hanhmain.setSanpham(sanpham);
		hanh1.setSanpham(sanpham);
	
		
		hinhAnhRepository.save(hanhmain);
		hinhAnhRepository.save(hanh1);
		
		if(TenANHMAIN != main )
		{
			HanhDong hd = new HanhDong();
			hd.setHinhanh(hanhmain);
			hd.setTen_hanh_dong("Cập nhật");
			hd.setNgay_hanh_dong(LocalDate.now());
			HanhDongRepository.save(hd);
			
		}
		if(TenanhPhu1 != anh1)
		{
			HanhDong hd = new HanhDong();
			hd.setHinhanh(hanh1);
			hd.setTen_hanh_dong("Cập nhật  " );
			hd.setNgay_hanh_dong(LocalDate.now());
			HanhDongRepository.save(hd);
			
		}
		

		return ResponseEntity.ok("Hình ảnh sản phẩm đã được cập nhật!");

	}

	
	// update 2 ảnh mainand1
		@PutMapping("update/imagesmain1anh")
		public ResponseEntity<?> updateHinhAnhSanPham1anh(@RequestParam("name") String name,
				@RequestParam("imagemain") MultipartFile imagemain,
				@RequestParam("imagemainold") String imagemainold

		) {

			System.out.println("" + name);

			System.out.println("" + name);
			System.out.println("" + imagemainold);
		
			

			String TenANHMAIN = imagemain.getOriginalFilename();
			
			
			System.out.println("" + TenANHMAIN);
			System.out.println("kích thước : " + imagemain.getSize());
		
		

			SanPham sanpham = sanPhamRepository.findONESanPhamByTenSanPham(name);

			String id = sanpham.getSan_phamId();

			if (sanpham.getHinhanh().size() >= 0) {

				List<HinhAnh> hanh = hinhAnhRepository.findBySanphamAndTenHinh(id, imagemainold);
				System.out.println("size" + hanh.size());
			
					if (hanh.get(0) != null) {
						HinhAnh hamain = hanh.get(0);
						hamain.setTen_hinh(TenANHMAIN);
						hinhAnhRepository.save(hamain);

						if (!hamain.getTen_hinh().equals(imagemainold)) {
							HanhDong hd = new HanhDong();
							hd.setHinhanh(hamain);
							hd.setTen_hanh_dong("Cập nhật ảnh chính của " + sanpham.getTen_san_pham());
							hd.setNgay_hanh_dong(LocalDate.now());
							HanhDongRepository.save(hd);
							HanhDongRepository.save(hd);
						}

					}
				

			}
			
			
			

			return ResponseEntity.ok("Hình ảnh sản phẩm đã được cập nhật!");

		}
		
		
		@GetMapping("FindNameSP")
		public List<String> getMethodNameSanPham() {
			return sanPhamRepository.findallName();
		}
}
