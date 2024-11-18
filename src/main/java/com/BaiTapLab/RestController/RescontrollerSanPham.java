package com.BaiTapLab.RestController;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Service.SanPhamService;

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

	@GetMapping("FindProducthaspopupid")
	public List<SanPham> FindProducthaspopupid() {
		return SanPhamService.FindProducthaspopupid();
	}

	@GetMapping("FindProductThisWeekTOP10")
	public List<SanPham> FindProductThisWeekTOP10() {

		return SanPhamService.FindProductThisWeekTOP10(PageRequest.of(0, 10));
	}

	// tìm kiếm các sản phẩm bán nhiều nhất
	@GetMapping("FindProductTopSell")
	public List<SanPham> FindProductTopSell() {

		return SanPhamService.FindProductTopSell(PageRequest.of(0, 10));
	}

	// tìm kiếm các sản phẩm đc giảm giá
	@GetMapping("FindProductDiscount")
	public List<SanPham> FindProductDiscount() {

		return SanPhamService.FindProductDiscount();
	}

	@GetMapping("FindProductDiscountTOP10")
	public List<SanPham> FindProductDiscountTOP10() {

		return SanPhamService.FindProductDiscountTOP10(PageRequest.of(0, 10));
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

	// tìm sản phẩm theo tên % %
	@GetMapping("Product/FindbyName")
	public List<SanPham> FindSanPhamLikeName(@RequestParam("name") String name) {

		return SanPhamService.FindSanPhamLikeName(name);
	}

	// tìm sản phẩm theo name và danh mục
	@GetMapping("Product/FindbyNameandDanhmuc")
	public List<SanPham> FindbyNameandDanhmuc(@RequestParam("name") String name, @RequestParam("id") String id) {
//		const res = await axios({ url: `http://localhost:8080/Product/FindByCategory?id=${danhmuc}&name=${TextSearch}`, method: 'GET' })
		return SanPhamService.FindSanPhamLikeNameAndCategory(name, id);
	}

	// tìm sản phẩm theo name và danh mục có giảm giá
	@GetMapping("Product/FindbyNameandDanhmucWithDiscount")
	public List<SanPham> FindbyNameandDanhmucWithDiscount(@RequestParam("name") String name,
			@RequestParam("id") String id) {
//		const res = await axios({ url: `http://localhost:8080/Product/FindByCategory?id=${danhmuc}&name=${TextSearch}`, method: 'GET' })
		return SanPhamService.FindSanPhamLikeNameAndCategoryWithDiscount(name, id);
	}

	// tìm sản phẩm theo name và danh mục ko có giảm giá
	@GetMapping("Product/FindbyNameandDanhmucWithoutDiscount")
	public List<SanPham> FindbyNameandDanhmucWithoutDiscount(@RequestParam("name") String name,
			@RequestParam("id") String id) {
//		const res = await axios({ url: `http://localhost:8080/Product/FindByCategory?id=${danhmuc}&name=${TextSearch}`, method: 'GET' })
		return SanPhamService.FindSanPhamLikeNameAndCategoryWithoutDiscount(name, id);
	}

	// tìm sản phẩm theo name ko có giảm giá
	@GetMapping("Product/findSanPhamByTenWithOutGG")
	public List<SanPham> findSanPhamByTenWithOutGG(@RequestParam("name") String name) {
		return SanPhamService.FindSanPhamByNameWithoutDiscount(name);
	}

	// tìm sản phẩm theo danh mục ko có giảm giá
	@GetMapping("Product/findSanPhamByDandMucAndWithOutGG")
	public List<SanPham> findSanPhamByDandMucAndWithOutGG(@RequestParam("id") String id) {
		return SanPhamService.FindSanPhamByDanhmucWithoutDiscount(id);
	}

	// tìm sản phẩm theo name có giảm giá

	@GetMapping("Product/FindbyNameWithDiscount")
	public List<SanPham> FindbyNameWithDiscount(@RequestParam("name") String name) {
		return SanPhamService.FindSanPhamByNameWithDiscount(name);
	}

	// tìm sản phẩm theo danh mục có giảm giá
	@GetMapping("Product/FindbyDanhmucWithDiscount")
	public List<SanPham> FindbyDanhmucWithDiscount(@RequestParam("id") String id) {
		return SanPhamService.FindSanPhamByDanhmucWithDiscount(id);
	}

	// tìm sản phẩm theo danh mục có giảm giá
	@GetMapping("Product/FindbySosao")
	public List<SanPham> FindbySosao(@RequestParam("sosao") int saosao) {
		return SanPhamService.FindSanPhamBySoSao(saosao);
	}

	// tìm kiếm theo số sao là 5
	@GetMapping("Product/FindbySosao5")
	public List<SanPham> FindbySosao1() {
		return SanPhamService.findSanPhamByTotalSoSaoEquals5();
	}

	// start tìm theo giá
	@GetMapping("Product/FindbyPrice")
	public List<SanPham> FindbyPrice(@RequestParam("price1") Long Default1, @RequestParam("price2") Long Default2) {
		return SanPhamService.FindSanPhamByGiaDefault(Default1, Default2);
	}

	// end tìm theo giá

	// tìm theo giá nhỏ hơn
	@GetMapping("Product/FindbyPriceLess")
	public List<SanPham> FindbyPriceLess(@RequestParam("price") Long Default) {
		return SanPhamService.FindSanPhamByPriceLESS(Default);
	}

//		@GetMapping("Product/FindByPriceLessAndCategory")
//		public List<SanPham> findByPriceAndCategory(@RequestParam("price") Long price,
//		                                            @RequestParam("category") String category) {
//		    return SanPhamService.findSanPhamByPriceLessHaveDanhMuc(price, category);
//		}
//		
//		
//		@GetMapping("Product/FindByPriceLessAndText")
//		public List<SanPham> findByPriceAndText(@RequestParam("price") Long price,
//		                                        @RequestParam("text") String text) {
//		    return SanPhamService.findSanPhamByPriceLessHaveText(price, text);
//		}
//		
//		@GetMapping("Product/FindByPriceLessAndPromotion")
//		public List<SanPham> findByPriceAndPromotion(@RequestParam("price") Long price) {
//		    return SanPhamService.findSanPhamByPriceLessHaveDiscount(price);
//		}
//		
//		@GetMapping("Product/FindByPriceLessAndRating")
//		public List<SanPham> findByPriceAndRating(@RequestParam("price") Long price,
//		                                          @RequestParam("rating") int rating) {
//		    return SanPhamService.findSanPhamByPriceLessHaveSosao(price, rating);
//		}
//		
//		@GetMapping("Product/FindByPriceLessAndCategoryAndText")
//		public List<SanPham> findByPriceCategoryAndText(@RequestParam("price") Long price,
//		                                                @RequestParam("category") String category,
//		                                                @RequestParam("text") String text) {
//		    return SanPhamService.findSanPhamByPriceLessHaveDanhMucAndText(price, category, text);
//		}
//		
//		@GetMapping("Product/FindByPriceLessAndCategoryAndPromotion")
//		public List<SanPham> findByPriceCategoryAndPromotion(@RequestParam("price") Long price,
//		                                                     @RequestParam("category") String category) {
//		    return SanPhamService.findSanPhamByPriceLessHaveDanhMucAndDiscount(price, category);
//		}
//
//		@GetMapping("Product/FindByPriceLessAndCategoryAndRating")
//		public List<SanPham> findByPriceCategoryAndRating(@RequestParam("price") Long price,
//		                                                  @RequestParam("category") String category,
//		                                                  @RequestParam("rating") int rating) {
//		    return SanPhamService.findSanPhamByPriceLessHaveDanhMucAndSosao(price, category, rating);
//		}
//
//		@GetMapping("Product/FindByPriceLessAndTextAndPromotion")
//		public List<SanPham> findByPriceTextAndPromotion(@RequestParam("price") Long price,
//		                                                 @RequestParam("text") String text) {
//		    return SanPhamService.findSanPhamByPriceLessHaveTextAndDiscount(price, text);
//		}
//
//		@GetMapping("Product/FindByPriceLessAndTextAndRating")
//		public List<SanPham> findByPriceTextAndRating(@RequestParam("price") Long price,
//		                                              @RequestParam("text") String text,
//		                                              @RequestParam("rating") int rating) {
//		    return SanPhamService.findSanPhamByPriceLessHaveTextAndSosao(price, text, rating);
//		}
//
//		@GetMapping("Product/FindByPriceLessAndPromotionAndRating")
//		public List<SanPham> findByPricePromotionAndRating(@RequestParam("price") Long price,
//		                                                   @RequestParam("rating") int rating) {
//		    return SanPhamService.findSanPhamByPriceLessHaveDiscountAndSosao(price, rating);
//		}
//
//		@GetMapping("Product/FindByPriceLessAndCategoryAndTextAndPromotion")
//		public List<SanPham> findByPriceCategoryTextAndPromotion(@RequestParam("price") Long price,
//		                                                         @RequestParam("category") String category,
//		                                                         @RequestParam("text") String text) {
//		    return SanPhamService.findSanPhamByPriceLessHaveDanhMucAndTextAndDiscount(price, category, text);
//		}
//
//		@GetMapping("Product/FindByPriceLessAndCategoryAndTextAndRating")
//		public List<SanPham> findByPriceCategoryTextAndRating(@RequestParam("price") Long price,
//		                                                      @RequestParam("category") String category,
//		                                                      @RequestParam("text") String text,
//		                                                      @RequestParam("rating") int rating) {
//		    return SanPhamService.findSanPhamByPriceLessHaveDanhMucAndTextAndSosao(price, category, text, rating);
//		}
//
//		@GetMapping("Product/FindByPriceLessAndCategoryAndPromotionAndRating")
//		public List<SanPham> findByPriceCategoryPromotionAndRating(@RequestParam("price") Long price,
//		                                                           @RequestParam("category") String category,
//		                                                           @RequestParam("rating") int rating) {
//		    return SanPhamService.findSanPhamByPriceLessHaveDanhMucAndDiscountAndSosao(price, category, rating);
//		}
//
//		@GetMapping("Product/FindByPriceLessAndTextAndPromotionAndRating")
//		public List<SanPham> findByPriceTextPromotionAndRating(@RequestParam("price") Long price,
//		                                                       @RequestParam("text") String text,
//		                                                       @RequestParam("rating") int rating) {
//		    return SanPhamService.findSanPhamByPriceLessHaveTextAndDiscountAndSosao(price, text, rating);
//		}
//
//		@GetMapping("Product/FindByAllConditions")
//		public List<SanPham> findByAllConditions(@RequestParam("price") Long price,
//		                                         @RequestParam("category") String category,
//		                                         @RequestParam("text") String text,
//		                                         @RequestParam("rating") int rating) {
//		    return SanPhamService.findSanPhamByAllConditions(price, category, text, rating);
//		}

	// end tìm theo giá nhỏ hơn

	// start tìm theo giá lớn hơn

	@GetMapping("Product/FindbyPriceMore")
	public List<SanPham> FindbyPriceMore(@RequestParam("price") Long Default) {
		return SanPhamService.FindSanPhamByPriceMORE(Default);
	}

	// end start tìm theo giá lớn hơn

	// tìm sản phẩm theo số sao và tên có gg
	@GetMapping("Product/FindSanPhamBySoSaoAndNameHaveDisCount")
	public List<SanPham> FindSanPhamBySoSaoAndNameHaveDisCount(@RequestParam("sosao") int sosao,
			@RequestParam("name") String name) {
		return SanPhamService.FindSanPhamBySoSaoAndNameHaveDisCount(sosao, name);
	}

	// tìm sản phẩm theo số sao và danh mục có gg
	@GetMapping("Product/FindSanPhamBySoSaoAndDanhMucHaveDisCount")
	public List<SanPham> FindSanPhamBySoSaoAndDanhMucHaveDisCount(@RequestParam("sosao") int sosao,
			@RequestParam("id") String id) {
		return SanPhamService.FindSanPhamBySoSaoAndDanhMucHaveDisCount(sosao, id);
	}

	// tìm sản phẩm theo số sao và danh mục và name có gg
	@GetMapping("Product/FindSanPhamBySoSaoAndDanhMucAndNameHaveDisCount")
	public List<SanPham> FindSanPhamBySoSaoAndDanhMucAndNameHaveDisCount(@RequestParam("sosao") int sosao,
			@RequestParam("id") String id, @RequestParam("name") String name) {
		return SanPhamService.FindSanPhamBySoSaoAndDanhMucAndNameHaveDisCount(sosao, id, name);
	}

	// tìm sản phẩm theo số sao và tên
	@GetMapping("Product/FindSanPhamBySoSaoAndName")
	public List<SanPham> FindSanPhamBySoSaoAndName(@RequestParam("sosao") int sosao,
			@RequestParam("name") String name) {
		return SanPhamService.FindSanPhamBySoSaoAndName(sosao, name);
	}

	// tìm sản phẩm theo số sao và danh mục
	@GetMapping("Product/FindSanPhamBySoSaoAndDanhMuc")
	public List<SanPham> FindSanPhamBySoSaoAndDanhMuc(@RequestParam("sosao") int sosao, @RequestParam("id") String id) {
		return SanPhamService.FindSanPhamBySoSaoAndDanhMuc(sosao, id);
	}

	// tìm sản phẩm theo số sao và danh mục và name
	@GetMapping("Product/FindSanPhamBySoSaoAndDanhMucAndName")
	public List<SanPham> FindSanPhamBySoSaoAndDanhMucAndName(@RequestParam("sosao") int sosao,
			@RequestParam("id") String id, @RequestParam("name") String name) {
		return SanPhamService.FindSanPhamBySoSaoAndDanhMucAndName(sosao, id, name);
	}

	@GetMapping("Product/FindSanPhamBySoSaoHaveDiscount")
	public List<SanPham> FindSanPhamBySoSaoHaveDiscount(@RequestParam("sosao") int sosao) {
		return SanPhamService.FindSanPhamBySoSaoHaveDiscount(sosao);
	}

//                          start  tìm theo 5 SAO

	@GetMapping("Product/findSanPhamBySoSaoEqual5AndNameHaveDisCount")
	public List<SanPham> findSanPhamBySoSaoEqual5AndNameHaveDisCount(@RequestParam("name") String name) {
		return SanPhamService.findSanPhamBySoSaoEqual5AndNameHaveDisCount(name);
	}

	@GetMapping("Product/findSanPhamBySoSaoEqual5AndDanhMucHaveDisCount")
	public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucHaveDisCount(@RequestParam("id") String id) {
		return SanPhamService.findSanPhamBySoSaoEqual5AndDanhMucHaveDisCount(id);
	}

	@GetMapping("Product/findSanPhamBySoSaoEqual5AndDanhMucAndNameHaveDisCount")
	public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucAndNameHaveDisCount(@RequestParam("id") String id,
			@RequestParam("name") String name) {
		return SanPhamService.findSanPhamBySoSaoEqual5AndDanhMucAndNameHaveDisCount(id, name);
	}

	@GetMapping("Product/findSanPhamBySoSaoEqual5AndName")
	public List<SanPham> findSanPhamBySoSaoEqual5AndName(@RequestParam("name") String name) {
		return SanPhamService.findSanPhamBySoSaoEqual5AndName(name);
	}

	@GetMapping("Product/findSanPhamBySoSaoEqual5AndDanhMuc")
	public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMuc(@RequestParam("id") String id) {
		return SanPhamService.findSanPhamBySoSaoEqual5AndDanhMuc(id);
	}

	@GetMapping("Product/findSanPhamBySoSaoEqual5AndDanhMucAndName")
	public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucAndName(@RequestParam("id") String id,
			@RequestParam("name") String name) {
		return SanPhamService.findSanPhamBySoSaoEqual5AndDanhMucAndName(id, name);
	}

	@GetMapping("Product/findSanPhamBySoSaoEqual5HaveDiscount")
	public List<SanPham> findSanPhamBySoSaoEqual5HaveDiscount() {
		return SanPhamService.findSanPhamBySoSaoEqual5HaveDiscount();
	}

//                           end  tìm theo 5 SAO	

//                           start tìm theo thương hiệu

	@GetMapping("Product/findSanPhamByThuonghieuId")
	public List<SanPham> getMethodName111(@RequestParam("id") String id) {
		System.out.println("id" + id);
		return SanPhamService.findSanPhamByThuonghieuId(id);
	}

	@GetMapping("Product/findAllBySan_phamIdIn")
	public List<SanPham> findAllByDanhMucIds(@RequestParam String ids) {
		List<String> idList = Arrays.asList(ids.split(","));
		System.out.println(idList);
		List<SanPham> sanPhams = SanPhamService.findAllByDanhMucIds(idList);
		return sanPhams;
	}

}