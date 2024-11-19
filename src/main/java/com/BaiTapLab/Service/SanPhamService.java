package com.BaiTapLab.Service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.DanhMuc;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Repository.DanhmucRepository;
import com.BaiTapLab.Repository.SanphamRepository;

@Service
public class SanPhamService {
	@Autowired
	DanhmucRepository DanhmucRepository;
	@Autowired
	SanphamRepository SanphamRepository;

	public List<SanPham> FindProductThisWeek() {
		LocalDate sevenDaysAgo = LocalDate.now().minusDays(9);

		return SanphamRepository.findSanPhamLast7Days(sevenDaysAgo);
	}

	public List<SanPham> FindProductThisWeekTOP10(Pageable pageable) {
		LocalDate sevenDaysAgo = LocalDate.now().minusDays(9);

		return SanphamRepository.findSanPhamLast7DaysTOP10(sevenDaysAgo, pageable);
	}

	public List<SanPham> FindProductTopSell(Pageable pageable) {
		return SanphamRepository.findTop10ByLuotMua(pageable);
	}

	public List<SanPham> FindProductDiscount() {
		return SanphamRepository.findSanPhamphantramGG();
	}

	public List<String> FindProductSuggest(String name,Pageable page) {
		return SanphamRepository.findSanPhamSuggestByRegex(name,page);
	}

	public List<SanPham> FindProductDiscountTOP10(Pageable pageable) {
		return SanphamRepository.findSanPhamphantramGGTOP10(pageable);
	}

	public SanPham FindProductByID(String id) {
		return SanphamRepository.findSanPhamById(id);
	}

	public List<SanPham> FindProductSimilar(String SanPhamID) {
		DanhMuc ID_Danhmuc = DanhmucRepository.findDanhMucBySanPhamId(SanPhamID);

		return SanphamRepository.findSanPhamSimilar(ID_Danhmuc.getDanh_mucId());
	}

	public List<SanPham> FindSanPhamByDanhMucID(String id) {
		return SanphamRepository.findSanPhamByDanhmucId(id);
	}

	public List<SanPham> FindSanPhamLikeName(String name) {
		return SanphamRepository.findSanPhamByTenSanPham(name);
	}

	public List<SanPham> FindSanPhamLikeNameAndCategory(String name, String id) {
		return SanphamRepository.findSanPhanByTenAndDanhMuc(name, id);
	}

	public List<SanPham> FindSanPhamLikeNameAndCategoryWithDiscount(String name, String id) {
		return SanphamRepository.findSanPhamByTenAndDandMucAndGG(name, id);
	}

	public List<SanPham> FindSanPhamLikeNameAndCategoryWithoutDiscount(String name, String id) {
		return SanphamRepository.findSanPhamByTenAndDandMucAndWithOutGG(name, id);
	}

	public List<SanPham> FindSanPhamByNameWithDiscount(String name) {
		return SanphamRepository.findSanPhamByTenAndGG(name);
	}

	// today
	public List<SanPham> FindSanPhamByNameWithoutDiscount(String name) {
		return SanphamRepository.findSanPhamByTenWithOutGG(name);
	}

	public List<SanPham> FindSanPhamByDanhmucWithDiscount(String id) {
		return SanphamRepository.findSanPhamByDandMucAndGG(id);
	}

	// today
	public List<SanPham> FindSanPhamByDanhmucWithoutDiscount(String id) {
		return SanphamRepository.findSanPhamByDandMucAndWithOutGG(id);
	}

	public List<SanPham> FindSanPhamBySoSao(int sosao) {
		return SanphamRepository.findSanPhamBySoSao(sosao);
	}

	public List<SanPham> findSanPhamByTotalSoSaoEquals5() {
		return SanphamRepository.findSanPhamByTotalSoSaoEquals5();
	}

	// start tìm sản phẩm theo giá

	public List<SanPham> FindSanPhamByGiaDefault(Long Default1, Long Default2) {
		return SanphamRepository.findSanPhamByPriceDefault(Default1, Default2);
	}

	public List<SanPham> findSanPhamByPriceDefaultAndDanhMuc(Long Default1, Long Default2, String danhmuc) {
		return SanphamRepository.findSanPhamByPriceDefaultAndDanhMuc(Default1, Default2, danhmuc);
	}

	public List<SanPham> findSanPhamByPriceDefaultAndText(Long Default1, Long Default2, String text) {
		return SanphamRepository.findSanPhamByPriceDefaultAndText(Default1, Default2, text);
	}

	public List<SanPham> findSanPhamByPriceDefaultAndDiscount(Long Default1, Long Default2) {
		return SanphamRepository.findSanPhamByPriceDefaultAndDiscount(Default1, Default2);
	}

