package com.BaiTapLab.RestController;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.HinhAnh;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Repository.HinhAnhRepository;
import com.BaiTapLab.Repository.SanphamRepository;
import com.BaiTapLab.Service.HinhAnhService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class HinhAnhRescontroller {

	@Autowired
	HinhAnhService HinhAnhService;

	@Autowired
	HinhAnhRepository hinhAnhRepository;

	@Autowired
	SanphamRepository sanPhamRepository;

	@GetMapping("HinhAnh/FindALL")
	public List<Map<String, Object>> getMethodName() {
		List<Map<String, Object>> result = HinhAnhService.getAllSanPhamWithFourImages();
		return result;
	}

	@PostMapping("HinhAnh/ADDhinhanh")
	public void postMethodName() {

	}

	@PutMapping("update/images")
	public ResponseEntity<?> updateHinhAnhSanPham(@RequestParam("name") String name,
			@RequestParam("imagemain") String imagemain, @RequestParam("imagephu1") String imagephu1,
			@RequestParam("imagephu2") String imagephu2, @RequestParam("imagephu3") String imagephu3,
	@RequestParam("imagemainold") String imagemainold, @RequestParam("imagephu1old") String imagephu1old,
	@RequestParam("imagephu2old") String imagephu2old, @RequestParam("imagephu3old") String imagephu3old
	
	){

		System.out.println("" + name);
		System.out.println("" + imagemain);
		System.out.println("" + imagephu1);
		System.out.println("" + imagephu2);
		System.out.println("" + imagephu3);
		System.out.println("" + name);
		System.out.println("" + imagemainold);
		System.out.println("" + imagephu1old);
		System.out.println("" + imagephu2old);
		System.out.println("" + imagephu3old);

		SanPham sanpham = sanPhamRepository.findONESanPhamByTenSanPham(name);

		String id = sanpham.getSan_phamId();

		if (sanpham.getHinhanh().size() >= 0) {

			List<HinhAnh> hanh = hinhAnhRepository.findBySanphamAndTenHinh(id, imagemainold);
			System.out.println("ssdasdsadadsadsadasdas"+hanh.size());
			if(hanh.size()==0)
			{
				System.out.println("nullllllllllllllllllllllllllllllll");
				HinhAnh haphu1 = new HinhAnh();
				haphu1.setSanpham(sanpham);
				haphu1.setTen_hinh(imagemain);
				hinhAnhRepository.save(haphu1);
				System.out.println("hết nullllllllllllllllllllllllllllllll");
			}
			else {
				if(hanh.get(0) != null)
				{
					HinhAnh hamain = hanh.get(0);
					hamain.setTen_hinh(imagemain);
					hinhAnhRepository.save(hamain);
					
					System.out.println("successss");
				}
			}
			
			
			

		}
			if (sanpham.getHinhanh().size() >= 1) {
	       	 	List<HinhAnh> hanh = hinhAnhRepository.findBySanphamAndTenHinh(id, imagephu1old);
	       	 System.out.println("ssdasdsadadsadsadasdas"+hanh.size());
	       	if(hanh.size()==0)
			{
	       		System.out.println("nullllllllllllllllllllllllllllllll");
				HinhAnh haphu1 = new HinhAnh();
				haphu1.setSanpham(sanpham);
				haphu1.setTen_hinh(imagephu1);
				hinhAnhRepository.save(haphu1);
				System.out.println("hết nullllllllllllllllllllllllllllllll");
			}
	       	else {
	       		if(hanh.size()>=2)
	       	 	{
	       	 	HinhAnh haphu1 = hanh.get(1);
	       	 	haphu1.setTen_hinh(imagephu1);
	       	 	hinhAnhRepository.save(haphu1);
	       	 	}
	       	 	else {
	       	 	HinhAnh haphu1 = hanh.get(0);
	       	 	haphu1.setTen_hinh(imagephu2);
	       	 	hinhAnhRepository.save(haphu1);
	       	 	}
	       	}
	       	 	
	       	 
			}
			if (sanpham.getHinhanh().size() >= 2) {
				List<HinhAnh> hanh = hinhAnhRepository.findBySanphamAndTenHinh(id, imagephu2old);
				 System.out.println("ssdasdsadadsadsadasdas"+hanh.size());
					if(hanh.size()==0)
					{
						System.out.println("nullllllllllllllllllllllllllllllll");
						HinhAnh haphu1 = new HinhAnh();
						haphu1.setSanpham(sanpham);
						haphu1.setTen_hinh(imagephu3);
						hinhAnhRepository.save(haphu1);
						System.out.println("hết nullllllllllllllllllllllllllllllll");
					}
					else {
						if(hanh.size()>=2)
			       	 	{
			       	 	HinhAnh haphu1 = hanh.get(1);
			       	 	haphu1.setTen_hinh(imagephu2);
			       	 	hinhAnhRepository.save(haphu1);
			       	 	}
			       	 	else {
			       	 	HinhAnh haphu1 = hanh.get(0);
			       	 	haphu1.setTen_hinh(imagephu2);
			       	 	hinhAnhRepository.save(haphu1);
			       	 	}
					}
		       	 	
			}
			if (sanpham.getHinhanh().size() >= 3) {
				List<HinhAnh> hanh = hinhAnhRepository.findBySanphamAndTenHinh(id, imagephu3old);
				 System.out.println("ssdasdsadadsadsadasdas"+hanh.size());
				 if(hanh.size()==0)
					{
						System.out.println("nullllllllllllllllllllllllllllllll");
						HinhAnh haphu1 = new HinhAnh();
						haphu1.setSanpham(sanpham);
						haphu1.setTen_hinh(imagephu3);
						hinhAnhRepository.save(haphu1);
						System.out.println("hết nullllllllllllllllllllllllllllllll");
						
					}
				 else {
					 if(hanh.size()>=2)
			       	 	{
			       	 	HinhAnh haphu1 = hanh.get(1);
			       	 	haphu1.setTen_hinh(imagephu3);
			       	 	hinhAnhRepository.save(haphu1);
			       	 	}
			       	 	else {
			       	 	HinhAnh haphu1 = hanh.get(0);
			       	 	haphu1.setTen_hinh(imagephu3);
			       	 	hinhAnhRepository.save(haphu1);
			       	 	}
				 }
		       	 	

				
			}

		
	return ResponseEntity.ok("Hình ảnh sản phẩm đã được cập nhật!");

}

}
