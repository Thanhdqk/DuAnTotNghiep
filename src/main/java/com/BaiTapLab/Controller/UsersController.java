package com.BaiTapLab.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.UserRepository;
import com.BaiTapLab.Service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UsersController { 

    @Autowired
    private UserRepository userService;

    @GetMapping
    public List<Users> getAllUsers() {
    	System.out.println("dsa");
    	List<Users> list =userService.findAll();
    	System.out.println(list);
        return list;
    }

    @PostMapping
    public ResponseEntity<Users> createUser(@RequestBody Users user) { 
        Users createdUser = userService.save(user);
        System.out.println("quần què");
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
       
    }

    @PutMapping("/{accountId}")
    public ResponseEntity<Users> updateUser(@PathVariable String accountId, @RequestBody Users user) { 
        Users updatedUser = userService.save(user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }
//
    @DeleteMapping("/{accountId}")
    public ResponseEntity<Void> deleteUser(@PathVariable String accountId) {
        userService.deleteById(accountId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
