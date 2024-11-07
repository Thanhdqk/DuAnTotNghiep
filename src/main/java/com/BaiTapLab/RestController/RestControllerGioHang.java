package com.BaiTapLab.RestController;

import com.BaiTapLab.Entity.GioHang;
import com.BaiTapLab.Entity.SanPham;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Service.GioHangService;
import com.BaiTapLab.Repository.SanphamRepository;
import com.BaiTapLab.Repository.UsersRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType; // Để sử dụng MediaType
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RestControllerGioHang {

	 @Autowired
	    private GioHangService gioHangService;

	    @Autowired
	    private UsersRepository usersRepository;
	    
	    @Autowired
	    SanphamRepository SanphamRepository;
	    
	    @GetMapping("cart")
	    public String getMethodName() {
	    	return "run cart";
	    }
	    
	    
	    
	    // Thêm sản phẩm vào giỏ hàng
	    @PostMapping("AddCart/{userId}/{sanphamId}/{soluong}")
	    public GioHang addGioHang(@PathVariable("userId") String userId,@PathVariable("sanphamId") String sanphamId,@PathVariable("soluong") int soluong) {
	    	 // Log thông tin gioHang
	      
	    	
	    	    
	    	   
	    	    
	    		 try {
	    			 Users user = usersRepository.findByAccountID(userId);
			    	       	    
			    	 SanPham sanPham = SanphamRepository.findById(sanphamId)
			    	                                        .orElseThrow(() -> new RuntimeException("Product not found"));
			    	 int so_luong_max = sanPham.getSo_luong();
			    	 System.out.println("so_luong_max"+so_luong_max);
			    	 
 GioHang ExistGioHang = gioHangService.findByUserIdAndSanPhamId(userId, sanphamId);
			    	 
			    	 if(ExistGioHang !=null)
			    	 {	
			    		 System.out.println("so_luong_max"+so_luong_max);
			    		 System.out.println("soluong"+soluong);
			    		 System.out.println(" ExistGioHang.getSo_luong()"+ ExistGioHang.getSo_luong());
			    		 if(so_luong_max == soluong)
			    		 {
			    			 ExistGioHang.setSo_luong(so_luong_max);
				    		 gioHangService.addGioHang(ExistGioHang);
				    		 System.out.println("run 1");
				    		 return null;
			    		 }
			    		  if(soluong + ExistGioHang.getSo_luong() > so_luong_max)
			    		 {
			    			 ExistGioHang.setSo_luong(so_luong_max);
				    		 gioHangService.addGioHang(ExistGioHang);
				    		 System.out.println("run 2");
				    		 return null;
			    		 }
			    		 else {
			    			 ExistGioHang.setSo_luong(ExistGioHang.getSo_luong() + soluong);
				    		 gioHangService.addGioHang(ExistGioHang);
				    		 System.out.println("run 3");
				    		 return null;
			    		 }
			    		
			    		
			    	 }
			    	 else {
			    		 GioHang gioHang = new GioHang();
			    		
				    	 gioHang.setSanpham(sanPham);
				    	 gioHang.setUsers(user);;
				    	 gioHang.setSo_luong(soluong);
				    	 gioHangService.addGioHang(gioHang);
			    	 }
			    	
				} catch (Exception e) {
					// TODO: handle exception
				}
	       
	        return null;
	    }
	    
	    @PostMapping("AddCart1/{userId}/{sanphamId}/{soluong}")
	    public GioHang adddGioHang2(@PathVariable("userId") String userId,@PathVariable("sanphamId") String sanphamId,@PathVariable("soluong") int soluong) {
	    	 
	      
	    	
	    	    
	    	    System.out.println("cc1"+sanphamId);
	    	    System.out.println("cc1"+userId);
	    	    System.out.println("cc1"+soluong);
	    	    
	    		 try {
	    			 Users user = usersRepository.findByAccountID(userId);
			    	   
			    	    
			    	    
			    	 SanPham sanPham = SanphamRepository.findById(sanphamId)
			    	                                        .orElseThrow(() -> new RuntimeException("Product not found"));
			    	 
			    	 GioHang ExistGioHang = gioHangService.findByUserIdAndSanPhamId(userId, sanphamId);
			    	 
			    	 if(ExistGioHang !=null)
			    	 {
			    		 ExistGioHang.setSo_luong(ExistGioHang.getSo_luong() + soluong);
			    		 gioHangService.addGioHang(ExistGioHang);
			    		 System.out.println("cc1"+ExistGioHang.getId());
			    	 }
			    	 else {
			    		 System.out.println("ko có");
			    	 }
			    	
			    	 
			    	 
			    	 
				} catch (Exception e) {
					// TODO: handle exception
				}
	       
	        return null;
	    }

	    // Lấy danh sách giỏ hàng của người dùng
	    @GetMapping("GETcart/{userId}")
	    public List<GioHang> getGioHang(@PathVariable String userId) {
	        List<GioHang> gioHangs = gioHangService.getGioHangByUserId(userId);
	        return gioHangs;
	    }

	    // Tăng số lượng sản phẩm trong giỏ hàng
	    @PostMapping("increase/{gioHangId}")
	    public ResponseEntity<GioHang> increaseQuantity(@PathVariable("gioHangId") Integer gioHangId) {
	        GioHang updatedGioHang = gioHangService.increaseQuantity(gioHangId);
	        return ResponseEntity.ok(updatedGioHang);
	    }

	    // Giảm số lượng sản phẩm trong giỏ hàng
	    @PostMapping("decrease/{gioHangId}")
	    public ResponseEntity<GioHang> decreaseQuantity(@PathVariable Integer gioHangId) {
	        GioHang updatedGioHang = gioHangService.decreaseQuantity(gioHangId);
	        return ResponseEntity.ok(updatedGioHang);
	    }

	    // Xóa sản phẩm khỏi giỏ hàng
	    @DeleteMapping("delete/{gioHangId}")
	    public ResponseEntity<Void> deleteGioHang(@PathVariable Integer gioHangId) {
	        gioHangService.deleteGioHang(gioHangId);
	        return ResponseEntity.noContent().build();
	    }
	    
	    @DeleteMapping("Clear/{Iduser}")
	    public ResponseEntity<Void> ClearGioHang(@PathVariable String Iduser) {
	        gioHangService.ClearAll(Iduser);
	        return ResponseEntity.noContent().build();
	    }
	
}
