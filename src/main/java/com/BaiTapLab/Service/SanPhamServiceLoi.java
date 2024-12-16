package com.BaiTapLab.Service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.BaiTapLab.DTO.SanPhamDTO;
import com.BaiTapLab.DTO.SanPhamDTO1;
import com.BaiTapLab.Entity.DanhMuc;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Repository.DanhMucRepository;
import com.BaiTapLab.Repository.HanhDongRepository;
import com.BaiTapLab.Repository.SanPhamRepository;

@Service
public class SanPhamServiceLoi {
	@Autowired
	DanhMucRepository DanhmucRepository;
	@Autowired
	SanPhamRepository SanphamRepository;
	@Autowired
	HanhDongRepository dongRepository;

	// new findby thuong hieu id
	public List<Object[]> findSanPhamThuongHieuID(String id) {

		return SanphamRepository.findSanPhamThuongHieuID(id);
	}
	
	public List<Object[]> findBySanPhamTopSellByMonth(int thang,int nam) {
		
		return SanphamRepository.findbestsellbymonththisyear(thang,nam);
	}

	public List<Object[]> findSanPhamByDMId(String id) {

		return SanphamRepository.findSanPhamByDMId(id);
	}

	// new full this week
	public List<Object[]> FindProductThisWeekfull() {
		LocalDate sevenDaysAgo = LocalDate.now().minusDays(15);

		return SanphamRepository.findSanPhamLast7Daysfull(sevenDaysAgo);
	}

	// new full Discount
	public List<Object[]> FindProductDiscountTOP10full() {
		return SanphamRepository.findSanPhamphantramGGfull();
	}

	public List<Object[]> finListdSanPhamById(String id, Pageable pageable) {

		return SanphamRepository.finListdSanPhamById(id, pageable);
	}

	public List<Object[]> findSanPhamPhanTramGiamGia(Pageable pageable) {

		return SanphamRepository.findSanPhamPhanTramGiamGia(pageable);
	}

	public List<Object[]> findSanPhamLast7DaysTOP100(Pageable pageable) {
		LocalDate sevenDaysAgo = LocalDate.now().minusDays(15);

		return SanphamRepository.findSanPhamLast7DaysTOP100(sevenDaysAgo, pageable);
	}

	public List<Object[]> FindProductTopSell(Pageable pageable) {
		return SanphamRepository.findTop10ByLuotMua(pageable);
	}

	public List<SanPham> findProductnotvalid() {
		return SanphamRepository.findSanPhamnotvalid();
	}

	public List<SanPhamDTO1> findwithdto() {
		return dongRepository.findHanhDongSanpham();
	}

	public List<SanPham> findProductvalid() {
		return SanphamRepository.findSanPhamvalid();
	}

	public List<SanPham> FindProducthaspopupid() {
		return SanphamRepository.findSanPhamphantramGGAndhaspopupid();
	}

	public List<SanPham> FindProductThisWeek() {
		LocalDate sevenDaysAgo = LocalDate.now().minusDays(15);
		return SanphamRepository.findSanPhamLast7Days(sevenDaysAgo);
	}

	public List<SanPham> FindProductThisWeekTOP10(Pageable pageable) {
		LocalDate sevenDaysAgo = LocalDate.now().minusDays(15);

		return SanphamRepository.findSanPhamLast7DaysTOP10(sevenDaysAgo, pageable);
	}

	public List<SanPham> FindProductDiscount() {
		return SanphamRepository.findSanPhamphantramGG();
	}

