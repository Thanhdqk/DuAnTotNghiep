package com.BaiTapLab.RestController;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Service.SanPhamService;



import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@GetMapping("FindNameSP")
	public List<String> getMethodNameSanPham() {
		return SanPhamService.findALLname();
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
	
	//  start tìm theo danh mục không có giảm giá 
	
	// tìm theo danh muc KHÔNG có khuyến mãi
	@GetMapping("Product/FindByCategory")
	public List<SanPham> FindSanPhamByDanhMucIDWithOutGG(@RequestParam("id") String id) {
		
		
		return SanPhamService.FindSanPhamByDanhMucID(id);
	}
	
	// tìm kiếm theo tên và danh mục và ko có khuyến mãi
	
	@GetMapping("Product/FindbyNameandDanhmuc")
	public List<SanPham> FindbyNameandDanhmucWithOutGG(@RequestParam("name") String name,@RequestParam("id") String id) {

		return SanPhamService.findSanPhamByTenAndDandMucAndWithOutGG(name, id);
	}
	// Tìm sản phẩm theo danh mục và số sao (rating) không có khuyến mãi:
	
	@GetMapping("Product/FindbySoSaoandDanhmuc")
	public List<SanPham> findSanPhamByDandMucAndRatingWithOutGG(@RequestParam("id") String id,@RequestParam("sosao") int sosao)
	{
		return SanPhamService.findSanPhamByDandMucAndRatingWithOutGG(id,sosao);
	}
	
	// Tìm sản phẩm theo tên và danh mục và số sao (rating) không có khuyến mãi:
	@GetMapping("Product/FindbySoSaoandDanhmucandName")
	public List<SanPham> findSanPhamByTenAndDandMucAndRatingWithOutGG(@RequestParam("name") String name,@RequestParam("id") String id,@RequestParam("sosao") int sosao)
	{
		return SanPhamService.findSanPhamByTenAndDandMucAndRatingWithOutGG(name,id,sosao);
	}
	
	//  end tìm theo danh mục không có giảm giá
	
	
   //  start tìm theo danh mục  có giảm giá 
	
	// tìm kiếm sản phẩm theo id danh mục
	@GetMapping("Product/FindByCategoryWithDiscount")
	public List<SanPham> FindSanPhamByDanhMucIDWithDiscount(@RequestParam("id") String id) {
		
		
		return SanPhamService.findSanPhamByDandMucAndGG(id);
	}
	
	// tìm kiếm theo tên và danh mục và ko có khuyến mãi
	
	@GetMapping("Product/FindbyNameandDanhmucWithDiscount2")
	public List<SanPham> FindbyNameandDanhmucWithDiscount2(@RequestParam("name") String name,@RequestParam("id") String id) {

		return SanPhamService.findSanPhanByTenAndDanhMuc(name, id);
	}
	// Tìm sản phẩm theo danh mục và số sao (rating) không có khuyến mãi:
	
	@GetMapping("Product/FindbySoSaoandDanhmucWithDiscount")
	public List<SanPham> findSanPhamByDandMucAndRatingWithDiscount(@RequestParam("id") String id,@RequestParam("sosao") int sosao)
	{
		return SanPhamService.findSanPhamByDandMucAndRatingWithGG(id,sosao);
	}
	
	// Tìm sản phẩm theo tên và danh mục và số sao (rating) không có khuyến mãi:
	@GetMapping("Product/FindbySoSaoandDanhmucandNameWithDiscount")
	public List<SanPham> findSanPhamByTenAndDandMucAndRatingWithDiscount(@RequestParam("name") String name,@RequestParam("id") String id,@RequestParam("sosao") int sosao)
	{
		return SanPhamService.findSanPhamByTenAndDandMucAndRatingWithGG(name,id,sosao);
	}
	
    //  end tìm theo danh mục  có giảm giá
	
	
	
	
	// tìm kiếm sản phẩm theo id danh mục
		@GetMapping("Product/FindByKeyWord")
		public List<String> FindByKeyWord(@RequestParam("name")String name) {
			
			
			return SanPhamService.FindProductSuggest(name,PageRequest.of(0, 10));
		}
	
	//tìm sản phẩm theo tên % %
	@GetMapping("Product/FindbyName")
	public List<SanPham> FindSanPhamLikeName(@RequestParam("name") String name) {
		
		return SanPhamService.FindSanPhamLikeName(name);
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
	
	// tìm sản phẩm theo name  ko có giảm giá
	@GetMapping("Product/findSanPhamByTenWithOutGG")
	public List<SanPham> findSanPhamByTenWithOutGG(@RequestParam("name") String name) {
		return SanPhamService.FindSanPhamByNameWithoutDiscount(name);
	}
	// tìm sản phẩm theo  danh mục ko có giảm giá
	@GetMapping("Product/findSanPhamByDandMucAndWithOutGG")
	public List<SanPham> findSanPhamByDandMucAndWithOutGG(@RequestParam("id") String id) {
		return SanPhamService.FindSanPhamByDanhmucWithoutDiscount(id);
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
		public List<SanPham> FindbyPrice(@RequestParam("price1")Long Default1, @RequestParam("price2")Long Default2) {
			return SanPhamService.FindSanPhamByGiaDefault(Default1, Default2);
		}
		
		// end tìm theo giá
		
		// tìm theo giá nhỏ hơn
		@GetMapping("Product/FindbyPriceLess")
		public List<SanPham> FindbyPriceLess(@RequestParam("price")Long Default) {
			return SanPhamService.FindSanPhamByPriceLESS(Default);
		}
		
		@GetMapping("Product/FindByPriceLessAndCategory")
		public List<SanPham> findByPriceAndCategory(@RequestParam("price") Long price,
		                                            @RequestParam("category") String category) {
		    return SanPhamService.findSanPhamByPriceLessHaveDanhMuc(price, category);
		}
		
		
		@GetMapping("Product/FindByPriceLessAndText")
		public List<SanPham> findByPriceAndText(@RequestParam("price") Long price,
		                                        @RequestParam("text") String text) {
		    return SanPhamService.findSanPhamByPriceLessHaveText(price, text);
		}
		
		@GetMapping("Product/FindByPriceLessAndPromotion")
		public List<SanPham> findByPriceAndPromotion(@RequestParam("price") Long price) {
		    return SanPhamService.findSanPhamByPriceLessHaveDiscount(price);
		}
		
		@GetMapping("Product/FindByPriceLessAndRating")
		public List<SanPham> findByPriceAndRating(@RequestParam("price") Long price,
		                                          @RequestParam("rating") int rating) {
		    return SanPhamService.findSanPhamByPriceLessHaveSosao(price, rating);
		}
		
		@GetMapping("Product/FindByPriceLessAndCategoryAndText")
		public List<SanPham> findByPriceCategoryAndText(@RequestParam("price") Long price,
		                                                @RequestParam("category") String category,
		                                                @RequestParam("text") String text) {
		    return SanPhamService.findSanPhamByPriceLessHaveDanhMucAndText(price, category, text);
		}
		
		@GetMapping("Product/FindByPriceLessAndCategoryAndPromotion")
		public List<SanPham> findByPriceCategoryAndPromotion(@RequestParam("price") Long price,
		                                                     @RequestParam("category") String category) {
		    return SanPhamService.findSanPhamByPriceLessHaveDanhMucAndDiscount(price, category);
		}

		@GetMapping("Product/FindByPriceLessAndCategoryAndRating")
		public List<SanPham> findByPriceCategoryAndRating(@RequestParam("price") Long price,
		                                                  @RequestParam("category") String category,
		                                                  @RequestParam("rating") int rating) {
		    return SanPhamService.findSanPhamByPriceLessHaveDanhMucAndSosao(price, category, rating);
		}

		@GetMapping("Product/FindByPriceLessAndTextAndPromotion")
		public List<SanPham> findByPriceTextAndPromotion(@RequestParam("price") Long price,
		                                                 @RequestParam("text") String text) {
		    return SanPhamService.findSanPhamByPriceLessHaveTextAndDiscount(price, text);
		}

		@GetMapping("Product/FindByPriceLessAndTextAndRating")
		public List<SanPham> findByPriceTextAndRating(@RequestParam("price") Long price,
		                                              @RequestParam("text") String text,
		                                              @RequestParam("rating") int rating) {
		    return SanPhamService.findSanPhamByPriceLessHaveTextAndSosao(price, text, rating);
		}

		@GetMapping("Product/FindByPriceLessAndPromotionAndRating")
		public List<SanPham> findByPricePromotionAndRating(@RequestParam("price") Long price,
		                                                   @RequestParam("rating") int rating) {
		    return SanPhamService.findSanPhamByPriceLessHaveDiscountAndSosao(price, rating);
		}

		@GetMapping("Product/FindByPriceLessAndCategoryAndTextAndPromotion")
		public List<SanPham> findByPriceCategoryTextAndPromotion(@RequestParam("price") Long price,
		                                                         @RequestParam("category") String category,
		                                                         @RequestParam("text") String text) {
		    return SanPhamService.findSanPhamByPriceLessHaveDanhMucAndTextAndDiscount(price, category, text);
		}

		@GetMapping("Product/FindByPriceLessAndCategoryAndTextAndRating")
		public List<SanPham> findByPriceCategoryTextAndRating(@RequestParam("price") Long price,
		                                                      @RequestParam("category") String category,
		                                                      @RequestParam("text") String text,
		                                                      @RequestParam("rating") int rating) {
		    return SanPhamService.findSanPhamByPriceLessHaveDanhMucAndTextAndSosao(price, category, text, rating);
		}

		@GetMapping("Product/FindByPriceLessAndCategoryAndPromotionAndRating")
		public List<SanPham> findByPriceCategoryPromotionAndRating(@RequestParam("price") Long price,
		                                                           @RequestParam("category") String category,
		                                                           @RequestParam("rating") int rating) {
		    return SanPhamService.findSanPhamByPriceLessHaveDanhMucAndDiscountAndSosao(price, category, rating);
		}

		@GetMapping("Product/FindByPriceLessAndTextAndPromotionAndRating")
		public List<SanPham> findByPriceTextPromotionAndRating(@RequestParam("price") Long price,
		                                                       @RequestParam("text") String text,
		                                                       @RequestParam("rating") int rating) {
		    return SanPhamService.findSanPhamByPriceLessHaveTextAndDiscountAndSosao(price, text, rating);
		}

		@GetMapping("Product/FindByAllConditions")
		public List<SanPham> findByAllConditions(@RequestParam("price") Long price,
		                                         @RequestParam("category") String category,
		                                         @RequestParam("text") String text,
		                                         @RequestParam("rating") int rating) {
		    return SanPhamService.findSanPhamByAllConditions(price, category, text, rating);
		}
		
		
		// end tìm theo giá nhỏ hơn
		
		// start tìm theo giá lớn hơn
		
		
		@GetMapping("Product/FindbyPriceMore")
		public List<SanPham> FindbyPriceMore(@RequestParam("price")Long Default) {
			return SanPhamService.FindSanPhamByPriceMORE(Default);
		}
		
		// end start tìm theo giá lớn hơn
		
		// API cho tìm sản phẩm với giảm giá
		
			
		 @GetMapping("/FindSanPhamByPriceDefaultAndDanhMucWithDiscount")
		    public List<SanPham> findByPriceAndCategoryWithDiscount(@RequestParam Long Default1, @RequestParam Long Default2, @RequestParam String danhmuc) {
		        return SanPhamService.findSanPhamByPriceDefaultAndDanhMucAndDiscount(Default1, Default2, danhmuc);
		    }

		    // API tìm sản phẩm theo text với giảm giá
		    @GetMapping("/FindSanPhamByPriceDefaultAndTextWithDiscount")
		    public List<SanPham> findByPriceAndTextWithDiscount(@RequestParam Long Default1, @RequestParam Long Default2, @RequestParam String text) {
		        return SanPhamService.findSanPhamByPriceDefaultAndTextAndDiscount(Default1, Default2, text);
		    }

		    // API tìm sản phẩm theo sao với giảm giá
		    @GetMapping("/FindSanPhamByPriceDefaultAndSosaoWithDiscount")
		    public List<SanPham> findByPriceAndSosaoWithDiscount(@RequestParam Long Default1, @RequestParam Long Default2, @RequestParam int sosao) {
		        return SanPhamService.findSanPhamByPriceDefaultAndDiscountAndSosao(Default1, Default2, sosao);
		    }

		    // API tìm sản phẩm theo tên và sao với giảm giá
		    @GetMapping("/FindSanPhamByPriceDefaultAndTextAndSosaoWithDiscount")
		    public List<SanPham> findByPriceAndTextAndSosaoWithDiscount(@RequestParam Long Default1, @RequestParam Long Default2, @RequestParam String text, @RequestParam int sosao) {
		        return SanPhamService.findSanPhamByPriceDefaultAndTextAndDiscountAndSosao(Default1, Default2, text, sosao);
		    }

		    // API tìm sản phẩm theo tên và danh mục với giảm giá
		    @GetMapping("/FindSanPhamByPriceDefaultAndDanhMucAndTextWithDiscount")
		    public List<SanPham> findByPriceAndCategoryAndTextWithDiscount(@RequestParam Long Default1, @RequestParam Long Default2, @RequestParam String danhmuc, @RequestParam String text) {
		        return SanPhamService.findSanPhamByPriceDefaultAndDanhMucAndTextAndDiscount(Default1, Default2, danhmuc, text);
		    }

		    // API tìm sản phẩm theo danh mục và sao với giảm giá
		    @GetMapping("/FindSanPhamByPriceDefaultAndDanhMucAndSosaoWithDiscount")
		    public List<SanPham> findByPriceAndCategoryAndSosaoWithDiscount(@RequestParam Long Default1, @RequestParam Long Default2, @RequestParam String danhmuc, @RequestParam int sosao) {
		        return SanPhamService.findSanPhamByPriceDefaultAndDanhMucAndDiscountAndSosao(Default1, Default2, danhmuc, sosao);
		    }

		    // API tìm sản phẩm theo tất cả các điều kiện với giảm giá
		    @GetMapping("/FindSanPhamByPriceDefaultAndDanhMucAndTextAndSosaoWithDiscount")
		    public List<SanPham> findByPriceAndAllConditionsWithDiscount(@RequestParam Long Default1, @RequestParam Long Default2, @RequestParam String danhmuc, @RequestParam String text, @RequestParam int sosao) {
		        return SanPhamService.findSanPhamByAllConditionsWithPriceDefault(Default1, Default2, danhmuc, text, sosao);
		    }

		    // API tìm sản phẩm không có bộ lọc nào (chỉ có giảm giá)
		    @GetMapping("/FindSanPhamByPriceDefaultAndDiscount")
		    public List<SanPham> findByPriceWithDiscount(@RequestParam Long Default1, @RequestParam Long Default2) {
		        return SanPhamService.findSanPhamByPriceDefaultAndDiscount(Default1, Default2);
		    }

		

	

		
		// API cho tìm sản phẩm với ko giảm giá
		
		@GetMapping("Product/FindSanPhamByPriceDefaultAndDanhMuc")
	    public List<SanPham> findSanPhamByPriceDefaultAndDanhMuc(
	        @RequestParam("Default1") Long Default1,
	        @RequestParam("Default2") Long Default2,
	        @RequestParam("danhmuc") String danhmuc) {
	        return SanPhamService.findSanPhamByPriceDefaultAndDanhMuc(Default1, Default2, danhmuc);
	    }

	    // Tìm sản phẩm theo giá và tên (text)
	    @GetMapping("Product/FindSanPhamByPriceDefaultAndText")
	    public List<SanPham> findSanPhamByPriceDefaultAndText(
	        @RequestParam("Default1") Long Default1,
	        @RequestParam("Default2") Long Default2,
	        @RequestParam("text") String text) {
	        return SanPhamService.findSanPhamByPriceDefaultAndText(Default1, Default2, text);
	    }

	    // Tìm sản phẩm theo giá và sao
	    @GetMapping("Product/FindSanPhamByPriceDefaultAndSosao")
	    public List<SanPham> findSanPhamByPriceDefaultAndSosao(
	        @RequestParam("Default1") Long Default1,
	        @RequestParam("Default2") Long Default2,
	        @RequestParam("sosao") int sosao) {
	        return SanPhamService.findSanPhamByPriceDefaultAndSosao(Default1, Default2, sosao);
	    }

	    // Tìm sản phẩm theo giá, tên và sao
	    @GetMapping("Product/FindSanPhamByPriceDefaultAndTextAndSosao")
	    public List<SanPham> findSanPhamByPriceDefaultAndTextAndSosao(
	        @RequestParam("Default1") Long Default1,
	        @RequestParam("Default2") Long Default2,
	        @RequestParam("text") String text,
	        @RequestParam("sosao") int sosao) {
	        return SanPhamService.findSanPhamByPriceDefaultAndTextAndSosao(Default1, Default2, text, sosao);
	    }

	    // Tìm sản phẩm theo giá, danh mục và tên
	    @GetMapping("Product/FindSanPhamByPriceDefaultAndDanhMucAndText")
	    public List<SanPham> findSanPhamByPriceDefaultAndDanhMucAndText(
	        @RequestParam("Default1") Long Default1,
	        @RequestParam("Default2") Long Default2,
	        @RequestParam("danhmuc") String danhmuc,
	        @RequestParam("text") String text) {
	        return SanPhamService.findSanPhamByPriceDefaultAndDanhMucAndText(Default1, Default2, danhmuc, text);
	    }

	    // Tìm sản phẩm theo giá, danh mục và sao
	    @GetMapping("Product/FindSanPhamByPriceDefaultAndDanhMucAndSosao")
	    public List<SanPham> findSanPhamByPriceDefaultAndDanhMucAndSosao(
	        @RequestParam("Default1") Long Default1,
	        @RequestParam("Default2") Long Default2,
	        @RequestParam("danhmuc") String danhmuc,
	        @RequestParam("sosao") int sosao) {
	        return SanPhamService.findSanPhamByPriceDefaultAndDanhMucAndSosao(Default1, Default2, danhmuc, sosao);
	    }

	    // Tìm sản phẩm theo giá, danh mục, tên và sao
	    @GetMapping("/FindSanPhamByPriceDefaultAndDanhMucAndTextAndSosao")
	    public List<SanPham> findSanPhamByPriceDefaultAndDanhMucAndTextAndSosao(
	        @RequestParam("Default1") Long Default1,
	        @RequestParam("Default2") Long Default2,
	        @RequestParam("danhmuc") String danhmuc,
	        @RequestParam("text") String text,
	        @RequestParam("sosao") int sosao) {
	        return SanPhamService.findSanPhamByPriceDefaultAndDanhMucAndTextAndSosao(Default1, Default2, danhmuc, text, sosao);
	    }

	    // Tìm sản phẩm theo giá không có điều kiện nào khác
	    @GetMapping("Product/FindSanPhamByPriceDefault")
	    public List<SanPham> findSanPhamByPriceDefault(
	        @RequestParam("Default1") Long Default1,
	        @RequestParam("Default2") Long Default2) {
	        return SanPhamService.FindSanPhamByGiaDefault(Default1, Default2);
	    }
		
		// tìm sản phẩm theo số sao và tên có gg
		@GetMapping("Product/FindSanPhamBySoSaoAndNameHaveDisCount")
		public List<SanPham> FindSanPhamBySoSaoAndNameHaveDisCount(@RequestParam("sosao")int sosao,@RequestParam("name")String name) {
			return SanPhamService.FindSanPhamBySoSaoAndNameHaveDisCount(sosao, name);
		}
		// tìm sản phẩm theo số sao và danh mục có gg
		@GetMapping("Product/FindSanPhamBySoSaoAndDanhMucHaveDisCount")
		public List<SanPham> FindSanPhamBySoSaoAndDanhMucHaveDisCount(@RequestParam("sosao")int sosao,@RequestParam("id")String id) {
			return SanPhamService.FindSanPhamBySoSaoAndDanhMucHaveDisCount(sosao, id);
		}
		// tìm sản phẩm theo số sao và danh mục và name có gg
		@GetMapping("Product/FindSanPhamBySoSaoAndDanhMucAndNameHaveDisCount")
		public List<SanPham> FindSanPhamBySoSaoAndDanhMucAndNameHaveDisCount(@RequestParam("sosao")int sosao,@RequestParam("id")String id,@RequestParam("name")String name) {
			return SanPhamService.FindSanPhamBySoSaoAndDanhMucAndNameHaveDisCount(sosao, id, name);
		}
		// tìm sản phẩm theo số sao và tên 
		@GetMapping("Product/FindSanPhamBySoSaoAndName")
		public List<SanPham> FindSanPhamBySoSaoAndName(@RequestParam("sosao")int sosao,@RequestParam("name")String name) {
			return SanPhamService.FindSanPhamBySoSaoAndName(sosao, name);
		}
		// tìm sản phẩm theo số sao và danh mục 
		@GetMapping("Product/FindSanPhamBySoSaoAndDanhMuc")
		public List<SanPham> FindSanPhamBySoSaoAndDanhMuc(@RequestParam("sosao")int sosao,@RequestParam("id")String id) {
			return SanPhamService.FindSanPhamBySoSaoAndDanhMuc(sosao, id);
		}
		// tìm sản phẩm theo số sao và danh mục và name 
		@GetMapping("Product/FindSanPhamBySoSaoAndDanhMucAndName")
		public List<SanPham> FindSanPhamBySoSaoAndDanhMucAndName(@RequestParam("sosao")int sosao,@RequestParam("id")String id,@RequestParam("name")String name) {
			return SanPhamService.FindSanPhamBySoSaoAndDanhMucAndName(sosao, id, name);
		}
		
		@GetMapping("Product/FindSanPhamBySoSaoHaveDiscount")
		public List<SanPham> FindSanPhamBySoSaoHaveDiscount(@RequestParam("sosao")int sosao) {
			return SanPhamService.FindSanPhamBySoSaoHaveDiscount(sosao);
		}
		
//                          start  tìm theo 5 SAO
		
		@GetMapping("Product/findSanPhamBySoSaoEqual5AndNameHaveDisCount")
		public List<SanPham> findSanPhamBySoSaoEqual5AndNameHaveDisCount(@RequestParam("name")String name) {
			return SanPhamService.findSanPhamBySoSaoEqual5AndNameHaveDisCount(name);
		}
		
		@GetMapping("Product/findSanPhamBySoSaoEqual5AndDanhMucHaveDisCount")
		public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucHaveDisCount(@RequestParam("id")String id) {
			
			return SanPhamService.findSanPhamBySoSaoEqual5AndDanhMucHaveDisCount(id);
		}
		
		@GetMapping("Product/findSanPhamBySoSaoEqual5AndDanhMucAndNameHaveDisCount")
		public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucAndNameHaveDisCount(@RequestParam("id")String id,@RequestParam("name")String name) {
			return SanPhamService.findSanPhamBySoSaoEqual5AndDanhMucAndNameHaveDisCount(id, name);
		}
		
		@GetMapping("Product/findSanPhamBySoSaoEqual5AndName")
		public List<SanPham> findSanPhamBySoSaoEqual5AndName(@RequestParam("name")String name) {
			return SanPhamService.findSanPhamBySoSaoEqual5AndName(name);
		}
		
		@GetMapping("Product/findSanPhamBySoSaoEqual5AndDanhMuc")
		public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMuc(@RequestParam("id")String id) {
			return SanPhamService.findSanPhamBySoSaoEqual5AndDanhMuc(id);
		}
		
		@GetMapping("Product/findSanPhamBySoSaoEqual5AndDanhMucAndName")
		public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucAndName(@RequestParam("id")String id,@RequestParam("name")String name) {
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
			System.out.println("id"+id);
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
