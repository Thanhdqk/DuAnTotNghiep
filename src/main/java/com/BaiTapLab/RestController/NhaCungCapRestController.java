package com.BaiTapLab.RestController;

import com.BaiTapLab.Entity.NhaCungCap;
import com.BaiTapLab.Service.NhaCungCapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/nhacungcap")	
@CrossOrigin(origins = { "http://localhost:3000" })
public class NhaCungCapRestController {

	
    @Autowired
    private NhaCungCapService nhaCungCapService;

    @GetMapping
    public List<NhaCungCap> getAllNhaCungCap() {
        return nhaCungCapService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<NhaCungCap> getNhaCungCapById(@PathVariable String id) {
        return nhaCungCapService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createNhaCungCap(@RequestBody NhaCungCap nhaCungCap) {
        Map<String, Object> response = new HashMap<>();

        // Validate required fields
        if (nhaCungCap.getNha_cung_capID() == null || nhaCungCap.getTen_nhaCC() == null || 
            nhaCungCap.getTen_mat_hang() == null || nhaCungCap.getSo_dien_thoai() == null || 
            nhaCungCap.getDia_chi() == null) {
            response.put("message", "Tất cả các trường là bắt buộc!");
            return ResponseEntity.badRequest().body(response);
        }

        NhaCungCap createdNhaCungCap = nhaCungCapService.save(nhaCungCap);
        response.put("message", "Nhà cung cấp đã được tạo thành công!");
        response.put("nhaCungCap", createdNhaCungCap);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteNhaCungCap(@PathVariable String id) {
        Map<String, String> response = new HashMap<>();

        // Check if the entity exists
        Optional<NhaCungCap> nhaCungCap = nhaCungCapService.findById(id);
        if (nhaCungCap.isEmpty()) {
            response.put("message", "Nhà cung cấp không tồn tại!");
            return ResponseEntity.notFound().build();
        }

        nhaCungCapService.deleteById(id);
        response.put("message", "Nhà cung cấp đã được xóa thành công!");
        return ResponseEntity.ok(response);
    }
}