	public List<String> FindProductSuggest(String name, Pageable page) {
		return SanphamRepository.findSanPhamSuggestByRegex(name, page);
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

	// start danh mục

	// start KO khuyến mãi
	// tìm theo danh muc KHÔNG có khuyến mãi

	// tìm theo danh muc KHÔNG có khuyến mãi
	public List<SanPham> FindSanPhamByDanhMucID(String id) {
		return SanphamRepository.findSanPhamByDandMuc(id);
	}

	// tìm kiếm theo tên và danh mục và ko có khuyến mãi
	public List<SanPham> findSanPhamByTenAndDandMucAndWithOutGG(String name, String id) {
		return SanphamRepository.findSanPhamByTenAndDandMucAndWithOutGG(name, id);
	}

	// Tìm sản phẩm theo danh mục và số sao (rating) không có khuyến mãi:
	public List<SanPham> findSanPhamByDandMucAndRatingWithOutGG(String id, int rating) {
		return SanphamRepository.findSanPhamByDandMucAndRatingWithOutGG(id, rating);
	}

	// Tìm sản phẩm theo tên và danh mục và số sao (rating) không có khuyến mãi:
	public List<SanPham> findSanPhamByTenAndDandMucAndRatingWithOutGG(String name, String id, int rating) {
		return SanphamRepository.findSanPhamByTenAndDandMucAndRatingWithOutGG(name, id, rating);
	}

	// end KO khuyến mãi

	// start CÓ khuyến mãi

	// tìm kiếm theo danh mục và có khuyến mãi
	public List<SanPham> findSanPhamByDandMucAndGG(String id) {
		return SanphamRepository.findSanPhamByDandMucAndGG(id);
	}

	// tìm kiếm theo tên và danh mực
	public List<SanPham> findSanPhanByTenAndDanhMuc(String name, String id) {
		return SanphamRepository.findSanPhanByTenAndDanhMuc(name, id);
	}

	// Tìm sản phẩm theo danh mục và số sao (rating) không có khuyến mãi:
	public List<SanPham> findSanPhamByDandMucAndRatingWithGG(String id, int rating) {
		return SanphamRepository.findSanPhamByDandMucAndRatingWithGG(id, rating);
	}

	// Tìm sản phẩm theo tên và danh mục và số sao (rating) không có khuyến mãi:
	public List<SanPham> findSanPhamByTenAndDandMucAndRatingWithGG(String name, String id, int rating) {
		return SanphamRepository.findSanPhamByTenAndDandMucAndRatingWithGG(name, id, rating);
	}

	// end CÓ khuyến mãi

	// end danh mục

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

//		public List<SanPham> findSanPhamBySoSaoEqual5AndName(String name) {
//			return SanphamRepository.findSanPhamBySoSaoEqual5AndName(name);
//		}
	//
//		public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMuc(String id) {
//			return SanphamRepository.findSanPhamBySoSaoEqual5AndDanhMuc(id);
//		}
	//
//		public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucAndName(String id, String name) {
//			return SanphamRepository.findSanPhamBySoSaoEqual5AndDanhMucAndName(id, name);
//		}
	//
//		public List<SanPham> findSanPhamBySoSaoEqual5HaveDiscount() {
//			return SanphamRepository.findSanPhamBySoSaoEqual5HaveDiscount();
//		}



	public List<SanPham> findAllByDanhMucIds(List<String> ids) {
		return SanphamRepository.findAllByDanhMucIds(ids);
	}

	public List<String> findALLname() {
		return SanphamRepository.findallName();
	}

	// Tìm sản phẩm theo giá lớn hơn 100000

	// Tìm sản phẩm theo giá lớn hơn
	public List<SanPham> findSanPhamByPriceMore(Long price) {
		return SanphamRepository.findSanPhamByPriceMore(price);
	}

	// Tìm sản phẩm theo giá lớn hơn và danh mục
	public List<SanPham> findSanPhamByPriceMore100kAndDanhMuc(Long price, String danhmuc) {
		return SanphamRepository.findSanPhamByPriceMoreAndDanhMuc(price, danhmuc);
	}

	// Tìm sản phẩm theo giá lớn hơn và tên sản phẩm
	public List<SanPham> findSanPhamByPriceMore100kAndText(Long price, String text) {
		return SanphamRepository.findSanPhamByPriceMoreAndText(price, text);
	}

	// Tìm sản phẩm theo giá lớn hơn và có giảm giá
	public List<SanPham> findSanPhamByPriceMore100kAndDiscount(Long price) {
		return SanphamRepository.findSanPhamByPriceMoreAndDiscount(price);
	}

	// Tìm sản phẩm theo giá lớn hơn và sao đánh giá
	public List<SanPham> findSanPhamByPriceMore100kAndSosao(Long price, int sosao) {
		return SanphamRepository.findSanPhamByPriceMoreAndSosao(price, sosao);
	}

	// Tìm sản phẩm theo giá lớn hơn, danh mục và tên sản phẩm
	public List<SanPham> findSanPhamByPriceMore100kAndDanhMucAndText(Long price, String danhmuc, String text) {
		return SanphamRepository.findSanPhamByPriceMoreAndDanhMucAndText(price, danhmuc, text);
	}

	// Tìm sản phẩm theo giá lớn hơn, danh mục và có giảm giá
	public List<SanPham> findSanPhamByPriceMore100kAndDanhMucAndDiscount(Long price, String danhmuc) {
		return SanphamRepository.findSanPhamByPriceMoreAndDanhMucAndDiscount(price, danhmuc);
	}

	// Tìm sản phẩm theo giá lớn hơn, danh mục và sao đánh giá
	public List<SanPham> findSanPhamByPriceMore100kAndDanhMucAndSosao(Long price, String danhmuc, int sosao) {
		return SanphamRepository.findSanPhamByPriceMoreAndDanhMucAndSosao(price, danhmuc, sosao);
	}

	// Tìm sản phẩm theo giá lớn hơn, tên sản phẩm và có giảm giá
	public List<SanPham> findSanPhamByPriceMore100kAndTextAndDiscount(Long price, String text) {
		return SanphamRepository.findSanPhamByPriceMoreAndTextAndDiscount(price, text);
	}

	// Tìm sản phẩm theo giá lớn hơn, tên sản phẩm và sao đánh giá
	public List<SanPham> findSanPhamByPriceMore100kAndTextAndSosao(Long price, String text, int sosao) {
		return SanphamRepository.findSanPhamByPriceMoreAndTextAndSosao(price, text, sosao);
	}

	// Tìm sản phẩm theo giá lớn hơn, có giảm giá và sao đánh giá
	public List<SanPham> findSanPhamByPriceMore100kAndDiscountAndSosao(Long price, int sosao) {
		return SanphamRepository.findSanPhamByPriceMoreAndDiscountAndSosao(price, sosao);
	}

	// Tìm sản phẩm theo giá lớn hơn, danh mục, tên sản phẩm và có giảm giá
	public List<SanPham> findSanPhamByPriceMore100kAndDanhMucAndTextAndDiscount(Long price, String danhmuc,
			String text) {
		return SanphamRepository.findSanPhamByPriceMoreAndDanhMucAndTextAndDiscount(price, danhmuc, text);
	}

	// Tìm sản phẩm theo giá lớn hơn, danh mục, tên sản phẩm và sao đánh giá
	public List<SanPham> findSanPhamByPriceMore100kAndDanhMucAndTextAndSosao(Long price, String danhmuc, String text,
			int sosao) {
		return SanphamRepository.findSanPhamByPriceMoreAndDanhMucAndTextAndSosao(price, danhmuc, text, sosao);
	}

	// Tìm sản phẩm theo giá lớn hơn, danh mục, có giảm giá và sao đánh giá
	public List<SanPham> findSanPhamByPriceMore100kAndDanhMucAndDiscountAndSosao(Long price, String danhmuc,
			int sosao) {
		return SanphamRepository.findSanPhamByPriceMoreAndDanhMucAndDiscountAndSosao(price, danhmuc, sosao);
	}

	// Tìm sản phẩm theo giá lớn hơn, tên sản phẩm, có giảm giá và sao đánh giá
	public List<SanPham> findSanPhamByPriceMore100kAndTextAndDiscountAndSosao(Long price, String text, int sosao) {
		return SanphamRepository.findSanPhamByPriceMoreAndTextAndDiscountAndSosao(price, text, sosao);
	}

	// Tìm sản phẩm theo tất cả các điều kiện
	public List<SanPham> findSanPhamByAllConditionsWithPriceMore100k(Long price, String danhmuc, String text,
			int sosao) {
		return SanphamRepository.findSanPhamByAllConditionsWithPriceMore(price, danhmuc, text, sosao);
	}

	// new
	public List<SanPham> findSanPhambyTextAndSoSaoHaveDiscount(int sosao, String name) {
		return SanphamRepository.findSanPhambyTextAndSoSaoHaveDiscount(sosao, name);
	}

	public List<SanPham> findSanPhambyTextAndSoSao(int sosao, String name) {
		return SanphamRepository.findSanPhambyTextAndSoSao(sosao, name);
	}

	// find by 5 sao
	// 1. Tìm sản phẩm theo tên và số sao có giảm giá
	public List<SanPham> findSanPhamBySoSaoEqual5AndNameHaveDiscount(String name) {
		return SanphamRepository.findSanPhamBySoSaoEqual5AndNameHaveDisCount(name);
	}

	// 2. Tìm sản phẩm theo danh mục và số sao có giảm giá
	public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucHaveDiscount(String id) {
		return SanphamRepository.findSanPhamBySoSaoEqual5AndDanhMucHaveDisCount(id);
	}

	// 3. Tìm sản phẩm theo danh mục, tên và số sao có giảm giá
	public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucAndNameHaveDiscount(String id, String name) {
		return SanphamRepository.findSanPhamBySoSaoEqual5AndDanhMucAndNameHaveDisCount(id, name);
	}

	// 4. Tìm sản phẩm chỉ có số sao = 5 và có giảm giá
	public List<SanPham> findSanPhamBySoSaoEqual5HaveDiscount() {
		return SanphamRepository.findSanPhamBySoSaoEqual5HaveDiscount();
	}

	// 5. Tìm sản phẩm giá nhỏ hơn 10,000, số sao = 5 và có giảm giá
	public List<SanPham> findSanPhamBySoSaoEqual5Less10kHaveDiscount(long price) {
		return SanphamRepository.findSanPhamBySoSaoEqual5Less10kHaveDiscount(price);
	}

	// 6. Tìm sản phẩm giá lớn hơn 100,000, số sao = 5 và có giảm giá
	public List<SanPham> findSanPhamBySoSaoEqual5More100kHaveDiscount(long price) {
		return SanphamRepository.findSanPhamBySoSaoEqual5More100kHaveDiscount(price);
	}

	// 7. Tìm sản phẩm trong khoảng giá (default), số sao = 5 và có giảm giá
	public List<SanPham> findSanPhamBySoSaoEqual5DefaultHaveDiscount(long default1, long default2) {
		return SanphamRepository.findSanPhamBySoSaoEqual5DefaultHaveDiscount(default1, default2);
	}

	// 8. Tìm sản phẩm theo tên và giá nhỏ hơn 10,000, số sao = 5 và có giảm giá
	public List<SanPham> findSanPhamBySoSaoAndNameEqual5Less10kHaveDiscount(long price, String name) {
		return SanphamRepository.findSanPhamBySoSaoAndNameEqual5Less10kHaveDiscount(price, name);
	}

	// 9. Tìm sản phẩm theo tên và giá lớn hơn 100,000, số sao = 5 và có giảm giá
	public List<SanPham> findSanPhamBySoSaoAndNameEqual5More100kHaveDiscount(long price, String name) {
		return SanphamRepository.findSanPhamBySoSaoAndNameEqual5More100kHaveDiscount(price, name);
	}

	// 10. Tìm sản phẩm theo danh mục, tên và giá nhỏ hơn 10,000, số sao = 5 và có
	// giảm giá
	public List<SanPham> findSanPhamBySoSaoAndNameAndDanhmucEqual5Less10kHaveDiscount(long price, String name,
			String danhmuc) {
		return SanphamRepository.findSanPhamBySoSaoAndNameAndDanhmucEqual5Less10kHaveDiscount(price, name, danhmuc);
	}

	// 11. Tìm sản phẩm theo danh mục, tên và giá lớn hơn 100,000, số sao = 5 và có
	// giảm giá
	public List<SanPham> findSanPhamBySoSaoAndNameAndDanhmucEqual5More100kHaveDiscount(long price, String name,
			String danhmuc) {
		return SanphamRepository.findSanPhamBySoSaoAndNameAndDanhmucEqual5More100kHaveDiscount(price, name, danhmuc);
	}

	// 12. Tìm sản phẩm theo tên và khoảng giá (min-max), số sao = 5 và có giảm giá
	public List<SanPham> findSanPhamBySoSaoEqual5DefaulAndNameHaveDiscount(long default1, long default2, String name) {
		return SanphamRepository.findSanPhamBySoSaoEqual5DefaulAnhdNametHaveDiscount(default1, default2, name);
	}

	// 13. Tìm sản phẩm theo danh mục và khoảng giá (min-max), số sao = 5 và có giảm
	// giá
	public List<SanPham> findSanPhamBySoSaoEqual5DefaulAndDanhmucHaveDiscount(long default1, long default2,
			String danhmuc) {
		return SanphamRepository.findSanPhamBySoSaoEqual5DefaulAndDanhmuctHaveDiscount(default1, default2, danhmuc);
	}

	// 14. Tìm sản phẩm theo tên, danh mục và khoảng giá (min-max), số sao = 5 và có
	// giảm giá
	public List<SanPham> findSanPhamBySoSaoEqual5DefaulAndDanhmucAndNameHaveDiscount(long default1, long default2,
			String danhmuc, String name) {
		return SanphamRepository.findSanPhamBySoSaoEqual5DefaulAndDanhmucAndNametHaveDiscount(default1, default2,
				danhmuc, name);
	}

	// Phương thức tìm sản phẩm có 5 sao, giá <= giá chỉ định, trong danh mục chỉ
	// định và có giảm giá
	public List<SanPham> laySanPham5SaoVaDanhMucGiaNhoHonCoGG(long price, String danhmuc) {
		return SanphamRepository.findSanPhamBySoSaoAnddanhmucEqual5Less10kHaveDiscount(price, danhmuc);
	}

	// Phương thức tìm sản phẩm có 5 sao, giá >= giá chỉ định, trong danh mục chỉ
	// định và có giảm giá
	public List<SanPham> laySanPham5SaoVaDanhMucGiaLonHonCoGG(long price, String danhmuc) {
		return SanphamRepository.findSanPhamBySoSaoAnddanhmucEqual5More100kHaveDiscount(price, danhmuc);
	}

	// 15. Tìm sản phẩm chỉ có số sao = 5 (không cần giảm giá)
	public List<SanPham> findSanPhamBySoSaoEqual5() {
		return SanphamRepository.findSanPhamBySoSaoEqual5();
	}

	// 16. Tìm sản phẩm theo tên và số sao = 5 (không cần giảm giá)
	public List<SanPham> findSanPhamBySoSaoEqual5AndName(String name) {
		return SanphamRepository.findSanPhamBySoSaoEqual5AndName(name);
	}

	// 17. Tìm sản phẩm theo danh mục và số sao = 5 (không cần giảm giá)
	public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMuc(String id) {
		return SanphamRepository.findSanPhamBySoSaoEqual5AndDanhMuc(id);
	}

	// 18. Tìm sản phẩm theo danh mục, tên và số sao = 5 (không cần giảm giá)
	public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucAndName(String id, String name) {
		return SanphamRepository.findSanPhamBySoSaoEqual5AndDanhMucAndName(id, name);
	}

	// 19. Tìm sản phẩm giá nhỏ hơn 10,000 và số sao = 5 (không cần giảm giá)
	public List<SanPham> findSanPhamBySoSaoEqual5Less10k(long price) {
		return SanphamRepository.findSanPhamBySoSaoEqual5Less10k(price);
	}

	// 20. Tìm sản phẩm giá lớn hơn 100,000 và số sao = 5 (không cần giảm giá)
	public List<SanPham> findSanPhamBySoSaoEqual5More100k(long price) {
		return SanphamRepository.findSanPhamBySoSaoEqual5More100k(price);
	}

	// 21. Tìm sản phẩm trong khoảng giá (default) và số sao = 5 (không cần giảm
	// giá)
	public List<SanPham> findSanPhamBySoSaoEqual5Default(long default1, long default2) {
		return SanphamRepository.findSanPhamBySoSaoEqual5Default(default1, default2);
	}

	// 22. Tìm sản phẩm theo tên và giá nhỏ hơn 10,000, số sao = 5 (không cần giảm
	// giá)
	public List<SanPham> findSanPhamBySoSaoAndNameEqual5Less10k(long price, String name) {
		return SanphamRepository.findSanPhamBySoSaoAndNameEqual5Less10k(price, name);
	}

	// 23. Tìm sản phẩm theo tên và giá lớn hơn 100,000, số sao = 5 (không cần giảm
	// giá)
	public List<SanPham> findSanPhamBySoSaoAndNameEqual5More100k(long price, String name) {
		return SanphamRepository.findSanPhamBySoSaoAndNameEqual5More100k(price, name);
	}

	// 24. Tìm sản phẩm theo danh mục, tên và giá nhỏ hơn 10,000, số sao = 5 (không
	// cần giảm giá)
	public List<SanPham> findSanPhamBySoSaoAndNameAndDanhmucEqual5Less10k(long price, String name, String danhmuc) {
		return SanphamRepository.findSanPhamBySoSaoAndNameAndDanhmucEqual5Less10k(price, name, danhmuc);
	}

	// 25. Tìm sản phẩm theo danh mục, tên và giá lớn hơn 100,000, số sao = 5 (không
	// cần giảm giá)
	public List<SanPham> findSanPhamBySoSaoAndNameAndDanhmucEqual5More100k(long price, String name, String danhmuc) {
		return SanphamRepository.findSanPhamBySoSaoAndNameAndDanhmucEqual5More100k(price, name, danhmuc);
	}

	// 26. Tìm sản phẩm theo tên và khoảng giá (min-max), số sao = 5 (không cần giảm
	// giá)
	public List<SanPham> findSanPhamBySoSaoEqual5DefaultAndName(long default1, long default2, String name) {
		return SanphamRepository.findSanPhamBySoSaoEqual5DefaultAndName(default1, default2, name);
	}

	// 27. Tìm sản phẩm theo danh mục và khoảng giá (min-max), số sao = 5 (không cần
	// giảm giá)
	public List<SanPham> findSanPhamBySoSaoEqual5DefaultAndDanhmuc(long default1, long default2, String danhmuc) {
		return SanphamRepository.findSanPhamBySoSaoEqual5DefaultAndDanhmuc(default1, default2, danhmuc);
	}

	// 28. Tìm sản phẩm theo tên, danh mục và khoảng giá (min-max), số sao = 5
	// (không cần giảm giá)
	public List<SanPham> findSanPhamBySoSaoEqual5DefaultAndDanhmucAndName(long default1, long default2, String danhmuc,
			String name) {
		return SanphamRepository.findSanPhamBySoSaoEqual5DefaultAndDanhmucAndName(default1, default2, danhmuc, name);
	}

	// Phương thức tìm sản phẩm có 5 sao, giá <= giá chỉ định, trong danh mục chỉ
	// định
	public List<SanPham> laySanPham5SaoVaDanhMucGiaNhoHon(long price, String danhmuc) {
		return SanphamRepository.findSanPhamBySoSaoAnddanhmucEqual5Less10k(price, danhmuc);
	}

	// Phương thức tìm sản phẩm có 5 sao, giá >= giá chỉ định, trong danh mục chỉ
	// định
	public List<SanPham> laySanPham5SaoVaDanhMucGiaLonHon(long price, String danhmuc) {
		return SanphamRepository.findSanPhamBySoSaoAnddanhmucEqual5More100k(price, danhmuc);
	}

}