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
import java.util.List;
import java.util.UUID;

@Service
public class UsersService {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private RoleRepository rolesRepository;

    @Autowired
    private DiaChiRepository diaChiRepository;
    
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

    public List<Object[]> getAllUsersWithAddress() {
        return usersRepository.findAllUserWithAddress();
    }
    
    public Users findByAccountID(String accountID) {
        return usersRepository.findByAccountID(accountID);
    }
    
    public List<Object[]> listUsers() {
        return usersRepository.listUsers();
    }
    
    public boolean existsByAccountID(String accountID) {
        return usersRepository.existsByAccountID(accountID);
    }

}
