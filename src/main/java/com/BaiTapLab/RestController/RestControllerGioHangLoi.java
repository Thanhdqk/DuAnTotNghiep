package com.BaiTapLab.RestController;

import com.BaiTapLab.Entity.GioHang;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Service.GioHangServiceLoi;
import com.BaiTapLab.Repository.GioHangRepository;
import com.BaiTapLab.Repository.SanPhamRepository;
import com.BaiTapLab.Repository.UsersRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType; // Để sử dụng MediaType
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RestControllerGioHangLoi {

	 @Autowired
	    private GioHangServiceLoi gioHangService;

	    @Autowired
	    private UsersRepository usersRepository;
	    
	    @Autowired
	    SanPhamRepository SanphamRepository;
	    
	    @Autowired
	    GioHangRepository gioHangRepository;
	    
	    @GetMapping("cart")
	    public String getMethodName() {
	    	return "run cart";
	    }
	    
	    @GetMapping("GETcart/{accountId}")
	    public GioHang getGioHang(@PathVariable String accountId) {
	    	
	    	GioHang giohang = gioHangService.getGioHang(accountId);
	    	Users user = usersRepository.findByAccountID(accountId);
	    	if(giohang==null)
	    	{	
	    		GioHang giohang1 = new GioHang();
	    		giohang1.setUsers(user);
	    		gioHangRepository.save(giohang1);
	    		return giohang1;
	    	}
	        return giohang;
	    }
	    
	    
	    
	    // Thêm sản phẩm vào giỏ hàng
	    @PostMapping("AddCart/{userId}/{sanphamId}/{soluong}")
	    public void addGioHang(@PathVariable("userId") String userId,@PathVariable("sanphamId") String sanphamId,@PathVariable("soluong") int soluong) {
	    	
	    	
	    	gioHangService.addSanPhamToGioHang(userId, sanphamId, soluong);
	      

	    }
	    
	    
	    @PostMapping("/increase/{sanphamId}/{userId}")
	    public void increaseProductQuantity(
	            @PathVariable("userId") String accountId,
	            @PathVariable("sanphamId") String sanPhamId) {
	        gioHangService.increaseProductQuantity(accountId, sanPhamId);
	       
	    }

	    // Giảm số lượng sản phẩm trong giỏ hàng
	    @PostMapping("/decrease/{sanphamId}/{userId}")
	    public void decreaseProductQuantity(
	    		 @PathVariable("userId") String accountId,
		            @PathVariable("sanphamId") String sanPhamId) {
	        gioHangService.decreaseProductQuantity(accountId, sanPhamId);
	       
	    }
	    
	    @DeleteMapping("/remove/{userId}/{sanphamId}")
	    public void removeProductFromGioHang(
	    		@PathVariable("userId") String userId,
	    		@PathVariable("sanphamId") String sanPhamId) {
	        gioHangService.removeProductFromGioHang(userId, sanPhamId);
	       
	    }

	  
	    @DeleteMapping("/Clear/{iduser}")
	    public void clearGioHang(@PathVariable("iduser") String userId) {
	        gioHangService.clearGioHang(userId);
	        
	    }
	   

	  
	
}