	public List<SanPham> findSanPhamByPriceDefaultAndSosao(Long Default1, Long Default2, int sosao) {
		return SanphamRepository.findSanPhamByPriceDefaultAndSosao(Default1, Default2, sosao);
	}

	public List<SanPham> findSanPhamByPriceDefaultAndDanhMucAndText(Long Default1, Long Default2, String danhmuc,
			String text) {
		return SanphamRepository.findSanPhamByPriceDefaultAndDanhMucAndText(Default1, Default2, danhmuc, text);
	}

	public List<SanPham> findSanPhamByPriceDefaultAndDanhMucAndDiscount(Long Default1, Long Default2, String danhmuc) {
		return SanphamRepository.findSanPhamByPriceDefaultAndDanhMucAndDiscount(Default1, Default2, danhmuc);
	}

	public List<SanPham> findSanPhamByPriceDefaultAndDanhMucAndSosao(Long Default1, Long Default2, String danhmuc,
			int sosao) {
		return SanphamRepository.findSanPhamByPriceDefaultAndDanhMucAndSosao(Default1, Default2, danhmuc, sosao);
	}

	public List<SanPham> findSanPhamByPriceDefaultAndTextAndDiscount(Long Default1, Long Default2, String text) {
		return SanphamRepository.findSanPhamByPriceDefaultAndTextAndDiscount(Default1, Default2, text);
	}

	public List<SanPham> findSanPhamByPriceDefaultAndTextAndSosao(Long Default1, Long Default2, String text,
			int sosao) {
		return SanphamRepository.findSanPhamByPriceDefaultAndTextAndSosao(Default1, Default2, text, sosao);
	}

	public List<SanPham> findSanPhamByPriceDefaultAndDiscountAndSosao(Long Default1, Long Default2, int sosao) {
		return SanphamRepository.findSanPhamByPriceDefaultAndDiscountAndSosao(Default1, Default2, sosao);
	}

	public List<SanPham> findSanPhamByPriceDefaultAndDanhMucAndTextAndDiscount(Long Default1, Long Default2,
			String danhmuc, String text) {
		return SanphamRepository.findSanPhamByPriceDefaultAndDanhMucAndTextAndDiscount(Default1, Default2, danhmuc,
				text);
	}

	public List<SanPham> findSanPhamByPriceDefaultAndDanhMucAndTextAndSosao(Long Default1, Long Default2,
			String danhmuc, String text, int sosao) {
		return SanphamRepository.findSanPhamByPriceDefaultAndDanhMucAndTextAndSosao(Default1, Default2, danhmuc, text,
				sosao);
	}

	public List<SanPham> findSanPhamByPriceDefaultAndDanhMucAndDiscountAndSosao(Long Default1, Long Default2,
			String danhmuc, int sosao) {
		return SanphamRepository.findSanPhamByPriceDefaultAndDanhMucAndDiscountAndSosao(Default1, Default2, danhmuc,
				sosao);
	}

	public List<SanPham> findSanPhamByPriceDefaultAndTextAndDiscountAndSosao(Long Default1, Long Default2, String text,
			int sosao) {
		return SanphamRepository.findSanPhamByPriceDefaultAndTextAndDiscountAndSosao(Default1, Default2, text, sosao);
	}

	public List<SanPham> findSanPhamByAllConditionsWithPriceDefault(Long Default1, Long Default2, String danhmuc,
			String text, int sosao) {
		return SanphamRepository.findSanPhamByAllConditionsWithPriceDefault(Default1, Default2, danhmuc, text, sosao);
	}
	// end tìm sản phẩm theo giá

	// start tìm sản phẩm theo giá nhỏ hơn 10.000
	public List<SanPham> FindSanPhamByPriceLESS(Long price) {
		return SanphamRepository.findSanPhamByPriceLess(price);
	}

	public List<SanPham> findSanPhamByPriceLessHaveDanhMuc(Long price, String danhmuc) {
		return SanphamRepository.findSanPhamByPriceLessHaveDanhMuc(price, danhmuc);
	}

	public List<SanPham> findSanPhamByPriceLessHaveText(Long price, String text) {
		return SanphamRepository.findSanPhamByPriceLessHaveText(price, text);
	}

	public List<SanPham> findSanPhamByPriceLessHaveDiscount(Long price) {
		return SanphamRepository.findSanPhamByPriceLessHaveDiscount(price);
	}

	public List<SanPham> findSanPhamByPriceLessHaveSosao(Long price, int sosao) {
		return SanphamRepository.findSanPhamByPriceLessHaveSosao(price, sosao);
	}

	public List<SanPham> findSanPhamByPriceLessHaveDanhMucAndText(Long price, String danhmuc, String text) {
		return SanphamRepository.findSanPhamByPriceLessHaveDanhMucAndText(price, danhmuc, text);
	}

