package com.BaiTapLab.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.BaiTapLab.Entity.DiaChi;
import com.BaiTapLab.Entity.HanhDong;
import com.BaiTapLab.Entity.Roles;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.DiaChiRepository;
import com.BaiTapLab.Repository.HanhDongReopository;
import com.BaiTapLab.Repository.RoleRepository;
import com.BaiTapLab.Repository.UsersRepository;

import jakarta.transaction.Transactional;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private RoleRepository rolesRepository;

    @Autowired
    private DiaChiRepository diaChiRepository;
    
    @Autowired
	HanhDongReopository HanhDongReopository;

    private static final String UPLOAD_DIR = "uploads/";

    // Method to save the image and return the file name
    public String saveImage(MultipartFile image) throws IOException {
        if (image.isEmpty()) {
            return null;
        }
        // Create a unique file name
        String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
        // Ensure the upload directory exists
        Files.createDirectories(Paths.get(UPLOAD_DIR));
        // Save the file to the server
        Files.copy(image.getInputStream(), Paths.get(UPLOAD_DIR + fileName));
        return fileName;
    }

    @Transactional
    public Users createUserWithImageAndDetails(Users user, Roles role, DiaChi diaChi, MultipartFile image) throws IOException {
        // Save the user to the database
        Users savedUser = usersRepository.save(user);

        // Handle image upload
        if (image != null && !image.isEmpty()) {
            String imageFileName = saveImage(image);
            savedUser.setHinh_anh(imageFileName); // Store the file name in the user entity
        }

        // Save the role associated with the user
        role.setUsers(savedUser);
        rolesRepository.save(role);

        // Save the address associated with the user
        diaChi.setUsers(savedUser);
        diaChiRepository.save(diaChi);
		// luu hanh dong
    	HanhDong hd = new HanhDong();
		hd.setUsers(user);
		hd.setTen_hanh_dong("Thêm");
		HanhDongReopository.save(hd);
//		 end luu hanh dong
		

        return savedUser;
    }

    // Other methods to manage users, roles, and add	resses...
    public List<Users> findAll() {
        return usersRepository.findAll();
    }
    @Transactional
    public Users createUserWithImageAndDetailss(Users user, Roles role, DiaChi diaChi, MultipartFile image) throws IOException {
        // Save the user to the database
        Users savedUser = usersRepository.save(user);

        // Handle image upload
        if (image != null && !image.isEmpty()) {
            String imageFileName = saveImage(image);
            savedUser.setHinh_anh(imageFileName); // Store the file name in the user entity
        }

        // Save the role associated with the user
        role.setUsers(savedUser);
        rolesRepository.save(role);

        // Save the address associated with the user
        diaChi.setUsers(savedUser);
        diaChiRepository.save(diaChi);
		// luu hanh dong
    	HanhDong hd = new HanhDong();
		hd.setUsers(user);
		hd.setTen_hanh_dong("Upload");
		HanhDongReopository.save(hd);
//		 end luu hanh dong
		

        return savedUser;
    }

    // Other methods to manage users, roles, and add	resses...
    

    public Users findById(String accountId) {
        Optional<Users> user = usersRepository.findById(accountId);
        return user.orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void deleteById(String accountId) {
        usersRepository.deleteById(accountId);
    }

    public Users save(Users user) {
        return usersRepository.save(user);
    }
}
