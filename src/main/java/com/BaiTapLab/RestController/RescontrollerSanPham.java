package com.BaiTapLab.RestController;

import java.time.LocalDate;
import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.format.TextStyle;
import java.time.temporal.ChronoField;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.DTO.HinhAnhDTO;
import com.BaiTapLab.DTO.SanPhamDTO;
import com.BaiTapLab.DTO.SanPhamDTO2;
import com.BaiTapLab.Entity.DanhMuc;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Repository.DanhmucRepository;
import com.BaiTapLab.Repository.SanphamRepository;
import com.BaiTapLab.Service.SanPhamService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RescontrollerSanPham {

	@Autowired
	SanPhamService SanPhamService;
	@Autowired
	SanphamRepository sanphamRepository;
	@Autowired
	DanhmucRepository DanhmucRepository;

	@GetMapping("Product/getproductsHaveBeenApproved")
	public List<Map<String, Object>> getsanphamsBeenApproved() {
		List<Object[]> listtempt = sanphamRepository.getproductshavebeenApproved();
		List<Map<String, Object>> listtoreturn = MapToData(listtempt);
		return listtoreturn;
	}
	@GetMapping("Product/getproductsHaventBeenApproved")
	public List<Map<String, Object>> getsanphamsHaventBeenApproved() {
		List<Object[]> listtempt = sanphamRepository.getproductshavebeenNotApproved();
		List<Map<String, Object>> listtoreturn = MapToData(listtempt);
		return listtoreturn;
	}
	@GetMapping("Product/getproductsHaveBeenNotApproved")
	public List<Map<String, Object>> getsanphamsHaventBeenNotApproved() {
		List<Object[]> listtempt = sanphamRepository.getproductshaventbeenApproved();
		List<Map<String, Object>> listtoreturn = MapToData(listtempt);
		return listtoreturn;
	}

	public List<Map<String, Object>> MapToData(List<Object[]> results) {
		List<Map<String, Object>> sanPhamList = new ArrayList<>();
		for (Object[] row : results) {
			Map<String, Object> sanPham = new HashMap<>();
			sanPham.put("san_phamId", row[0]);
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
			sanPham.put("ghi_chu", row[18]);
			sanPham.put("accountid", row[19]);
		
			sanPhamList.add(sanPham);
		}

		return sanPhamList;
	}

	public static Month parseMonth(CharSequence text, TextStyle style, Locale locale) {
		DateTimeFormatter fmt = new DateTimeFormatterBuilder().appendText(ChronoField.MONTH_OF_YEAR, style)
				.toFormatter(locale);
		return Month.from(fmt.parse(text));
	}

	@GetMapping("Product/getsp23")
	public List<Object[]> getsp() {
		Month now = LocalDate.now().getMonth();

		int nowyear = LocalDate.now().getYear();
		List<Object[]> list = sanphamRepository.FindBySanPhamTopSellByMonth(now.getValue(), nowyear, "Đã giao");
		return list;
	}

	@GetMapping("FindBySanPhamTopSellByMonth")
	public List<Map<String, Object>> FindBySanPhamTopSellByMonth() {
		Month now = LocalDate.now().getMonth();

		int nowyear = LocalDate.now().getYear();
		List<Object[]> results = sanphamRepository.findbestsellbymonththisyear(now.getValue(), nowyear);
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

	// find Full sản phẩm theo thương hiệu tối ưu
	@GetMapping("Product/FindBythuonghieu")
	public List<Map<String, Object>> findSanPhamThuongHieuID(@RequestParam("id") String id) {

		List<Object[]> results = SanPhamService.findSanPhamThuongHieuID(id);

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

	// find Full sản phẩm theo danh muc tối ưu
	@GetMapping("Product/FindByCategory")
	public List<Map<String, Object>> FindSanPhamByDanhMucIDWithOutGGfull(@RequestParam("id") String id) {

		List<Object[]> results = SanPhamService.findSanPhamByDMId(id);

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

	@GetMapping("Product/Getsanphamname")
	public List<Map<String, Object>> getSanPhamNames() {

		List<Object[]> results = sanphamRepository.findSanphamonlyname(PageRequest.of(0, 10));

		List<Map<String, Object>> sanPhamList = new ArrayList<>();

		for (Object[] row : results) {
			Map<String, Object> sanPham = new HashMap<>();
			sanPham.put("san_phamId", row[0]);
			sanPham.put("ten_san_pham", row[1]);
			sanPhamList.add(sanPham);
		}
		return sanPhamList;
	}

	// find full sản phẩm this week
	@GetMapping("FindFullListProductThisWEEK")
	public List<Map<String, Object>> FindFullListProductThisWEEK() {

		List<Object[]> results = SanPhamService.FindProductThisWeekfull();

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

	// find full sản phẩm Discount
	@GetMapping("FindFullListProductDiscount")
	public List<Map<String, Object>> FindFullListProductDiscount() {

		List<Object[]> results = SanPhamService.FindProductDiscountTOP10full();

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

	@GetMapping("FindProductSimilarTOP10")
	public List<Map<String, Object>> FindListProductSimilar(@RequestParam("id") String SanPhamID) {
		DanhMuc ID_Danhmuc = DanhmucRepository.findDanhMucBySanPhamId(SanPhamID);
		System.out.println("sda" + ID_Danhmuc.getDanh_mucId());
		List<Object[]> results = SanPhamService.finListdSanPhamById(ID_Danhmuc.getDanh_mucId(), PageRequest.of(0, 10));

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

	@GetMapping("FindProductThisWeekTOP100")
	public List<Map<String, Object>> FindProductThisWeekTOP10000() {
		List<Object[]> results = SanPhamService.findSanPhamPhanTramGiamGia(PageRequest.of(0, 10));
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

	@GetMapping("FindProducthaspopupid")
	public List<SanPhamDTO2> FindProducthaspopupid() {
		return SanPhamService.FindProducthaspopupid().stream()
				.map(p -> 	new SanPhamDTO2(p.getSan_phamId(), p.getTen_san_pham(),
						p.getHinhanh().stream().map(h-> new HinhAnhDTO(h.getId(),h.getTen_hinh())).collect(Collectors.toList()),
						p.getPhantram_GG(),p.getGia_goc(),p.getGia_km()
						)).collect(Collectors.toList());
	}

	@GetMapping("FindSanPhamByDTO")
	public List<SanPhamDTO> findwithdto() {
		return SanPhamService.findwithdto();
	}

	@GetMapping("findProductnotValid")
	public List<SanPham> findproductnotvalid() {
		return SanPhamService.findProductnotvalid();
	}

	@GetMapping("findProductValid")
	public List<SanPham> findproductvalid() {
		return SanPhamService.findProductvalid();
	}

	@PostMapping("checkifproductsarevalid")
	public List<SanPham> checkIfProductIsValid(@RequestParam List<String> selectedproductid) {
		List<SanPham> producthaserror = new ArrayList<SanPham>();
		List<SanPham> products = new ArrayList<SanPham>();
		try {
			for (String string : selectedproductid) {
				SanPham findsp = sanphamRepository.findSanPhamByIdIfItsValid(string);
				products.add(findsp);
			}
			if(products.size()>0){
				for (SanPham sanPham : products) {
					if (sanPham.getSo_luong() <= 0 || sanPham.getHoat_dong().equals("Off")
							|| sanPham.getTrang_thai_xoa() != null || sanPham.getDanhmuc().getTrang_thai_xoa() != null
							|| sanPham.getDanhmuc().getHoat_dong().equals("Off")
							|| sanPham.getThuonghieu().getTrang_thai_xoa() != null
							|| sanPham.getThuonghieu().getHoat_dong().equals("Off")) {
						producthaserror.add(sanPham);
					}
				}	
			}
		
		} catch (Exception e) {
			e.printStackTrace();
		}

		return producthaserror;
	}

//	@GetMapping("FindProductThisWeek")
//	public List<SanPham> FindProductThisWeek() {
//
//		return SanPhamService.FindProductThisWeek();
//	}

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
	public List<Map<String, Object>> FindProductTopSell() {

		List<Object[]> results = SanPhamService.FindProductTopSell(PageRequest.of(0, 10));

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

	@GetMapping("FindProductThisWeek")
	public List<Map<String, Object>> ngay7() {

		List<Object[]> results = SanPhamService.findSanPhamLast7DaysTOP100(PageRequest.of(0, 10));

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

	// start tìm theo danh mục không có giảm giá

	// tìm theo danh muc KHÔNG có khuyến mãi

	// tìm kiếm theo tên và danh mục và ko có khuyến mãi

	@GetMapping("Product/FindbyNameandDanhmuc")
	public List<SanPham> FindbyNameandDanhmucWithOutGG(@RequestParam("name") String name,
			@RequestParam("id") String id) {

		return SanPhamService.findSanPhamByTenAndDandMucAndWithOutGG(name, id);
	}
	// Tìm sản phẩm theo danh mục và số sao (rating) không có khuyến mãi:

	@GetMapping("Product/FindbySoSaoandDanhmuc")
	public List<SanPham> findSanPhamByDandMucAndRatingWithOutGG(@RequestParam("id") String id,
			@RequestParam("sosao") int sosao) {
		return SanPhamService.findSanPhamByDandMucAndRatingWithOutGG(id, sosao);
	}

	// Tìm sản phẩm theo tên và danh mục và số sao (rating) không có khuyến mãi:
	@GetMapping("Product/FindbySoSaoandDanhmucandName")
	public List<SanPham> findSanPhamByTenAndDandMucAndRatingWithOutGG(@RequestParam("name") String name,
			@RequestParam("id") String id, @RequestParam("sosao") int sosao) {
		return SanPhamService.findSanPhamByTenAndDandMucAndRatingWithOutGG(name, id, sosao);
	}

	// end tìm theo danh mục không có giảm giá

	// start tìm theo danh mục có giảm giá

	// tìm kiếm sản phẩm theo id danh mục
	@GetMapping("Product/FindByCategoryWithDiscount")
	public List<SanPham> FindSanPhamByDanhMucIDWithDiscount(@RequestParam("id") String id) {

		return SanPhamService.findSanPhamByDandMucAndGG(id);
	}

	// tìm kiếm theo tên và danh mục và ko có khuyến mãi

	@GetMapping("Product/FindbyNameandDanhmucWithDiscount2")
	public List<SanPham> FindbyNameandDanhmucWithDiscount2(@RequestParam("name") String name,
			@RequestParam("id") String id) {

		return SanPhamService.findSanPhanByTenAndDanhMuc(name, id);
	}
	// Tìm sản phẩm theo danh mục và số sao (rating) không có khuyến mãi:

	@GetMapping("Product/FindbySoSaoandDanhmucWithDiscount")
	public List<SanPham> findSanPhamByDandMucAndRatingWithDiscount(@RequestParam("id") String id,
			@RequestParam("sosao") int sosao) {
		return SanPhamService.findSanPhamByDandMucAndRatingWithGG(id, sosao);
	}

	// Tìm sản phẩm theo tên và danh mục và số sao (rating) không có khuyến mãi:
	@GetMapping("Product/FindbySoSaoandDanhmucandNameWithDiscount")
	public List<SanPham> findSanPhamByTenAndDandMucAndRatingWithDiscount(@RequestParam("name") String name,
			@RequestParam("id") String id, @RequestParam("sosao") int sosao) {
		return SanPhamService.findSanPhamByTenAndDandMucAndRatingWithGG(name, id, sosao);
	}

	// end tìm theo danh mục có giảm giá

	// tìm kiếm sản phẩm theo id danh mục
	@GetMapping("Product/FindByKeyWord")
	public List<String> FindByKeyWord(@RequestParam("name") String name) {

		return SanPhamService.FindProductSuggest(name, PageRequest.of(0, 10));
	}

	// tìm sản phẩm theo tên % %
	@GetMapping("Product/FindbyName")
	public List<Map<String, Object>> findbynamelike(@RequestParam("name") String name) {

		List<Object[]> results = sanphamRepository.findbynamelike(name);

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

//	public List<SanPham> FindSanPhamLikeName(@RequestParam("name") String name) {
//
//		return SanPhamService.FindSanPhamLikeName(name);
//	}

	@GetMapping("Product/FindbyNamenew")
	public List<Map<String, Object>> findbynamenew(@RequestParam("name") String name) {

		List<Object[]> results = sanphamRepository.findbyname(name);

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

	@GetMapping("Product/FindByPriceLessAndCategory")
	public List<SanPham> findByPriceAndCategory(@RequestParam("price") Long price,
			@RequestParam("category") String category) {
		return SanPhamService.findSanPhamByPriceLessHaveDanhMuc(price, category);
	}

	@GetMapping("Product/FindByPriceLessAndText")
	public List<SanPham> findByPriceAndText(@RequestParam("price") Long price, @RequestParam("text") String text) {
		return SanPhamService.findSanPhamByPriceLessHaveText(price, text);
	}

	@GetMapping("Product/FindByPriceLessAndPromotion")
	public List<SanPham> findByPriceAndPromotion(@RequestParam("price") Long price) {
		return SanPhamService.findSanPhamByPriceLessHaveDiscount(price);
	}

	@GetMapping("Product/FindByPriceLessAndRating")
	public List<SanPham> findByPriceAndRating(@RequestParam("price") Long price, @RequestParam("rating") int rating) {
		return SanPhamService.findSanPhamByPriceLessHaveSosao(price, rating);
	}

	@GetMapping("Product/FindByPriceLessAndCategoryAndText")
	public List<SanPham> findByPriceCategoryAndText(@RequestParam("price") Long price,
			@RequestParam("category") String category, @RequestParam("text") String text) {
		return SanPhamService.findSanPhamByPriceLessHaveDanhMucAndText(price, category, text);
	}

	@GetMapping("Product/FindByPriceLessAndCategoryAndPromotion")
	public List<SanPham> findByPriceCategoryAndPromotion(@RequestParam("price") Long price,
			@RequestParam("category") String category) {
		return SanPhamService.findSanPhamByPriceLessHaveDanhMucAndDiscount(price, category);
	}

	@GetMapping("Product/FindByPriceLessAndCategoryAndRating")
	public List<SanPham> findByPriceCategoryAndRating(@RequestParam("price") Long price,
			@RequestParam("category") String category, @RequestParam("rating") int rating) {
		return SanPhamService.findSanPhamByPriceLessHaveDanhMucAndSosao(price, category, rating);
	}

	@GetMapping("Product/FindByPriceLessAndTextAndPromotion")
	public List<SanPham> findByPriceTextAndPromotion(@RequestParam("price") Long price,
			@RequestParam("text") String text) {
		return SanPhamService.findSanPhamByPriceLessHaveTextAndDiscount(price, text);
	}

	@GetMapping("Product/FindByPriceLessAndTextAndRating")
	public List<SanPham> findByPriceTextAndRating(@RequestParam("price") Long price, @RequestParam("text") String text,
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
			@RequestParam("category") String category, @RequestParam("text") String text) {
		return SanPhamService.findSanPhamByPriceLessHaveDanhMucAndTextAndDiscount(price, category, text);
	}

	@GetMapping("Product/FindByPriceLessAndCategoryAndTextAndRating")
	public List<SanPham> findByPriceCategoryTextAndRating(@RequestParam("price") Long price,
			@RequestParam("category") String category, @RequestParam("text") String text,
			@RequestParam("rating") int rating) {
		return SanPhamService.findSanPhamByPriceLessHaveDanhMucAndTextAndSosao(price, category, text, rating);
	}

	@GetMapping("Product/FindByPriceLessAndCategoryAndPromotionAndRating")
	public List<SanPham> findByPriceCategoryPromotionAndRating(@RequestParam("price") Long price,
			@RequestParam("category") String category, @RequestParam("rating") int rating) {
		return SanPhamService.findSanPhamByPriceLessHaveDanhMucAndDiscountAndSosao(price, category, rating);
	}

	@GetMapping("Product/FindByPriceLessAndTextAndPromotionAndRating")
	public List<SanPham> findByPriceTextPromotionAndRating(@RequestParam("price") Long price,
			@RequestParam("text") String text, @RequestParam("rating") int rating) {
		return SanPhamService.findSanPhamByPriceLessHaveTextAndDiscountAndSosao(price, text, rating);
	}

	@GetMapping("Product/FindByAllConditions")
	public List<SanPham> findByAllConditions(@RequestParam("price") Long price,
			@RequestParam("category") String category, @RequestParam("text") String text,
			@RequestParam("rating") int rating) {
		return SanPhamService.findSanPhamByAllConditions(price, category, text, rating);
	}

	// end tìm theo giá nhỏ hơn

	// start tìm theo giá lớn hơn

	@GetMapping("Product/FindbyPriceMore")
	public List<SanPham> FindbyPriceMore(@RequestParam("price") Long Default) {
		return SanPhamService.FindSanPhamByPriceMORE(Default);
	}

	// end start tìm theo giá lớn hơn

	// API cho tìm sản phẩm với giảm giá

	@GetMapping("Product/FindSanPhamByPriceDefaultAndDanhMucWithDiscount")
	public List<SanPham> findByPriceAndCategoryWithDiscount(@RequestParam Long Default1, @RequestParam Long Default2,
			@RequestParam String danhmuc) {
		return SanPhamService.findSanPhamByPriceDefaultAndDanhMucAndDiscount(Default1, Default2, danhmuc);
	}

	// API tìm sản phẩm theo text với giảm giá
	@GetMapping("Product/FindSanPhamByPriceDefaultAndTextWithDiscount")
	public List<SanPham> findByPriceAndTextWithDiscount(@RequestParam Long Default1, @RequestParam Long Default2,
			@RequestParam String text) {
		return SanPhamService.findSanPhamByPriceDefaultAndTextAndDiscount(Default1, Default2, text);
	}

	// API tìm sản phẩm theo sao với giảm giá
	@GetMapping("Product/FindSanPhamByPriceDefaultAndSosaoWithDiscount")
	public List<SanPham> findByPriceAndSosaoWithDiscount(@RequestParam Long Default1, @RequestParam Long Default2,
			@RequestParam int sosao) {
		return SanPhamService.findSanPhamByPriceDefaultAndDiscountAndSosao(Default1, Default2, sosao);
	}

	// API tìm sản phẩm theo tên và sao với giảm giá
	@GetMapping("Product/FindSanPhamByPriceDefaultAndTextAndSosaoWithDiscount")
	public List<SanPham> findByPriceAndTextAndSosaoWithDiscount(@RequestParam Long Default1,
			@RequestParam Long Default2, @RequestParam String text, @RequestParam int sosao) {
		return SanPhamService.findSanPhamByPriceDefaultAndTextAndDiscountAndSosao(Default1, Default2, text, sosao);
	}

	// API tìm sản phẩm theo tên và danh mục với giảm giá
	@GetMapping("Product/FindSanPhamByPriceDefaultAndDanhMucAndTextWithDiscount")
	public List<SanPham> findByPriceAndCategoryAndTextWithDiscount(@RequestParam Long Default1,
			@RequestParam Long Default2, @RequestParam String danhmuc, @RequestParam String text) {
		return SanPhamService.findSanPhamByPriceDefaultAndDanhMucAndTextAndDiscount(Default1, Default2, danhmuc, text);
	}

	// API tìm sản phẩm theo danh mục và sao với giảm giá
	@GetMapping("Product/FindSanPhamByPriceDefaultAndDanhMucAndSosaoWithDiscount")
	public List<SanPham> findByPriceAndCategoryAndSosaoWithDiscount(@RequestParam Long Default1,
			@RequestParam Long Default2, @RequestParam String danhmuc, @RequestParam int sosao) {
		return SanPhamService.findSanPhamByPriceDefaultAndDanhMucAndDiscountAndSosao(Default1, Default2, danhmuc,
				sosao);
	}

	// API tìm sản phẩm theo tất cả các điều kiện với giảm giá
	@GetMapping("Product/FindSanPhamByPriceDefaultAndDanhMucAndTextAndSosaoWithDiscount")
	public List<SanPham> findByPriceAndAllConditionsWithDiscount(@RequestParam Long Default1,
			@RequestParam Long Default2, @RequestParam String danhmuc, @RequestParam String text,
			@RequestParam int sosao) {
		return SanPhamService.findSanPhamByAllConditionsWithPriceDefault(Default1, Default2, danhmuc, text, sosao);
	}

	// API tìm sản phẩm không có bộ lọc nào (chỉ có giảm giá)
	@GetMapping("Product/FindSanPhamByPriceDefaultAndDiscount")
	public List<SanPham> findByPriceWithDiscount(@RequestParam Long Default1, @RequestParam Long Default2) {
		return SanPhamService.findSanPhamByPriceDefaultAndDiscount(Default1, Default2);
	}

	// API cho tìm sản phẩm với ko giảm giá

	@GetMapping("Product/FindSanPhamByPriceDefaultAndDanhMuc")
	public List<SanPham> findSanPhamByPriceDefaultAndDanhMuc(@RequestParam("Default1") Long Default1,
			@RequestParam("Default2") Long Default2, @RequestParam("danhmuc") String danhmuc) {
		return SanPhamService.findSanPhamByPriceDefaultAndDanhMuc(Default1, Default2, danhmuc);
	}

	// Tìm sản phẩm theo giá và tên (text)
	@GetMapping("Product/FindSanPhamByPriceDefaultAndText")
	public List<SanPham> findSanPhamByPriceDefaultAndText(@RequestParam("Default1") Long Default1,
			@RequestParam("Default2") Long Default2, @RequestParam("text") String text) {
		return SanPhamService.findSanPhamByPriceDefaultAndText(Default1, Default2, text);
	}

	// Tìm sản phẩm theo giá và sao
	@GetMapping("Product/FindSanPhamByPriceDefaultAndSosao")
	public List<SanPham> findSanPhamByPriceDefaultAndSosao(@RequestParam("Default1") Long Default1,
			@RequestParam("Default2") Long Default2, @RequestParam("sosao") int sosao) {
		return SanPhamService.findSanPhamByPriceDefaultAndSosao(Default1, Default2, sosao);
	}

	// Tìm sản phẩm theo giá, tên và sao
	@GetMapping("Product/FindSanPhamByPriceDefaultAndTextAndSosao")
	public List<SanPham> findSanPhamByPriceDefaultAndTextAndSosao(@RequestParam("Default1") Long Default1,
			@RequestParam("Default2") Long Default2, @RequestParam("text") String text,
			@RequestParam("sosao") int sosao) {
		return SanPhamService.findSanPhamByPriceDefaultAndTextAndSosao(Default1, Default2, text, sosao);
	}

	// Tìm sản phẩm theo giá, danh mục và tên
	@GetMapping("Product/FindSanPhamByPriceDefaultAndDanhMucAndText")
	public List<SanPham> findSanPhamByPriceDefaultAndDanhMucAndText(@RequestParam("Default1") Long Default1,
			@RequestParam("Default2") Long Default2, @RequestParam("danhmuc") String danhmuc,
			@RequestParam("text") String text) {
		return SanPhamService.findSanPhamByPriceDefaultAndDanhMucAndText(Default1, Default2, danhmuc, text);
	}

	// Tìm sản phẩm theo giá, danh mục và sao
	@GetMapping("Product/FindSanPhamByPriceDefaultAndDanhMucAndSosao")
	public List<SanPham> findSanPhamByPriceDefaultAndDanhMucAndSosao(@RequestParam("Default1") Long Default1,
			@RequestParam("Default2") Long Default2, @RequestParam("danhmuc") String danhmuc,
			@RequestParam("sosao") int sosao) {
		return SanPhamService.findSanPhamByPriceDefaultAndDanhMucAndSosao(Default1, Default2, danhmuc, sosao);
	}

	// Tìm sản phẩm theo giá, danh mục, tên và sao
	@GetMapping("Product/FindSanPhamByPriceDefaultAndDanhMucAndTextAndSosao")
	public List<SanPham> findSanPhamByPriceDefaultAndDanhMucAndTextAndSosao(@RequestParam("Default1") Long Default1,
			@RequestParam("Default2") Long Default2, @RequestParam("danhmuc") String danhmuc,
			@RequestParam("text") String text, @RequestParam("sosao") int sosao) {
		return SanPhamService.findSanPhamByPriceDefaultAndDanhMucAndTextAndSosao(Default1, Default2, danhmuc, text,
				sosao);
	}

	// Tìm sản phẩm theo giá không có điều kiện nào khác
	@GetMapping("Product/FindSanPhamByPriceDefault")
	public List<SanPham> findSanPhamByPriceDefault(@RequestParam("Default1") Long Default1,
			@RequestParam("Default2") Long Default2) {
		return SanPhamService.FindSanPhamByGiaDefault(Default1, Default2);
	}

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

	// 1. Tìm sản phẩm theo tên và số sao có giảm giá
	@GetMapping("Product/findBySoSaoAndNameWithDiscountEQUAL5")
	public List<SanPham> findSanPhamBySoSaoEqual5AndNameHaveDiscount(@RequestParam String name) {
		return SanPhamService.findSanPhamBySoSaoEqual5AndNameHaveDiscount(name);
	}

	// 2. Tìm sản phẩm theo danh mục và số sao có giảm giá
	@GetMapping("Product/findBySoSaoAndCategoryWithDiscountEQUAL5")
	public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucHaveDiscount(@RequestParam String danhmuc) {
		return SanPhamService.findSanPhamBySoSaoEqual5AndDanhMucHaveDiscount(danhmuc);
	}

	// 3. Tìm sản phẩm theo danh mục, tên và số sao có giảm giá
	@GetMapping("Product/findBySoSaoAndCategoryAndNameWithDiscountEQUAL5")
	public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucAndNameHaveDiscount(@RequestParam String danhmuc,
			@RequestParam String name) {
		return SanPhamService.findSanPhamBySoSaoEqual5AndDanhMucAndNameHaveDiscount(danhmuc, name);
	}

	// 4. Tìm sản phẩm chỉ có số sao = 5 và có giảm giá
	@GetMapping("Product/findBySoSaoWithDiscountEQUAL5")
	public List<SanPham> findSanPhamBySoSaoEqual5HaveDiscount() {
		return SanPhamService.findSanPhamBySoSaoEqual5HaveDiscount();
	}

	// 5. Tìm sản phẩm giá nhỏ hơn 10,000, số sao = 5 và có giảm giá
	@GetMapping("Product/findBySoSaoAndPriceLessThan10kWithDiscountEQUAL5")
	public List<SanPham> findSanPhamBySoSaoEqual5Less10kHaveDiscount(@RequestParam long price) {
		return SanPhamService.findSanPhamBySoSaoEqual5Less10kHaveDiscount(price);
	}

	// 6. Tìm sản phẩm giá lớn hơn 100,000, số sao = 5 và có giảm giá
	@GetMapping("Product/findBySoSaoAndPriceGreaterThan100kWithDiscountEQUAL5")
	public List<SanPham> findSanPhamBySoSaoEqual5More100kHaveDiscount(@RequestParam long price) {
		return SanPhamService.findSanPhamBySoSaoEqual5More100kHaveDiscount(price);
	}

	// 7. Tìm sản phẩm trong khoảng giá (default), số sao = 5 và có giảm giá
	@GetMapping("Product/findBySoSaoAndPriceRangeWithDiscountEQUAL5")
	public List<SanPham> findSanPhamBySoSaoEqual5DefaultHaveDiscount(@RequestParam long default1,
			@RequestParam long default2) {
		return SanPhamService.findSanPhamBySoSaoEqual5DefaultHaveDiscount(default1, default2);
	}

	// 8. Tìm sản phẩm theo tên và giá nhỏ hơn 10,000, số sao = 5 và có giảm giá
	@GetMapping("Product/findBySoSaoAndNameAndPriceLessThan10kWithDiscountEQUAL5")
	public List<SanPham> findSanPhamBySoSaoAndNameEqual5Less10kHaveDiscount(@RequestParam long price,
			@RequestParam String name) {
		return SanPhamService.findSanPhamBySoSaoAndNameEqual5Less10kHaveDiscount(price, name);
	}

	// 9. Tìm sản phẩm theo tên và giá lớn hơn 100,000, số sao = 5 và có giảm giá
	@GetMapping("Product/findBySoSaoAndNameAndPriceGreaterThan100kWithDiscountEQUAL5")
	public List<SanPham> findSanPhamBySoSaoAndNameEqual5More100kHaveDiscount(@RequestParam long price,
			@RequestParam String name) {
		return SanPhamService.findSanPhamBySoSaoAndNameEqual5More100kHaveDiscount(price, name);
	}

	// 10. Tìm sản phẩm theo danh mục, tên và giá nhỏ hơn 10,000, số sao = 5 và có
	// giảm giá
	@GetMapping("Product/findBySoSaoAndCategoryAndNameAndPriceLessThan10kWithDiscountEQUAL5")
	public List<SanPham> findSanPhamBySoSaoAndNameAndDanhmucEqual5Less10kHaveDiscount(@RequestParam long price,
			@RequestParam String name, @RequestParam String danhmuc) {
		return SanPhamService.findSanPhamBySoSaoAndNameAndDanhmucEqual5Less10kHaveDiscount(price, name, danhmuc);
	}

	// 11. Tìm sản phẩm theo danh mục, tên và giá lớn hơn 100,000, số sao = 5 và có
	// giảm giá
	@GetMapping("Product/findBySoSaoAndCategoryAndNameAndPriceGreaterThan100kWithDiscountEQUAL5")
	public List<SanPham> findSanPhamBySoSaoAndNameAndDanhmucEqual5More100kHaveDiscount(@RequestParam long price,
			@RequestParam String name, @RequestParam String danhmuc) {
		return SanPhamService.findSanPhamBySoSaoAndNameAndDanhmucEqual5More100kHaveDiscount(price, name, danhmuc);
	}

	// 12. Tìm sản phẩm theo tên và khoảng giá (min-max), số sao = 5 và có giảm giá
	@GetMapping("Product/findBySoSaoAndPriceRangeAndNameWithDiscountEQUAL5")
	public List<SanPham> findSanPhamBySoSaoEqual5DefaulAndNameHaveDiscount(@RequestParam long default1,
			@RequestParam long default2, @RequestParam String name) {
		return SanPhamService.findSanPhamBySoSaoEqual5DefaulAndNameHaveDiscount(default1, default2, name);
	}

	// 13. Tìm sản phẩm theo danh mục và khoảng giá (min-max), số sao = 5 và có giảm
	// giá
	@GetMapping("Product/findBySoSaoAndPriceRangeAndCategoryWithDiscountEQUAL5")
	public List<SanPham> findSanPhamBySoSaoEqual5DefaulAndDanhmucHaveDiscount(@RequestParam long default1,
			@RequestParam long default2, @RequestParam String danhmuc) {
		return SanPhamService.findSanPhamBySoSaoEqual5DefaulAndDanhmucHaveDiscount(default1, default2, danhmuc);
	}

	// 14. Tìm sản phẩm theo tên, danh mục và khoảng giá (min-max), số sao = 5 và có
	// giảm giá
	@GetMapping("Product/findBySoSaoAndPriceRangeAndCategoryAndNameWithDiscountEQUAL5")
	public List<SanPham> findSanPhamBySoSaoEqual5DefaulAndDanhmucAndNameHaveDiscount(@RequestParam long default1,
			@RequestParam long default2, @RequestParam String danhmuc, @RequestParam String name) {
		return SanPhamService.findSanPhamBySoSaoEqual5DefaulAndDanhmucAndNameHaveDiscount(default1, default2, danhmuc,
				name);
	}

	// API lấy sản phẩm có 5 sao, giá <= giá chỉ định, trong danh mục chỉ định và có
	// giảm giá
	@GetMapping("Product/findByDanhMucAndPriceLess10kEQUAL5HaveDiscount")
	public List<SanPham> laySanPham5SaoVaDanhMucGiaNhoHonCoGG(@RequestParam long price, @RequestParam String danhmuc) {
		return SanPhamService.laySanPham5SaoVaDanhMucGiaNhoHonCoGG(price, danhmuc);
	}

	// API lấy sản phẩm có 5 sao, giá >= giá chỉ định, trong danh mục chỉ định và có
	// giảm giá
	@GetMapping("Product/findByDanhMucAndPriceMore100kEQUAL5HaveDiscount")
	public List<SanPham> laySanPham5SaoVaDanhMucGiaLonHonCoGG(@RequestParam long price, @RequestParam String danhmuc) {
		return SanPhamService.laySanPham5SaoVaDanhMucGiaLonHonCoGG(price, danhmuc);
	}

	// 15. Tìm sản phẩm chỉ có số sao = 5 (không cần giảm giá)
	@GetMapping("Product/findBySoSaoEQUAL5")
	public List<SanPham> findSanPhamBySoSaoEqual5() {
		return SanPhamService.findSanPhamBySoSaoEqual5();
	}

	// 16. Tìm sản phẩm theo tên và số sao = 5 (không cần giảm giá)
	@GetMapping("Product/findBySoSaoAndNameEQUAL5")
	public List<SanPham> findSanPhamBySoSaoEqual5AndName(@RequestParam String name) {
		return SanPhamService.findSanPhamBySoSaoEqual5AndName(name);
	}

	// 17. Tìm sản phẩm theo danh mục và số sao = 5 (không cần giảm giá)
	@GetMapping("Product/findBySoSaoAndCategoryEQUAL5")
	public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMuc(@RequestParam String danhmuc) {
		return SanPhamService.findSanPhamBySoSaoEqual5AndDanhMuc(danhmuc);
	}

	// 18. Tìm sản phẩm theo danh mục, tên và số sao = 5 (không cần giảm giá)
	@GetMapping("Product/findBySoSaoAndCategoryAndNameEQUAL5")
	public List<SanPham> findSanPhamBySoSaoEqual5AndDanhMucAndName(@RequestParam String danhmuc,
			@RequestParam String name) {
		return SanPhamService.findSanPhamBySoSaoEqual5AndDanhMucAndName(danhmuc, name);
	}

	// 19. Tìm sản phẩm giá nhỏ hơn 10,000 và số sao = 5 (không cần giảm giá)
	@GetMapping("Product/findBySoSaoAndPriceLessThan10kEQUAL5")
	public List<SanPham> findSanPhamBySoSaoEqual5Less10k(@RequestParam long price) {
		return SanPhamService.findSanPhamBySoSaoEqual5Less10k(price);
	}

	// 20. Tìm sản phẩm giá lớn hơn 100,000 và số sao = 5 (không cần giảm giá)
	@GetMapping("Product/findBySoSaoAndPriceGreaterThan100kEQUAL5")
	public List<SanPham> findSanPhamBySoSaoEqual5More100k(@RequestParam long price) {
		return SanPhamService.findSanPhamBySoSaoEqual5More100k(price);
	}

	// 21. Tìm sản phẩm trong khoảng giá (default) và số sao = 5 (không cần giảm
	// giá)
	@GetMapping("Product/findBySoSaoAndPriceRangeEQUAL5")
	public List<SanPham> findSanPhamBySoSaoEqual5Default(@RequestParam long default1, @RequestParam long default2) {
		return SanPhamService.findSanPhamBySoSaoEqual5Default(default1, default2);
	}

	// 22. Tìm sản phẩm theo tên và giá nhỏ hơn 10,000, số sao = 5 (không cần giảm
	// giá)
	@GetMapping("Product/findBySoSaoAndNameAndPriceLessThan10kEQUAL5")
	public List<SanPham> findSanPhamBySoSaoAndNameEqual5Less10k(@RequestParam long price, @RequestParam String name) {
		return SanPhamService.findSanPhamBySoSaoAndNameEqual5Less10k(price, name);
	}

	// 23. Tìm sản phẩm theo tên và giá lớn hơn 100,000, số sao = 5 (không cần giảm
	// giá)
	@GetMapping("Product/findBySoSaoAndNameAndPriceGreaterThan100kEQUAL5")
	public List<SanPham> findSanPhamBySoSaoAndNameEqual5More100k(@RequestParam long price, @RequestParam String name) {
		return SanPhamService.findSanPhamBySoSaoAndNameEqual5More100k(price, name);
	}

	// 24. Tìm sản phẩm theo danh mục, tên và giá nhỏ hơn 10,000, số sao = 5 (không
	// cần giảm giá)
	@GetMapping("Product/findBySoSaoAndCategoryAndNameAndPriceLessThan10kEQUAL5")
	public List<SanPham> findSanPhamBySoSaoAndNameAndDanhmucEqual5Less10k(@RequestParam long price,
			@RequestParam String name, @RequestParam String danhmuc) {
		return SanPhamService.findSanPhamBySoSaoAndNameAndDanhmucEqual5Less10k(price, name, danhmuc);
	}

	// 25. Tìm sản phẩm theo danh mục, tên và giá lớn hơn 100,000, số sao = 5 (không
	// cần giảm giá)
	@GetMapping("Product/findBySoSaoAndCategoryAndNameAndPriceGreaterThan100kEQUAL5")
	public List<SanPham> findSanPhamBySoSaoAndNameAndDanhmucEqual5More100k(@RequestParam long price,
			@RequestParam String name, @RequestParam String danhmuc) {
		return SanPhamService.findSanPhamBySoSaoAndNameAndDanhmucEqual5More100k(price, name, danhmuc);
	}

	// 26. Tìm sản phẩm theo tên và khoảng giá (min-max), số sao = 5 (không cần giảm
	// giá)
	@GetMapping("Product/findBySoSaoAndPriceRangeAndNameEQUAL5")
	public List<SanPham> findSanPhamBySoSaoEqual5DefaultAndName(@RequestParam long default1,
			@RequestParam long default2, @RequestParam String name) {
		return SanPhamService.findSanPhamBySoSaoEqual5DefaultAndName(default1, default2, name);
	}

	// 27. Tìm sản phẩm theo danh mục và khoảng giá (min-max), số sao = 5 (không cần
	// giảm giá)
	@GetMapping("Product/findBySoSaoAndPriceRangeAndCategoryEQUAL5")
	public List<SanPham> findSanPhamBySoSaoEqual5DefaultAndDanhmuc(@RequestParam long default1,
			@RequestParam long default2, @RequestParam String danhmuc) {
		return SanPhamService.findSanPhamBySoSaoEqual5DefaultAndDanhmuc(default1, default2, danhmuc);
	}

	// 28. Tìm sản phẩm theo tên, danh mục và khoảng giá (min-max), số sao = 5
	// (không cần giảm giá)
	@GetMapping("Product/findBySoSaoAndPriceRangeAndCategoryAndNameEQUAL5")
	public List<SanPham> findSanPhamBySoSaoEqual5DefaultAndDanhmucAndName(@RequestParam long default1,
			@RequestParam long default2, @RequestParam String danhmuc, @RequestParam String name) {
		return SanPhamService.findSanPhamBySoSaoEqual5DefaultAndDanhmucAndName(default1, default2, danhmuc, name);
	}

	// API lấy sản phẩm có 5 sao, giá <= giá chỉ định, trong danh mục chỉ định
	@GetMapping("Product/findByDanhMucAndPriceLess10kEQUAL5")
	public List<SanPham> laySanPham5SaoVaDanhMucGiaNhoHon(@RequestParam long price, @RequestParam String danhmuc) {
		return SanPhamService.laySanPham5SaoVaDanhMucGiaNhoHon(price, danhmuc);
	}

	// API lấy sản phẩm có 5 sao, giá >= giá chỉ định, trong danh mục chỉ định
	@GetMapping("Product/findByDanhMucAndPriceMore100kEQUAL5")
	public List<SanPham> laySanPham5SaoVaDanhMucGiaLonHon(@RequestParam long price, @RequestParam String danhmuc) {
		return SanPhamService.laySanPham5SaoVaDanhMucGiaLonHon(price, danhmuc);
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

	// Tìm sản phẩm giá lớn hơn 100k

	// API tìm sản phẩm theo giá lớn hơn
	@GetMapping("Product/FindByPriceMore100k")
	public List<SanPham> findSanPhamByPriceMore(@RequestParam Long price) {
		return SanPhamService.findSanPhamByPriceMore(price);
	}

	// API tìm sản phẩm theo giá lớn hơn và danh mục
	@GetMapping("Product/FindByPriceMore100kAndCategory")
	public List<SanPham> findSanPhamByPriceMore100kAndDanhMuc(@RequestParam Long price, @RequestParam String category) {
		return SanPhamService.findSanPhamByPriceMore100kAndDanhMuc(price, category);
	}

	// API tìm sản phẩm theo giá lớn hơn và tên sản phẩm
	@GetMapping("Product/FindByPriceMore100kAndText")
	public List<SanPham> findSanPhamByPriceMore100kAndText(@RequestParam Long price, @RequestParam String text) {
		return SanPhamService.findSanPhamByPriceMore100kAndText(price, text);
	}

	// API tìm sản phẩm theo giá lớn hơn và có giảm giá
	@GetMapping("Product/FindByPriceMore100kAndDiscount")
	public List<SanPham> findSanPhamByPriceMore100kAndDiscount(@RequestParam Long price) {
		// API này tìm sản phẩm có giá lớn hơn một giá trị và có giảm giá
		return SanPhamService.findSanPhamByPriceMore100kAndDiscount(price);
	}

	// API tìm sản phẩm theo giá lớn hơn và sao đánh giá
	@GetMapping("Product/FindByPriceMore100kAndRating")
	public List<SanPham> findSanPhamByPriceMore100kAndSosao(@RequestParam Long price, @RequestParam int rating) {
		return SanPhamService.findSanPhamByPriceMore100kAndSosao(price, rating);
	}

	// API tìm sản phẩm theo giá lớn hơn, danh mục và tên sản phẩm
	@GetMapping("Product/FindByPriceMore100kAndCategoryAndText")
	public List<SanPham> findSanPhamByPriceMore100kAndDanhMucAndText(@RequestParam Long price,
			@RequestParam String category, @RequestParam String text) {
		return SanPhamService.findSanPhamByPriceMore100kAndDanhMucAndText(price, category, text);
	}

	// API tìm sản phẩm theo giá lớn hơn, danh mục và có giảm giá
	@GetMapping("Product/FindByPriceMore100kAndCategoryAndPromotion")
	public List<SanPham> findSanPhamByPriceMore100kAndDanhMucAndDiscount(@RequestParam Long price,
			@RequestParam String category) {
		// API này tìm sản phẩm có giá lớn hơn và thuộc một danh mục, đồng thời có giảm
		// giá
		return SanPhamService.findSanPhamByPriceMore100kAndDanhMucAndDiscount(price, category);
	}

	// API tìm sản phẩm theo giá lớn hơn, danh mục và sao đánh giá
	@GetMapping("Product/FindByPriceMore100kAndCategoryAndRating")
	public List<SanPham> findSanPhamByPriceMore100kAndDanhMucAndSosao(@RequestParam Long price,
			@RequestParam String category, @RequestParam int rating) {
		return SanPhamService.findSanPhamByPriceMore100kAndDanhMucAndSosao(price, category, rating);
	}

	// API tìm sản phẩm theo giá lớn hơn, tên sản phẩm và có giảm giá
	@GetMapping("Product/FindByPriceMore100kAndTextAndPromotion")
	public List<SanPham> findSanPhamByPriceMore100kAndTextAndDiscount(@RequestParam Long price,
			@RequestParam String text) {
		// API này tìm sản phẩm có giá lớn hơn và có tên sản phẩm khớp với text, đồng
		// thời có giảm giá
		return SanPhamService.findSanPhamByPriceMore100kAndTextAndDiscount(price, text);
	}

	// API tìm sản phẩm theo giá lớn hơn, tên sản phẩm và sao đánh giá
	@GetMapping("Product/FindByPriceMore100kAndTextAndRating")
	public List<SanPham> findSanPhamByPriceMore100kAndTextAndSosao(@RequestParam Long price, @RequestParam String text,
			@RequestParam int rating) {
		return SanPhamService.findSanPhamByPriceMore100kAndTextAndSosao(price, text, rating);
	}

	// API tìm sản phẩm theo giá lớn hơn, có giảm giá và sao đánh giá
	@GetMapping("Product/FindByPriceMore100kAndPromotionAndRating")
	public List<SanPham> findSanPhamByPriceMore100kAndDiscountAndSosao(@RequestParam Long price,
			@RequestParam int rating) {
		// API này tìm sản phẩm có giá lớn hơn, có giảm giá và sao đánh giá khớp
		return SanPhamService.findSanPhamByPriceMore100kAndDiscountAndSosao(price, rating);
	}

	// API tìm sản phẩm theo giá lớn hơn, danh mục, tên sản phẩm và có giảm giá
	@GetMapping("Product/FindByPriceMore100kAndCategoryAndTextAndPromotion")
	public List<SanPham> findSanPhamByPriceMore100kAndDanhMucAndTextAndDiscount(@RequestParam Long price,
			@RequestParam String category, @RequestParam String text) {
		// API này tìm sản phẩm có giá lớn hơn, thuộc danh mục và tên sản phẩm, đồng
		// thời có giảm giá
		return SanPhamService.findSanPhamByPriceMore100kAndDanhMucAndTextAndDiscount(price, category, text);
	}

	// API tìm sản phẩm theo giá lớn hơn, danh mục, tên sản phẩm và sao đánh giá
	@GetMapping("Product/FindByPriceMore100kAndCategoryAndTextAndRating")
	public List<SanPham> findSanPhamByPriceMore100kAndDanhMucAndTextAndSosao(@RequestParam Long price,
			@RequestParam String category, @RequestParam String text, @RequestParam int rating) {
		return SanPhamService.findSanPhamByPriceMore100kAndDanhMucAndTextAndSosao(price, category, text, rating);
	}

	// API tìm sản phẩm theo giá lớn hơn, danh mục, có giảm giá và sao đánh giá
	@GetMapping("Product/FindByPriceMore100kAndCategoryAndPromotionAndRating")
	public List<SanPham> findSanPhamByPriceMore100kAndDanhMucAndDiscountAndSosao(@RequestParam Long price,
			@RequestParam String category, @RequestParam int rating) {
		// API này tìm sản phẩm có giá lớn hơn, thuộc danh mục và có giảm giá, đồng thời
		// có sao đánh giá khớp
		return SanPhamService.findSanPhamByPriceMore100kAndDanhMucAndDiscountAndSosao(price, category, rating);
	}

	// API tìm sản phẩm theo giá lớn hơn, tên sản phẩm, có giảm giá và sao đánh giá
	@GetMapping("Product/FindByPriceMore100kAndTextAndPromotionAndRating")
	public List<SanPham> findSanPhamByPriceMore100kAndTextAndDiscountAndSosao(@RequestParam Long price,
			@RequestParam String text, @RequestParam int rating) {
		// API này tìm sản phẩm có giá lớn hơn, có tên sản phẩm và có giảm giá, đồng
		// thời sao đánh giá khớp
		return SanPhamService.findSanPhamByPriceMore100kAndTextAndDiscountAndSosao(price, text, rating);
	}

	// API tìm sản phẩm theo tất cả các điều kiện
	@GetMapping("Product/FindByAllConditionsMore100k")
	public List<SanPham> findSanPhamByAllConditionsWithPriceMore100k(@RequestParam Long price,
			@RequestParam String category, @RequestParam String text, @RequestParam int rating) {
		return SanPhamService.findSanPhamByAllConditionsWithPriceMore100k(price, category, text, rating);
	}

	// tìm kiếm sản phẩm theo text và số sao có giảm giá
	@GetMapping("Product/findSanPhambyTextAndSoSaoHaveDiscount")
	public List<SanPham> findSanPhambyTextAndSoSaoHaveDiscount(@RequestParam int sosao, @RequestParam String name) {
		return SanPhamService.findSanPhambyTextAndSoSaoHaveDiscount(sosao, name);
	}

	@GetMapping("Product/findSanPhambyTextAndSoSao")
	public List<SanPham> findSanPhambyTextAndSoSao(@RequestParam int sosao, @RequestParam String name) {
		return SanPhamService.findSanPhambyTextAndSoSao(sosao, name);
	}

	// tìm kiếm sản phẩm theo text và số sao KO có giảm giá
}