	public List<SanPham> findSanPhamByPriceLessHaveDanhMucAndDiscount(Long price, String danhmuc) {
		return SanphamRepository.findSanPhamByPriceLessHaveDanhMucAndDiscount(price, danhmuc);
	}

	public List<SanPham> findSanPhamByPriceLessHaveDanhMucAndSosao(Long price, String danhmuc, int sosao) {
		return SanphamRepository.findSanPhamByPriceLessHaveDanhMucAndSosao(price, danhmuc, sosao);
	}

	public List<SanPham> findSanPhamByPriceLessHaveTextAndDiscount(Long price, String text) {
		return SanphamRepository.findSanPhamByPriceLessHaveTextAndDiscount(price, text);
	}

	public List<SanPham> findSanPhamByPriceLessHaveTextAndSosao(Long price, String text, int sosao) {
		return SanphamRepository.findSanPhamByPriceLessHaveTextAndSosao(price, text, sosao);
	}

	public List<SanPham> findSanPhamByPriceLessHaveDiscountAndSosao(Long price, int sosao) {
		return SanphamRepository.findSanPhamByPriceLessHaveDiscountAndSosao(price, sosao);
	}

	public List<SanPham> findSanPhamByPriceLessHaveDanhMucAndTextAndDiscount(Long price, String danhmuc, String text) {
		return SanphamRepository.findSanPhamByPriceLessHaveDanhMucAndTextAndDiscount(price, danhmuc, text);
	}

	public List<SanPham> findSanPhamByPriceLessHaveDanhMucAndTextAndSosao(Long price, String danhmuc, String text,
			int sosao) {
		return SanphamRepository.findSanPhamByPriceLessHaveDanhMucAndTextAndSosao(price, danhmuc, text, sosao);
	}

	public List<SanPham> findSanPhamByPriceLessHaveDanhMucAndDiscountAndSosao(Long price, String danhmuc, int sosao) {
		return SanphamRepository.findSanPhamByPriceLessHaveDanhMucAndDiscountAndSosao(price, danhmuc, sosao);
	}

	public List<SanPham> findSanPhamByPriceLessHaveTextAndDiscountAndSosao(Long price, String text, int sosao) {
		return SanphamRepository.findSanPhamByPriceLessHaveTextAndDiscountAndSosao(price, text, sosao);
	}

	public List<SanPham> findSanPhamByAllConditions(Long price, String danhmuc, String text, int sosao) {
		return SanphamRepository.findSanPhamByAllConditions(price, danhmuc, text, sosao);
	}

	// end tìm sản phẩm theo giá nhỏ hơn 10.000

	// start tìm sản phẩm theo giá lớn hơn 100.000
	public List<SanPham> FindSanPhamByPriceMORE(Long price) {
		return SanphamRepository.findSanPhamByPriceMore(price);
	}

	public List<SanPham> findSanPhamByPriceMoreAndDanhMuc(Long price, String danhmuc) {
		return SanphamRepository.findSanPhamByPriceMoreAndDanhMuc(price, danhmuc);
	}

	public List<SanPham> findSanPhamByPriceMoreAndText(Long price, String text) {
		return SanphamRepository.findSanPhamByPriceMoreAndText(price, text);
	}

	public List<SanPham> findSanPhamByPriceMoreAndDiscount(Long price) {
		return SanphamRepository.findSanPhamByPriceMoreAndDiscount(price);
	}

	public List<SanPham> findSanPhamByPriceMoreAndSosao(Long price, int sosao) {
		return SanphamRepository.findSanPhamByPriceMoreAndSosao(price, sosao);
	}

	public List<SanPham> findSanPhamByPriceMoreAndDanhMucAndText(Long price, String danhmuc, String text) {
		return SanphamRepository.findSanPhamByPriceMoreAndDanhMucAndText(price, danhmuc, text);
	}

	public List<SanPham> findSanPhamByPriceMoreAndDanhMucAndDiscount(Long price, String danhmuc) {
		return SanphamRepository.findSanPhamByPriceMoreAndDanhMucAndDiscount(price, danhmuc);
	}

	public List<SanPham> findSanPhamByPriceMoreAndDanhMucAndSosao(Long price, String danhmuc, int sosao) {
		return SanphamRepository.findSanPhamByPriceMoreAndDanhMucAndSosao(price, danhmuc, sosao);
	}

	public List<SanPham> findSanPhamByPriceMoreAndTextAndDiscount(Long price, String text) {
		return SanphamRepository.findSanPhamByPriceMoreAndTextAndDiscount(price, text);
	}

	public List<SanPham> findSanPhamByPriceMoreAndTextAndSosao(Long price, String text, int sosao) {
		return SanphamRepository.findSanPhamByPriceMoreAndTextAndSosao(price, text, sosao);
	}

