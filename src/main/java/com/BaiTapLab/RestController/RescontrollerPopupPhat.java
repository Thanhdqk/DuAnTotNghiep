package com.BaiTapLab.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.DTO.HinhAnhDTOPhat;
import com.BaiTapLab.DTO.PopUpDTO2;
import com.BaiTapLab.DTO.PopupDTO;
import com.BaiTapLab.DTO.PopupchitietDTO;
import com.BaiTapLab.DTO.SanPhamDTO2;
import com.BaiTapLab.Entity.HanhDong;
import com.BaiTapLab.Entity.Popup;
import com.BaiTapLab.Entity.PopupChiTiet;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.HanhDongRepository;
import com.BaiTapLab.Repository.PopupRepository;
import com.BaiTapLab.Repository.PopupchitietRepository;
import com.BaiTapLab.Repository.SanPhamRepository;
import com.BaiTapLab.Repository.UsersRepository;
import com.BaiTapLab.Service.PopupServicePhat;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/popup")
public class RescontrollerPopupPhat {
	@Autowired
	PopupServicePhat PopupService;
	@Autowired
	PopupRepository repo;
	@Autowired
	SanPhamRepository sanphamrepo;
	@Autowired
	HanhDongRepository hdrepo;
	@Autowired
	PopupchitietRepository popupchitietRepository;
	@Autowired
	UsersRepository usersRepository;


//	@GetMapping("FindAllPopUp")
//	public List<Map<String, Object>> getall() {
//		List<Object[]> listtempt = repo.findallpopup();
//
//		return MapToData(listtempt);
//	}

	@GetMapping("FindAllPopUp")
	public List<PopUpDTO2> getallL() {

		return (List<PopUpDTO2>) repo.findnewestrecord2().stream().map(popup -> new PopUpDTO2(popup.getPopupID(),
				popup.getNgay_tao(), popup.getHan_su_dung(), popup.getHoat_dong(), popup.getTrang_thai_xoa(),
				popup.getUsers(),
				popup.getPopupchitiet().stream().map(p -> new PopupchitietDTO(p.getPopupchitietid(), new SanPhamDTO2(
						p.getSanpham().getSan_phamId(), p.getSanpham().getTen_san_pham(),
						p.getSanpham().getHinhanh().stream().map(h -> new HinhAnhDTOPhat(h.getId(), h.getTen_hinh()))
								.collect(Collectors.toList()),
						p.getSanpham().getPhantram_GG(), p.getSanpham().getGia_goc(), p.getSanpham().getGia_km())))
						.collect(Collectors.toList())))
				.collect(Collectors.toList());

	}

//	@GetMapping("findall")
//	public List<PopUpDTO2> tes1() {
//		return repo.findHanhDongRespone();
//	}

	public List<Map<String, Object>> MapToData(List<Object[]> results) {
		List<Map<String, Object>> sanPhamList = new ArrayList<>();
		for (Object[] row : results) {
			Map<String, Object> sanPham = new HashMap<>();
			sanPham.put("popupID", row[0]);
			sanPham.put("ngay_tao", row[1]);
			sanPham.put("han_su_dung", row[2]);
			sanPham.put("hoat_dong", row[3]);
			sanPham.put("trang_thai_xoa", row[4]);
			sanPham.put("san_phamId", row[5]);
			sanPham.put("ten_san_pham", row[6]);
			sanPham.put("accountID", row[7]);
			sanPhamList.add(sanPham);
		}
		return sanPhamList;
	}

	@GetMapping("FindAllPopUpSpare")
	public List<Popup> sparegetMethodName(@RequestParam("id") String id) {
		return PopupService.FindALLSpare("PopUp_1");
	}

	@GetMapping("FindAllPopUpwithDTO")
	public List<PopupDTO> getbydto() {
		return hdrepo.findHanhDongPopup();
	}

