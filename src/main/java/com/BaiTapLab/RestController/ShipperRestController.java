package com.BaiTapLab.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.Entity.HanhDong;
import com.BaiTapLab.Entity.Shipper;
import com.BaiTapLab.Repository.HanhDongRepository;
import com.BaiTapLab.Repository.ShipperRepository;
import com.BaiTapLab.Repository.UsersRepository;

@RestController
@RequestMapping("api/shipper")
public class ShipperRestController {
	@Autowired
	ShipperRepository shipperRepository;
	
	@Autowired
	UsersRepository usersRepository;
	
	@Autowired
	HanhDongRepository hanhDongRepository;
	
	@GetMapping("/chiTiet/{shipperID}")
	public ResponseEntity<List<Map<String, Object>>> getDanhSachShipperDetail(
			@PathVariable String shipperID) {
	    // Lấy tất cả sản phẩm từ cơ sở dữ liệu
	    List<Object[]> listShipper = shipperRepository.chiTietShipper(shipperID);
	    List<Map<String, Object>> result = new ArrayList<>();
		for (Object[] obj : listShipper) {
            Map<String, Object> map = new HashMap<>();
            map.put("shipperID", obj[0]);
            map.put("hovaten", obj[1]);
            map.put("password", obj[2]);
            map.put("hoat_dong", obj[3]);
            result.add(map);
        }
	    return ResponseEntity.ok(result);
	}
	
	@PutMapping("/update/trangThaiXoa/{shipperID}")
	  public ResponseEntity<?> deleteShipper(@PathVariable("shipperID") String shipperID) {
	      Integer isUpdated = shipperRepository.updateShipper(shipperID);
	      if (isUpdated > 0) {
	          return ResponseEntity.ok("Trạng thái sản phẩm với ID " + shipperID + " đã được cập nhật thành 'Đã xóa'.");
	      } else {
	          return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                  .body("Không tìm thấy sản phẩm với ID: " + shipperID);
	      }
	 }
	
	@PutMapping("/update/khoiphuc/{shipperID}")
	  public ResponseEntity<?> khoiphucShipper(@PathVariable("shipperID") String shipperID) {
	      Integer isUpdated = shipperRepository.updateKhoiPhucShipper(shipperID);
	      if (isUpdated > 0) {
	          return ResponseEntity.ok("Trạng thái sản phẩm với ID " + shipperID + " đã được cập nhật thành 'Đã xóa'.");
	      } else {
	          return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                  .body("Không tìm thấy sản phẩm với ID: " + shipperID);
	      }
	 }
	
	@GetMapping("/listShipper")
	public ResponseEntity<List<Map<String, Object>>> getDanhSachShipper() {
	    // Lấy tất cả sản phẩm từ cơ sở dữ liệu
	    List<Object[]> listShipper = shipperRepository.danhSachShipper();
	    List<Map<String, Object>> result = new ArrayList<>();
		for (Object[] obj : listShipper) {
            Map<String, Object> map = new HashMap<>();
            map.put("shipperID", obj[0]);
            map.put("hovaten", obj[1]);
            map.put("vai_tro", obj[2]);
            map.put("hoat_dong", obj[3]);
            map.put("hinh_anh", obj[4]);
            map.put("trang_thai_xoa", obj[5]);
            result.add(map);
        }
	    return ResponseEntity.ok(result);
	}
	
	@GetMapping("/listShipper/daGiao")
	public ResponseEntity<List<Map<String, Object>>> getDanhSachShipperDaGiao() {
	    // Lấy tất cả sản phẩm từ cơ sở dữ liệu
	    List<Object[]> listShipper = shipperRepository.danhSachShipperDaGiao();
	    List<Map<String, Object>> result = new ArrayList<>();
		for (Object[] obj : listShipper) {
            Map<String, Object> map = new HashMap<>();
            map.put("shipperID", obj[0]);
            map.put("hovaten", obj[1]);
            map.put("don_hangID", obj[2]);
            map.put("vai_tro", obj[3]);
            map.put("thoi_gianxn", obj[4]);
            map.put("hoat_dong", obj[5]);
            map.put("hinh_anh", obj[6]);
            result.add(map);
        }
	    return ResponseEntity.ok(result);
	}
	
	
	@PostMapping("/addShipper")
	public ResponseEntity<?> themShipper(
			@RequestParam("shipperID") String shipperID,
			@RequestParam("hovaten") String hovaten,
			@RequestParam("password") String password,
			@RequestParam("hoat_dong") String hoat_dong,
			@RequestParam("accountID") String accountID){
		Optional<Shipper> shipper = shipperRepository.findById(shipperID);
		if(shipper.isPresent()) {
			Shipper shipperNe = shipper.get();
			shipperNe.setShipperID(shipperID);
			shipperNe.setHovaten(hovaten);
			shipperNe.setPassword(password);
			shipperNe.setVai_tro("Shipper");
			shipperNe.setHoat_dong(hoat_dong);
			
			HanhDong hanhdong = new HanhDong();
			hanhdong.setTen_hanh_dong("Thêm shipper");
			hanhdong.setNgay_hanh_dong(LocalDate.now());
			hanhdong.setShipper(shipperNe);
			hanhdong.setUsers(usersRepository.findById(accountID)
            		.orElseThrow(() -> new RuntimeException("Account không tồn tại")));
			hanhDongRepository.save(hanhdong);
			shipperRepository.save(shipperNe);
		}
		return ResponseEntity.ok(shipper);
	}
}
