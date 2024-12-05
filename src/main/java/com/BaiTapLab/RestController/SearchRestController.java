package com.BaiTapLab.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Repository.SearchRepository;
import com.BaiTapLab.Service.SearchService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class SearchRestController {

	@Autowired
	SearchService SearchService;

	@Autowired
	SearchRepository SearchRepository;

	public List<Map<String, Object>> MapToData(List<Object[]> results) {
		List<Map<String, Object>> sanPhamList = new ArrayList<>();

		for (Object[] row : results) {
			Map<String, Object> sanPham = new HashMap<>();
			sanPham.put("san_phamId", row[0]);
			sanPham.put("hinhanh", row[20]);
			sanPham.put("ten_san_pham", row[1]);
			sanPham.put("ngayTao", row[2]);
			sanPham.put("gia_goc", row[3]);
			sanPham.put("gia_km", row[4]);
			sanPham.put("moTa", row[5]);
			sanPham.put("phan_tram_GG", row[6]);
			sanPham.put("so_luong", row[7]);
			sanPham.put("hanGG", row[8]);
			sanPham.put("trangThaiKho", row[9]);
			sanPham.put("luotMua", row[10]);
			sanPham.put("hoatDong", row[11]);
			sanPham.put("pheDuyet", row[12]);
			sanPham.put("trangThaiXoa", row[13]);
			sanPham.put("chieuCao", row[14]);
			sanPham.put("chieuDai", row[15]);
			sanPham.put("chieuRong", row[16]);
			sanPham.put("khoiLuong", row[17]);
			sanPham.put("sosao", row[18]);
			sanPham.put("luotdanhgia", row[19]);
			sanPhamList.add(sanPham);
		}

		return sanPhamList;
	}

	// search by Danh Muc

	// KO CÓ GIẢM GIÁ

	// only danh mục

	@GetMapping("Search/findSanPhamByDanhMuc")
	public List<Map<String, Object>> findSanPhamByDanhMuc(@RequestParam("id") String id,
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchService.findSanPhamByDanhMuc(id, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDanhMucAndName")
	public List<Map<String, Object>> findSanPhamByDanhMucAndName(@RequestParam("id") String id,
			@RequestParam("name") String name, @RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchService.findSanPhamByDanhMucAndName(id, name, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDanhMucAndSosao")
	public List<Map<String, Object>> findSanPhamByDanhMucAndSosao(@RequestParam("id") String id,
			@RequestParam("rating") int rating, @RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchService.findSanPhamByDanhMucAndSosao(id, rating, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDanhMucLess10K")
	public List<Map<String, Object>> findSanPhamByDanhMucLess10K(@RequestParam("id") String id,
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDanhMucLess10K(id, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDanhMucMore100K")
	public List<Map<String, Object>> findSanPhamByDanhMucMore100K(@RequestParam("id") String id,
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDanhMucMore100K(id, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDanhMucDefault")
	public List<Map<String, Object>> findSanPhamByDanhMucDefault(@RequestParam("id") String id,
			@RequestParam("showDiscount") Boolean showDiscount, @RequestParam("Default1") Long Default1,
			@RequestParam("Default2") Long Default2) {
		List<Object[]> results = SearchRepository.findSanPhamByDanhMucDefault(id, Default1, Default2, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDanhMucNameSoSao")
	public List<Map<String, Object>> findSanPhamByDanhMucNameSoSao(@RequestParam("id") String id,
			@RequestParam("showDiscount") Boolean showDiscount, @RequestParam("name") String name,
			@RequestParam("rating") int rating) {
		List<Object[]> results = SearchRepository.findSanPhamByDanhMucNameSoSao(id, name, rating, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDanhMucNameSoSaoMore100k")
	public List<Map<String, Object>> findSanPhamByDanhMucNameSoSaoMore100k(@RequestParam("id") String id,
			@RequestParam("showDiscount") Boolean showDiscount, @RequestParam("name") String name,
			@RequestParam("rating") int rating) {
		List<Object[]> results = SearchRepository.findSanPhamByDanhMucNameSoSaoMore100k(id, name, rating, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDanhMucNameSoSaoLess10k")
	public List<Map<String, Object>> findSanPhamByDanhMucNameSoSaoLess10k(@RequestParam("id") String id,
			@RequestParam("showDiscount") Boolean showDiscount, @RequestParam("name") String name,
			@RequestParam("rating") int rating) {
		List<Object[]> results = SearchRepository.findSanPhamByDanhMucNameSoSaoLess10k(id, name, rating, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDanhMucNameSoSaoDefault")
	public List<Map<String, Object>> findSanPhamByDanhMucNameSoSaoDefault(@RequestParam("id") String id,
			@RequestParam("showDiscount") Boolean showDiscount, @RequestParam("name") String name,
			@RequestParam("rating") int rating, @RequestParam("Default1") Long Default1,
			@RequestParam("Default2") Long Default2) {
		List<Object[]> results = SearchRepository.findSanPhamByDanhMucNameSoSaoDefault(id, name, rating, Default1,
				Default2, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDanhMucNameMore100k")
	public List<Map<String, Object>> findSanPhamByDanhMucNameMore100k(@RequestParam("id") String id,
			@RequestParam("showDiscount") Boolean showDiscount, @RequestParam("name") String name) {
		List<Object[]> results = SearchRepository.findSanPhamByDanhMucNameMore100k(id, name, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDanhMucNameLess10k")
	public List<Map<String, Object>> findSanPhamByDanhMucNameLess10k(@RequestParam("id") String id,
			@RequestParam("showDiscount") Boolean showDiscount, @RequestParam("name") String name) {
		List<Object[]> results = SearchRepository.findSanPhamByDanhMucNameLess10k(id, name, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDanhMucNameDefault")
	public List<Map<String, Object>> findSanPhamByDanhMucNameDefault(@RequestParam("id") String id,
			@RequestParam("showDiscount") Boolean showDiscount, @RequestParam("name") String name,
			@RequestParam("Default1") Long Default1, @RequestParam("Default2") Long Default2) {
		List<Object[]> results = SearchRepository.findSanPhamByDanhMucNameDefault(id, name, Default1, Default2,
				showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDanhMucSoSaoMore100k")
	public List<Map<String, Object>> findSanPhamByDanhMucSoSaoMore100k(@RequestParam("id") String id,
			@RequestParam("showDiscount") Boolean showDiscount, @RequestParam("rating") int rating) {
		List<Object[]> results = SearchRepository.findSanPhamByDanhMucSoSaoMore100k(id, rating, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDanhMucSoSaoLess10k")
	public List<Map<String, Object>> findSanPhamByDanhMucSoSaoLess10k(@RequestParam("id") String id,
			@RequestParam("showDiscount") Boolean showDiscount, @RequestParam("rating") int rating) {
		List<Object[]> results = SearchRepository.findSanPhamByDanhMucSoSaoLess10k(id, rating, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDanhMucSoSaoDefault")
	public List<Map<String, Object>> findSanPhamByDanhMucSoSaoDefault(@RequestParam("id") String id,
			@RequestParam("showDiscount") Boolean showDiscount, @RequestParam("rating") int rating,
			@RequestParam("Default1") Long Default1, @RequestParam("Default2") Long Default2) {
		List<Object[]> results = SearchRepository.findSanPhamByDanhMucSoSaoDefault(id, rating, Default1, Default2,
				showDiscount);

		return MapToData(results);

	}

	// search by giảm giá
	@GetMapping("Search/findSanPhamByDiscountOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountOrNot(@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountOrNot(showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountWithNameOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountWithNameOrNot(@RequestParam("name") String name,
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountWithNameOrNot(name, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountWithDanhMucOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountWithDanhMucOrNot(@RequestParam("id") String id,
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountWithDanhMucOrNot(id, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountWithSosaoOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountWithSosaoOrNot(@RequestParam("rating") int rating,
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountWithSosaoOrNot(rating, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountMore100kOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountMore100kOrNot(
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountMore100kOrNot(showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountLess10kOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountLess10kOrNot(
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountLess10kOrNot(showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountDefaultOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountDefaultOrNot(
			@RequestParam("showDiscount") Boolean showDiscount, @RequestParam("Default1") Long Default1,
			@RequestParam("Default2") Long Default2) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountDefaultOrNot(Default1, Default2, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountDanhMucSoSaoOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountDanhMucSoSaoOrNot(@RequestParam("id") String id,
			@RequestParam("rating") int rating, @RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountDanhMucSoSaoOrNot(id, rating, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountDanhMucNameOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountDanhMucNameOrNot(@RequestParam("id") String id,
			@RequestParam("name") String name, @RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountDanhMucNameOrNot(id, name, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountDanhMucSoSaoNameOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountDanhMucSoSaoNameOrNot(@RequestParam("id") String id,
			@RequestParam("name") String name, @RequestParam("rating") int rating,
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountDanhMucSoSaoNameOrNot(id, rating, name,
				showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountSoSaoNameOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountSoSaoNameOrNot(@RequestParam("name") String name,
			@RequestParam("rating") int rating, @RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountSoSaoNameOrNot(rating, name, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountDanhMucSoSaoNameMore100KOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountDanhMucSoSaoNameMore100KOrNot(@RequestParam("id") String id,
			@RequestParam("name") String name, @RequestParam("rating") int rating,
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountDanhMucSoSaoNameMore100KOrNot(id, rating, name,
				showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountDanhMucNameMore100KOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountDanhMucNameMore100KOrNot(@RequestParam("id") String id,
			@RequestParam("name") String name, @RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountDanhMucNameMore100KOrNot(id, name, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountDanhMucSoSaoMore100kOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountDanhMucSoSaoMore100kOrNot(@RequestParam("id") String id,
			@RequestParam("rating") int rating, @RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountDanhMucSoSaoMore100kOrNot(id, rating,
				showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountSoSaoNameMore100kOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountSoSaoNameMore100kOrNot(@RequestParam("name") String name,
			@RequestParam("rating") int rating, @RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountSoSaoNameMore100kOrNot(name, rating,
				showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountDanhMucSoSaoNameLess10KOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountDanhMucSoSaoNameLess10KOrNot(@RequestParam("id") String id,
			@RequestParam("name") String name, @RequestParam("rating") int rating,
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountDanhMucSoSaoNameLess10KOrNot(id, rating, name,
				showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountDanhMucNameLess10KOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountDanhMucNameLess10KOrNot(@RequestParam("id") String id,
			@RequestParam("name") String name, @RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountDanhMucNameLess10KOrNot(id, name, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountDanhMucSoSaoLess10kOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountDanhMucSoSaoLess10kOrNot(@RequestParam("id") String id,
			@RequestParam("rating") int rating, @RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountDanhMucSoSaoLess10kOrNot(id, rating,
				showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountSoSaoNameLess10kOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountSoSaoNameLess10kOrNot(@RequestParam("name") String name,
			@RequestParam("rating") int rating, @RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountSoSaoNameLess10kOrNot(name, rating,
				showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountDanhMucSoSaoNamedefaultOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountDanhMucSoSaoNamedefaultOrNot(@RequestParam("id") String id,
			@RequestParam("name") String name, @RequestParam("showDiscount") Boolean showDiscount,
			@RequestParam("rating") int rating, @RequestParam("Default1") Long Default1,
			@RequestParam("Default2") Long Default2) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountDanhMucSoSaoNamedefaultOrNot(id, rating, name,
				showDiscount, Default1, Default2);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountDanhMucNamedefaultOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountDanhMucNamedefaultOrNot(@RequestParam("id") String id,
			@RequestParam("name") String name, @RequestParam("showDiscount") Boolean showDiscount,
			@RequestParam("Default1") Long Default1, @RequestParam("Default2") Long Default2) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountDanhMucNamedefaultOrNot(id, name, showDiscount,
				Default1, Default2);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountDanhMucSoSaodefaultOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountDanhMucSoSaodefaultOrNot(@RequestParam("id") String id,
			@RequestParam("showDiscount") Boolean showDiscount, @RequestParam("rating") int rating,
			@RequestParam("Default1") Long Default1, @RequestParam("Default2") Long Default2) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountDanhMucSoSaodefaultOrNot(id, rating,
				showDiscount, Default1, Default2);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountSoSaoNamedefaultOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountSoSaoNamedefaultOrNot(@RequestParam("name") String name,
			@RequestParam("showDiscount") Boolean showDiscount, @RequestParam("rating") int rating,
			@RequestParam("Default1") Long Default1, @RequestParam("Default2") Long Default2) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountSoSaoNamedefaultOrNot(rating, name, showDiscount,
				Default1, Default2);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountNameMore100KOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountNameMore100KOrNot(@RequestParam("name") String name,
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountNameMore100KOrNot(name, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountSoSaoMore100KOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountSoSaoMore100KOrNot(@RequestParam("rating") int rating,
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountSoSaoMore100KOrNot(rating, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountDanhMucMore100kOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountDanhMucMore100kOrNot(@RequestParam("id") String id,
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountDanhMucMore100kOrNot(id, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountNameLess10KOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountNameLess10KOrNot(@RequestParam("name") String name,
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountNameLess10KOrNot(name, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountSoSaoLess10kOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountSoSaoLess10kOrNot(@RequestParam("rating") int rating,
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountSoSaoLess10kOrNot(rating, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountDanhMucLess10kOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountDanhMucLess10kOrNot(@RequestParam("id") String id,
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountDanhMucLess10kOrNot(id, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountNamedefaultOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountNamedefaultOrNot(@RequestParam("name") String name,
			@RequestParam("showDiscount") Boolean showDiscount, @RequestParam("Default1") Long Default1,
			@RequestParam("Default2") Long Default2) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountNamedefaultOrNot(name, showDiscount, Default1,
				Default2);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountSoSaodefaultOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountSoSaodefaultOrNot(@RequestParam("rating") int rating,
			@RequestParam("showDiscount") Boolean showDiscount, @RequestParam("Default1") Long Default1,
			@RequestParam("Default2") Long Default2) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountSoSaodefaultOrNot(rating, showDiscount, Default1,
				Default2);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountDanhMucdefaultOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountDanhMucdefaultOrNot(@RequestParam("id") String id,
			@RequestParam("showDiscount") Boolean showDiscount, @RequestParam("Default1") Long Default1,
			@RequestParam("Default2") Long Default2) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountDanhMucdefaultOrNot(id, showDiscount, Default1,
				Default2);

		return MapToData(results);

	}

	// search by price > 100k

	@GetMapping("Search/FindSanphamByPriceMore100k")
	public List<Map<String, Object>> FindSanphamByPriceMore100k(@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.FindSanphamByPriceMore100k(showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/FindSanphamByPriceNameMore100k2")
	public List<Map<String, Object>> FindSanphamByPriceNameMore100k(@RequestParam("name") String name,
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.FindSanphamByPriceNameMore100k2(name, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/FindSanphamByPriceDanhmucMore100k")
	public List<Map<String, Object>> FindSanphamByPriceDanhmucMore100k(@RequestParam("id") String id,
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.FindSanphamByPriceDanhmucMore100k(id, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/FindSanphamByPriceSosaoMore100k")
	public List<Map<String, Object>> FindSanphamByPriceSosaoMore100k(@RequestParam("rating") int rating,
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.FindSanphamByPriceSosaoMore100k(rating, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/FindSanphamByPriceNameDanhMucSosaoMore100k")
	public List<Map<String, Object>> FindSanphamByPriceNameDanhMucSosaoMore100k(@RequestParam("id") String id,
			@RequestParam("name") String name, @RequestParam("rating") int rating,
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.FindSanphamByPriceNameDanhMucSosaoMore100k(id, name, rating,
				showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/FindSanphamByPriceNameMore100k")
	public List<Map<String, Object>> FindSanphamByPriceNameMore100k(@RequestParam("id") String id,
			@RequestParam("name") String name, @RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.FindSanphamByPriceNameMore100k(id, name, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/FindSanphamByPriceNameSosaoMore100k")
	public List<Map<String, Object>> FindSanphamByPriceNameSosaoMore100k(@RequestParam("name") String name,
			@RequestParam("rating") int rating, @RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.FindSanphamByPriceNameSosaoMore100k(name, rating, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/FindSanphamByPriceDanhMucSosaoMore100k")
	public List<Map<String, Object>> FindSanphamByPriceDanhMucSosaoMore100k(@RequestParam("id") String id,
			@RequestParam("rating") int rating, @RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.FindSanphamByPriceDanhMucSosaoMore100k(id, rating, showDiscount);

		return MapToData(results);

	}

	// search by price < 10k
	@GetMapping("Search/FindSanphamByPriceLess10k")
	public List<Map<String, Object>> FindSanphamByPriceLess10k(@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.FindSanphamByPriceLess10k(showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/FindSanphamByPriceNameLess10k")
	public List<Map<String, Object>> FindSanphamByPriceNameLess10k(@RequestParam("name") String name,
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.FindSanphamByPriceNameLess10k(name, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/FindSanphamByPriceDanhmucLess10k")
	public List<Map<String, Object>> FindSanphamByPriceDanhmucLess10k(@RequestParam("id") String id,
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.FindSanphamByPriceDanhmucLess10k(id, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/FindSanphamByPriceSosaoLess10k")
	public List<Map<String, Object>> FindSanphamByPriceSosaoLess10k(@RequestParam("rating") int rating,
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.FindSanphamByPriceSosaoLess10k(rating, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/FindSanphamByPriceNameDanhMucSosaoLess10k")
	public List<Map<String, Object>> FindSanphamByPriceNameDanhMucSosaoLess10k(@RequestParam("id") String id,
			@RequestParam("name") String name, @RequestParam("rating") int rating,
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.FindSanphamByPriceNameDanhMucSosaoLess10k(id, name, rating,
				showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/FindSanphamByPriceNameLESS10k")
	public List<Map<String, Object>> FindSanphamByPriceNameLESS10k(@RequestParam("id") String id,
			@RequestParam("name") String name, @RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.FindSanphamByPriceNameLESS10k(id, name, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/FindSanphamByPriceNameSosaoLESS10k")
	public List<Map<String, Object>> FindSanphamByPriceNameSosaoLESS10k(@RequestParam("name") String name,
			@RequestParam("rating") int rating, @RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.FindSanphamByPriceNameSosaoLESS10k(name, rating, showDiscount);

		return MapToData(results);

	}

	@GetMapping("Search/FindSanphamByPriceDanhMucSosaoLESS10k")
	public List<Map<String, Object>> FindSanphamByPriceDanhMucSosaoLESS10k(@RequestParam("id") String id,
			@RequestParam("rating") int rating, @RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.FindSanphamByPriceDanhMucSosaoLESS10k(id, rating, showDiscount);

		return MapToData(results);

	}

	// search by default

	@GetMapping("Search/findSanPhamByDiscountdefaultOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountdefaultOrNot(
			@RequestParam("showDiscount") Boolean showDiscount, @RequestParam("Default1") Long Default1,
			@RequestParam("Default2") Long Default2) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountdefaultOrNot(showDiscount, Default1, Default2);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountNameDefaultOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountNameDefaultOrNot(@RequestParam("name") String name,
			@RequestParam("showDiscount") Boolean showDiscount, @RequestParam("Default1") Long Default1,
			@RequestParam("Default2") Long Default2) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountNameDefaultOrNot(name, showDiscount, Default1,
				Default2);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountDanhmucDefaultOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountDanhmucDefaultOrNot(@RequestParam("id") String id,
			@RequestParam("showDiscount") Boolean showDiscount, @RequestParam("Default1") Long Default1,
			@RequestParam("Default2") Long Default2) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountDanhmucDefaultOrNot(id, showDiscount, Default1,
				Default2);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountSosaoDefaultOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountSosaoDefaultOrNot(@RequestParam("rating") int rating,
			@RequestParam("showDiscount") Boolean showDiscount, @RequestParam("Default1") Long Default1,
			@RequestParam("Default2") Long Default2) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountSosaoDefaultOrNot(rating, showDiscount, Default1,
				Default2);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountSosaoNameDanhMucDefaultOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountSosaoNameDanhMucDefaultOrNot(@RequestParam("id") String id,
			@RequestParam("name") String name, @RequestParam("rating") int rating,
			@RequestParam("showDiscount") Boolean showDiscount, @RequestParam("Default1") Long Default1,
			@RequestParam("Default2") Long Default2) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountSosaoNameDanhMucDefaultOrNot(id, name, rating,
				showDiscount, Default1, Default2);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountNameDanhMucDefaultOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountNameDanhMucDefaultOrNot(@RequestParam("id") String id,
			@RequestParam("name") String name,

			@RequestParam("showDiscount") Boolean showDiscount, @RequestParam("Default1") Long Default1,
			@RequestParam("Default2") Long Default2) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountNameDanhMucDefaultOrNot(id, name, showDiscount,
				Default1, Default2);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountSosaoDanhMucDefaultOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountSosaoDanhMucDefaultOrNot(@RequestParam("id") String id,

			@RequestParam("rating") int rating, @RequestParam("showDiscount") Boolean showDiscount,
			@RequestParam("Default1") Long Default1, @RequestParam("Default2") Long Default2) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountSosaoDanhMucDefaultOrNot(id, rating,
				showDiscount, Default1, Default2);

		return MapToData(results);

	}

	@GetMapping("Search/findSanPhamByDiscountSosaoNameDefaultOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountSosaoNameDefaultOrNot(

			@RequestParam("name") String name, @RequestParam("rating") int rating,
			@RequestParam("showDiscount") Boolean showDiscount, @RequestParam("Default1") Long Default1,
			@RequestParam("Default2") Long Default2) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountSosaoNameDefaultOrNot(name, rating, showDiscount,
				Default1, Default2);

		return MapToData(results);

	}

	// số sao name
	@GetMapping("Search/findSanPhamByDiscountSosaoNameOrNot")
	public List<Map<String, Object>> findSanPhamByDiscountSosaoNameOrNot(

			@RequestParam("name") String name, @RequestParam("rating") int rating,
			@RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.findSanPhamByDiscountSosaoNameOrNot(name, rating, showDiscount);

		return MapToData(results);

	}

	// số sao

	@GetMapping("Search/FindSanPhamBySoSaoHaveDiscount")
	public List<Map<String, Object>> FindSanPhamBySoSaoHaveDiscount(

			@RequestParam("rating") int rating, @RequestParam("showDiscount") Boolean showDiscount) {
		List<Object[]> results = SearchRepository.FindSanPhamBySoSaoHaveDiscount(rating, showDiscount);

		return MapToData(results);

	}

}
