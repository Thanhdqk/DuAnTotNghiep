package com.BaiTapLab.RestController;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import com.BaiTapLab.Entity.ThuongHieu;
import com.BaiTapLab.Service.ThuongHieuService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = { "http://localhost:3000" })
public class ThuongHieuRestController {
	@Autowired
	private ThuongHieuService thuonghieuService;

	@GetMapping("/loadAll")
	public List<ThuongHieu> loadAll() {
		return thuonghieuService.findAll();
	}

	@PostMapping("/add")
	public ThuongHieu addThuongHieu(@RequestBody ThuongHieu thuongHieu) {
		System.out.println(thuongHieu.getTen_thuong_hieu());
		System.out.println(thuongHieu.getThuong_hieuID());
		return thuonghieuService.save(thuongHieu);
//        return thuongHieu.getThuong_hieuID();
	}

	@PutMapping("/update/{thuong_hieuID}")
	public ThuongHieu updateThuongHieu(@PathVariable("thuong_hieuID") String thuong_hieuID,
			@RequestBody ThuongHieu thuongHieu) {
		ThuongHieu existingTH = thuonghieuService.findByID(thuong_hieuID);
		// Update fields here if necessary
		return thuonghieuService.save(thuongHieu);
	}

	@DeleteMapping("/delete/{thuong_hieuID}")
	public void deleteThuongHieu(@PathVariable("thuong_hieuID") String thuong_hieuID) {
		thuonghieuService.deleteByID(thuong_hieuID);
	}
}
