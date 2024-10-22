package com.BaiTapLab.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.BaiTapLab.Entity.DiaChi;
import com.BaiTapLab.Entity.Roles;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.DiaChiRepository;
import com.BaiTapLab.Repository.RoleRepository;
import com.BaiTapLab.Repository.UsersRepository;

import jakarta.transaction.Transactional;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private RoleRepository rolesRepository;

    @Autowired
    private DiaChiRepository diaChiRepository;

    private static final String UPLOAD_DIR = "uploads/";

    public String saveImage(MultipartFile image) throws IOException {
        if (image.isEmpty()) {
            return null;
        }
        // Tạo tên file duy nhất
        String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
        Files.copy(image.getInputStream(), Paths.get(UPLOAD_DIR + fileName));
        return fileName;
    }

    @Transactional
    public Users createUserWithImageAndDetails(Users user, Roles role, DiaChi diaChi, MultipartFile image) throws IOException {
        // Không cần lưu ảnh trên backend, chỉ lưu vào DB
        Users savedUser = usersRepository.save(user);

        // Lưu vai trò và địa chỉ liên kết với người dùng
        role.setUsers(savedUser);
        rolesRepository.save(role);

        diaChi.setUsers(savedUser);
        diaChiRepository.save(diaChi);

        return savedUser;
    }

}
