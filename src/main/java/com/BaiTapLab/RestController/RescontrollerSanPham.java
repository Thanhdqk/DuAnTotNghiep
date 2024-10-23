package com.BaiTapLab.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Service.SanPhamService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RescontrollerSanPham {
	
	@Autowired
	SanPhamService SanPhamService;
	
	// tìm kiếm sản phẩm theo tuần mới nhất
	@GetMapping("FindProductThisWeek")
	public List<SanPham> FindProductThisWeek() {
		
		return SanPhamService.FindProductThisWeek();
	}
	// tìm kiếm các sản phẩm bán nhiều nhất
	@GetMapping("FindProductTopSell")
	public List<SanPham> FindProductTopSell() {
		
		return SanPhamService.FindProductTopSell();
	}
	
	// tìm kiếm các sản phẩm đc giảm giá
	@GetMapping("FindProductDiscount")
	public List<SanPham> FindProductDiscount() {
		
		return SanPhamService.FindProductDiscount();
	}
	
	// tìm kiếm sản phẩm theo id sản phẩm
	@GetMapping("Product/Detail")
	public SanPham FindProductByID(@RequestParam("id") String id) {
		
		return SanPhamService.FindProductByID(id);
	}
	
	// tìm kiếm sản phẩm có loại giống nhau theo id sản phẩm
	@GetMapping("Product/Similar")
	public List<SanPham> FindProductSimilar(@RequestParam("id") String id) {
//		List<SanPham> list = SanPhamService.FindProductSimilar(id);
		
		
		return SanPhamService.FindProductSimilar(id);
	}
	
	// tìm kiếm sản phẩm theo id danh mục
	@GetMapping("Product/FindByCategory")
	public List<SanPham> FindSanPhamByDanhMucID(@RequestParam("id") String id) {
		
		
		return SanPhamService.FindSanPhamByDanhMucID(id);
	}
	
	//tìm sản phẩm theo tên % %
	@GetMapping("Product/FindbyName")
	public List<SanPham> FindSanPhamLikeName(@RequestParam("name") String name) {
		
		return SanPhamService.FindSanPhamLikeName(name);
	}
	
	// tìm sản phẩm theo name và danh mục
	@GetMapping("Product/FindbyNameandDanhmuc")
	public List<SanPham> FindbyNameandDanhmuc(@RequestParam("name") String name,@RequestParam("id") String id) {
//		const res = await axios({ url: `http://localhost:8080/Product/FindByCategory?id=${danhmuc}&name=${TextSearch}`, method: 'GET' })
		return SanPhamService.FindSanPhamLikeNameAndCategory(name, id);
	}
	
	
	// tìm sản phẩm theo name và danh mục có giảm giá
	@GetMapping("Product/FindbyNameandDanhmucWithDiscount")
	public List<SanPham> FindbyNameandDanhmucWithDiscount(@RequestParam("name") String name,@RequestParam("id") String id) {
//		const res = await axios({ url: `http://localhost:8080/Product/FindByCategory?id=${danhmuc}&name=${TextSearch}`, method: 'GET' })
		return SanPhamService.FindSanPhamLikeNameAndCategoryWithDiscount(name, id);
	}
	// tìm sản phẩm theo name và danh mục ko có giảm giá
	@GetMapping("Product/FindbyNameandDanhmucWithoutDiscount")
	public List<SanPham> FindbyNameandDanhmucWithoutDiscount(@RequestParam("name") String name,@RequestParam("id") String id) {
//		const res = await axios({ url: `http://localhost:8080/Product/FindByCategory?id=${danhmuc}&name=${TextSearch}`, method: 'GET' })
		return SanPhamService.FindSanPhamLikeNameAndCategoryWithoutDiscount(name, id);
	}
	
	// tìm sản phẩm theo name  có giảm giá
	
	@GetMapping("Product/FindbyNameWithDiscount")
	public List<SanPham> FindbyNameWithDiscount(@RequestParam("name") String name) {
		return SanPhamService.FindSanPhamByNameWithDiscount(name);
	}
	
	
	// tìm sản phẩm theo danh mục có giảm giá
	@GetMapping("Product/FindbyDanhmucWithDiscount")
	public List<SanPham> FindbyDanhmucWithDiscount(@RequestParam("id") String id) {
		return SanPhamService.FindSanPhamByDanhmucWithDiscount(id);
	}
}