	public List<SanPham> findSanPhamByPriceMoreAndDiscountAndSosao(Long price, int sosao) {
		return SanphamRepository.findSanPhamByPriceMoreAndDiscountAndSosao(price, sosao);
	}

	public List<SanPham> findSanPhamByPriceMoreAndDanhMucAndTextAndDiscount(Long price, String danhmuc, String text) {
		return SanphamRepository.findSanPhamByPriceMoreAndDanhMucAndTextAndDiscount(price, danhmuc, text);
	}

	public List<SanPham> findSanPhamByPriceMoreAndDanhMucAndTextAndSosao(Long price, String danhmuc, String text,
			int sosao) {
		return SanphamRepository.findSanPhamByPriceMoreAndDanhMucAndTextAndSosao(price, danhmuc, text, sosao);
	}

	public List<SanPham> findSanPhamByPriceMoreAndDanhMucAndDiscountAndSosao(Long price, String danhmuc, int sosao) {
		return SanphamRepository.findSanPhamByPriceMoreAndDanhMucAndDiscountAndSosao(price, danhmuc, sosao);
	}

	public List<SanPham> findSanPhamByPriceMoreAndTextAndDiscountAndSosao(Long price, String text, int sosao) {
		return SanphamRepository.findSanPhamByPriceMoreAndTextAndDiscountAndSosao(price, text, sosao);
	}

	public List<SanPham> findSanPhamByAllConditionsWithPriceMore(Long price, String danhmuc, String text, int sosao) {
		return SanphamRepository.findSanPhamByAllConditionsWithPriceMore(price, danhmuc, text, sosao);
	}

	// end tìm sản phẩm theo giá lớn hơn 100.000
	public List<SanPham> FindSanPhamBySoSaoAndNameHaveDisCount(int sosao, String name) {
		return SanphamRepository.findSanPhamBySoSaoAndNameHaveDisCount(sosao, name);
	}

	public List<SanPham> FindSanPhamBySoSaoAndDanhMucHaveDisCount(int sosao, String id) {
		return SanphamRepository.findSanPhamBySoSaoAndDanhMucHaveDisCount(sosao, id);
	}

	public List<SanPham> FindSanPhamBySoSaoAndDanhMucAndNameHaveDisCount(int sosao, String id, String name) {
		return SanphamRepository.findSanPhamBySoSaoAndDanhMucAndNameHaveDisCount(sosao, id, name);
	}

	public List<SanPham> FindSanPhamBySoSaoAndName(int sosao, String name) {
		return SanphamRepository.findSanPhamBySoSaoAndName(sosao, name);
	}

	public List<SanPham> FindSanPhamBySoSaoAndDanhMuc(int sosao, String id) {
		return SanphamRepository.findSanPhamBySoSaoAndDanhMuc(sosao, id);
	}

	public List<SanPham> FindSanPhamBySoSaoAndDanhMucAndName(int sosao, String id, String name) {
		return SanphamRepository.findSanPhamBySoSaoAndDanhMucAndName(sosao, id, name);
	}

	public List<SanPham> FindSanPhamBySoSaoHaveDiscount(int sosao) {
		return SanphamRepository.findSanPhamBySoSaoHaveDiscount(sosao);
	}

	// tìm theo 5 sao
	public List<SanPham> findSanPhamBySoSaoEqual5AndNameHaveDisCount(String name) {
		return SanphamRepository.findSanPhamBySoSaoEqual5AndNameHaveDisCount(name);
	}

	public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucHaveDisCount(String id) {
		return SanphamRepository.findSanPhamBySoSaoEqual5AndDanhMucHaveDisCount(id);
	}

	public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucAndNameHaveDisCount(String id, String name) {
		return SanphamRepository.findSanPhamBySoSaoEqual5AndDanhMucAndNameHaveDisCount(id, name);
	}

	public List<SanPham> findSanPhamBySoSaoEqual5AndName(String name) {
		return SanphamRepository.findSanPhamBySoSaoEqual5AndName(name);
	}

	public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMuc(String id) {
		return SanphamRepository.findSanPhamBySoSaoEqual5AndDanhMuc(id);
	}

	public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucAndName(String id, String name) {
		return SanphamRepository.findSanPhamBySoSaoEqual5AndDanhMucAndName(id, name);
	}

	public List<SanPham> findSanPhamBySoSaoEqual5HaveDiscount() {
		return SanphamRepository.findSanPhamBySoSaoEqual5HaveDiscount();
	}

	public List<SanPham> findSanPhamByThuonghieuId(String id) {
		return SanphamRepository.findSanPhamByThuongHieuId(id);
	}

	public List<SanPham> findAllByDanhMucIds(List<String> ids) {
		return SanphamRepository.findAllByDanhMucIds(ids);
	}

	public List<String> findALLname() {
		return SanphamRepository.findallName();
	}

}