	@GetMapping("getallpopuphasdeletedstatus")
	public List<PopUpDTO2> getallpopuphasdeletedstatus() {
		return (List<PopUpDTO2>) repo.findallpopupdeleted().stream().map(popup -> new PopUpDTO2(popup.getPopupID(),
				popup.getNgay_tao(), popup.getHan_su_dung(), popup.getHoat_dong(), popup.getTrang_thai_xoa(),
				popup.getUsers(),
				popup.getPopupchitiet().stream().map(p -> new PopupchitietDTO(p.getPopupchitietid(), new SanPhamDTO2(
						p.getSanpham().getSan_phamId(), p.getSanpham().getTen_san_pham(),
						p.getSanpham().getHinhanh().stream().map(h -> new HinhAnhDTOPhat(h.getId(), h.getTen_hinh()))
								.collect(Collectors.toList()),
						p.getSanpham().getPhantram_GG(), p.getSanpham().getGia_goc(), p.getSanpham().getGia_km())))
						.collect(Collectors.toList())))
				.collect(Collectors.toList());
	}

	@GetMapping("getallpopupnotdeleted")
	public List<PopUpDTO2> getallpopupnotdeleted() {
//		List<Object[]> listtempt = repo.findallpopupnotdeleted();
//		MapToData(listtempt);
//		return MapToData(listtempt);

		return (List<PopUpDTO2>) repo.findallpopupnotdeleted().stream().map(popup -> new PopUpDTO2(popup.getPopupID(),
				popup.getNgay_tao(), popup.getHan_su_dung(), popup.getHoat_dong(), popup.getTrang_thai_xoa(),
				popup.getUsers(),
				popup.getPopupchitiet().stream().map(p -> new PopupchitietDTO(p.getPopupchitietid(), new SanPhamDTO2(
						p.getSanpham().getSan_phamId(), p.getSanpham().getTen_san_pham(),
						p.getSanpham().getHinhanh().stream().map(h -> new HinhAnhDTOPhat(h.getId(), h.getTen_hinh()))
								.collect(Collectors.toList()),
						p.getSanpham().getPhantram_GG(), p.getSanpham().getGia_goc(), p.getSanpham().getGia_km())))
						.collect(Collectors.toList())))
				.collect(Collectors.toList());
	}



