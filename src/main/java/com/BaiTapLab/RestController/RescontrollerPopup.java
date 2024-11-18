package com.BaiTapLab.RestController;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.Popup;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Repository.PopupRepository;
import com.BaiTapLab.Repository.SanphamRepository;
import com.BaiTapLab.Service.PopupService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RescontrollerPopup {
	@Autowired
	PopupService PopupService;
	@Autowired
	PopupRepository repo;
	@Autowired
	SanphamRepository sanphamrepo;

	@GetMapping("FindAllPopUp")

	public List<Popup> getMethodName() {
		return PopupService.FindALL();
	}

	@GetMapping("FindAllPopUpSpare")
	public List<Popup> sparegetMethodName(@RequestParam("id") String id) {
		return PopupService.FindALLSpare("PopUp_1");
	}

	@GetMapping("getallpopuphasdeletedstatus")
	public List<Popup> getallpopuphasdeletedstatus() {
		List<Popup> temp = PopupService.FindALL();
		List<Popup> itemshasdeletedstatus = new ArrayList<Popup>();
		for (Popup popup : temp) {
			if (popup.getTrang_thai_xoa() != null && popup.getTrang_thai_xoa().equals("1")) {
				itemshasdeletedstatus.add(popup);
			}
		}
		return itemshasdeletedstatus;
	}

	@GetMapping("getallpopupnotdeleted")
	public List<Popup> getallpopupnotdeleted() {
		List<Popup> temp = PopupService.FindALL();

		List<Popup> itemshasdeletedstatus = new ArrayList<Popup>();
		for (Popup popup : temp) {
			if (!popup.getTrang_thai_xoa().equals("1")) {
				itemshasdeletedstatus.add(popup);
			}
		}
		return itemshasdeletedstatus;
	}

	@GetMapping("all")
	@ResponseBody
	public List<Popup> all1() {
		return repo.findAll();
	}

	@PostMapping("createnewPopup")
	public void createnewpopup(@RequestBody Popup popup) {
		try {
			List<SanPham> listsp = new ArrayList<SanPham>();

			System.out.println(popup);
			for (int i = 0; i < popup.getSanpham().size(); i++) {
				System.out.println();
				SanPham sp = sanphamrepo.findSanPhamById(popup.getSanpham().get(i).getSan_phamId());

				sp.setPopup(popup);
				listsp.add(sp);
			}
			popup.setSanpham(listsp);
			for (int i = 0; i < popup.getSanpham().size(); i++) {
				System.out.println("object :" + popup.getSanpham().get(i).getTen_san_pham());
			}
			repo.save(popup);

			for (SanPham sanPham : listsp) {
				System.out.println("sp: " + sanPham.getSan_phamId());
//				sanphamrepo.save(sanPham);
			}
			System.out.println("result: succes ");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@PostMapping("update")
	public void update(@RequestBody Popup popup) {
		try {
			List<SanPham> listsp = new ArrayList<SanPham>();

			System.out.println(popup);
			for (int i = 0; i < popup.getSanpham().size(); i++) {
				System.out.println();
				SanPham sp = sanphamrepo.findSanPhamById(popup.getSanpham().get(i).getSan_phamId());

				sp.setPopup(popup);
				listsp.add(sp);
			}
			popup.setSanpham(listsp);
			for (int i = 0; i < popup.getSanpham().size(); i++) {
				System.out.println("object :" + popup.getSanpham().get(i).getTen_san_pham());
			}
			repo.save(popup);

			for (SanPham sanPham : listsp) {
				System.out.println("sp: " + sanPham.getSan_phamId());
//				sanphamrepo.save(sanPham);
			}
			System.out.println("result: succes ");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@GetMapping("getnewestID")
	public String newestID() {
		String currentid = repo.findnewestrecord().getPopupID();
		String idnumber = currentid.substring(currentid.indexOf("_") + 1, currentid.length());
		String newid = "PopUp_" + (Integer.parseInt(idnumber) + 1);
		return newid;
	}

	@PostMapping("changeStatus")
	public void ChangeStatus1(@RequestBody Popup popup) {
		System.out.println("deleted item :  " + popup);
		Popup pop = repo.findById(popup.getPopupID()).get();
		pop.setTrang_thai_xoa("1");
		repo.save(pop);

	}
	@PostMapping("undodelete")
	public void ChangeStatus2(@RequestBody Popup popup) {
		System.out.println("deleted item :  " + popup);
		Popup pop = repo.findById(popup.getPopupID()).get();
		pop.setTrang_thai_xoa("0");
		repo.save(pop);

	}

}