	@PostMapping("createnewPopup")
	public void createnewpopup(@RequestBody Popup popup, @RequestParam("productname") List<String> productnames,
			@RequestParam("userid") String userid) {
		Users currentuser = usersRepository.findById(userid).get();
		popup.setUsers(currentuser);
		HanhDong hanhdong = new HanhDong();
		System.out.println("PopUP đang được thêm : " + popup.getPopupID());
		System.out.println(popup);

		try {
			List<SanPham> listsp = new ArrayList<SanPham>();
			List<PopupChiTiet> listpopChiTiets = new ArrayList<PopupChiTiet>();

			for (int i = 0; i < productnames.size(); i++) {
				System.out.println();
				SanPham sp = sanphamrepo.findSanPhamById(productnames.get(i));
				System.out.println("Tên sản phẩm mới : " + sp.getTen_san_pham());
				PopupChiTiet p = new PopupChiTiet();
				p.setPopup(popup);
				p.setSanpham(sp);
				listpopChiTiets.add(p);
				listsp.add(sp);
			}
			popup.setPopupchitiet(listpopChiTiets);
//			for (int i = 0; i < popup.getSanpham().size(); i++) {
//				System.out.println("Tên sản phẩm mới :" + popup.getSanpham().get(i).getTen_san_pham());
//			}

			System.out.println(popup);
			repo.save(popup);
			hanhdong.setPopup(popup);

			hanhdong.setTen_hanh_dong("Thêm");
			hanhdong.setNgay_hanh_dong(LocalDate.now());
			hanhdong.setUsers(currentuser);
			hdrepo.save(hanhdong);
//			for (SanPham sanPham : listsp) {
//				System.out.println("sp: " + sanPham.getSan_phamId());
//				sanphamrepo.save(sanPham);
//			}
			System.out.println("result: succes ");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@PostMapping(path = "updatePopup", consumes = "application/json", produces = "application/json")
	public void update(@RequestBody Popup popup, @RequestParam("productname") List<String> productnames,
			@RequestParam("userid") String userid) {
		try {
			Users currentuser = usersRepository.findById(userid).get();
			popup.setUsers(currentuser);
			System.out.println("PopUP đang được thêm:" + popup.getPopupID());
			System.out.println(popup);

			List<SanPham> listsp = new ArrayList<SanPham>();

			Popup temppop = repo.findById(popup.getPopupID()).get();

			for (int i = 0; i < temppop.getPopupchitiet().size(); i++) {
				System.out
						.println("Tên sản phẩm cũ :" + temppop.getPopupchitiet().get(i).getSanpham().getTen_san_pham());
			}

			List<PopupChiTiet> list = new ArrayList<PopupChiTiet>();

			for (int i = 0; i < productnames.size(); i++) {
				System.out.println(productnames.size());
				SanPham sp = sanphamrepo.findSanPhamById(productnames.get(i));
				PopupChiTiet popupchitiet = new PopupChiTiet();
				popupchitiet.setPopupchitietid(i);
				popupchitiet.setPopup(popup);

				popupchitiet.setSanpham(sp);
//				sp.setPopupchitiet(list);
				listsp.add(sp);
				list.add(popupchitiet);
			}
//			popup.setPopupchitiet(list);

//			for (int i = 0; i < array.length; i++) {
//				array_type array_element = array[i];
//				
//			}

			List<String> source = new ArrayList<String>();
			List<String> sourcetempt = new ArrayList<String>();

			for (SanPham sanPham : listsp) {
				source.add(sanPham.san_phamId);
				sourcetempt.add(sanPham.san_phamId);
			}

			List<String> valuesToRemove = new ArrayList<String>();
			for (int i = 0; i < temppop.getPopupchitiet().size(); i++) {
				valuesToRemove.add(temppop.getPopupchitiet().get(i).getSanpham().getSan_phamId());
			}
//
//			List<String> valuesToRemove = new ArrayList<String>();
//			for (SanPham sanPham : temppop.getSanpham()) {
//				valuesToRemove.add(sanPham.san_phamId);
//			}

//

			System.out.println("mới: " + source);
			System.out.println("cũ: " + valuesToRemove);

			try {
				sourcetempt.removeAll(valuesToRemove);
				System.out.println("sourcetempt : " + sourcetempt);
				if (sourcetempt.size() > 0) {
					for (int i = 0; i < sourcetempt.size(); i++) {
						PopupChiTiet popupChiTiet = new PopupChiTiet();
						popupChiTiet.setSanpham(sanphamrepo.findById(sourcetempt.get(i)).get());
						popupChiTiet.setPopup(popup);
						popupchitietRepository.save(popupChiTiet);

					}

				}
				valuesToRemove.removeAll(source);
				System.out.println("cần xóa: " + valuesToRemove);
				try {
					if (valuesToRemove.size() > 0) {
						for (int i = 0; i < valuesToRemove.size(); i++) {
							SanPham sp = sanphamrepo.findSanPhamById(valuesToRemove.get(i));
							popupchitietRepository.removePopupchitiet(popup.getPopupID(), sp.getSan_phamId());

						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}

			} catch (Exception e) {
				e.printStackTrace();
			}

//
//			System.out.println("cần xóa: " + valuesToRemove);
//			for (String string : valuesToRemove) {
//				SanPham sp = sanphamrepo.findSanPhamById(string);
//				sp.setPopup(null);
//				sanphamrepo.save(sp);
//			}
//
////			List<SanPham> results = temppop.getSanpham().stream()
////					.filter(u -> !popup.getSanpham().contains(u.getSan_phamId())).collect(Collectors.toList());
//
//			for (int i = 0; i < productnames.size(); i++) {
//				System.out.println("Sản phẩm mới  :" + productnames.get(i));
//			}
//
////			for (SanPham sanPham1 : results) {
////				System.out.println("sản phẩm trùng :" + sanPham1.getTen_san_pham());
////			}
//
			repo.save(popup);

			HanhDong hanhdong = new HanhDong();
			hanhdong.setNgay_hanh_dong(LocalDate.now());
			hanhdong.setUsers(currentuser);
			hanhdong.setPopup(popup);
			hanhdong.setTen_hanh_dong("Cập nhật");
			hdrepo.save(hanhdong);

//			for (PopupChiTiet pchitiet : list) {
//				popupchitietRepository.save(pchitiet);
//			}

//			for (SanPham sanPham : listsp) {
//				System.out.println("sp: " + sanPham.getSan_phamId());
//				sanphamrepo.save(sanPham);
//			}
			System.out.println("result: succes ");
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@GetMapping("getnewestID")
	public String newestID() {
		String currentid = repo.findnewestrecord().getPopupID();
		String idnumber = currentid.substring(currentid.indexOf("0") + 1, currentid.length());
		String newid = "PopUp0" + (Integer.parseInt(idnumber) + 1);
		return newid;
	}

	@PostMapping("changeStatus")
	public void ChangeStatus1(@RequestBody Popup popup,@RequestParam("userid") String userid) {
		System.out.println("deleted item :  " + popup);
		Users currentuser = usersRepository.findById(userid).get();
		Popup pop = repo.findById(popup.getPopupID()).get();
		pop.setTrang_thai_xoa("Đã Xóa");

		repo.save(pop);
		HanhDong hanhdong = new HanhDong();

	
		hanhdong.setNgay_hanh_dong(LocalDate.now());
		hanhdong.setUsers(currentuser);
		hanhdong.setPopup(popup);
		hanhdong.setTen_hanh_dong("Ẩn popup");
		hdrepo.save(hanhdong);

	}

	@PostMapping("undodelete")
	public void ChangeStatus2(@RequestBody Popup popup,@RequestParam("userid") String userid) {
		Users currentuser = usersRepository.findById(userid).get();
		System.out.println("deleted item :  " + popup);
		Popup pop = repo.findById(popup.getPopupID()).get();
		pop.setTrang_thai_xoa(null);
		repo.save(pop);
		HanhDong hanhdong = new HanhDong();
		hanhdong.setNgay_hanh_dong(LocalDate.now());
		hanhdong.setUsers(currentuser);
		hanhdong.setPopup(popup);
		hanhdong.setTen_hanh_dong("Khôi phục ");
		hdrepo.save(hanhdong);
	}
	
	@GetMapping("getPopupsAfterUpdateStatus")
	public List<PopUpDTO2> getPopAfterUpdate(){
		return (List<PopUpDTO2>) repo.updatehoatdong().stream().map(popup -> new PopUpDTO2(popup.getPopupID(),
				popup.getNgay_tao(), popup.getHan_su_dung(), popup.getHoat_dong(), popup.getTrang_thai_xoa(),
				popup.getUsers(),
				popup.getPopupchitiet().stream().map(p -> new PopupchitietDTO(p.getPopupchitietid(), new SanPhamDTO2(
						p.getSanpham().getSan_phamId(), p.getSanpham().getTen_san_pham(),
						p.getSanpham().getHinhanh().stream().map(h -> new HinhAnhDTOPhat(h.getId(), h.getTen_hinh()))
								.collect(Collectors.toList()),
						p.getSanpham().getPhantram_GG(), p.getSanpham().getGia_goc(), p.getSanpham().getGia_km())))
						.collect(Collectors.toList())))
				.collect(Collectors.toList());
	}

}