package com.BaiTapLab.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.DiaChi;
import com.BaiTapLab.Entity.Roles;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.DiaChiRepository;
import com.BaiTapLab.Repository.RoleRepository;
import com.BaiTapLab.Repository.UsersRepository;

@Service
public class UsersService {

	@Autowired
	private UsersRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private DiaChiRepository diaChiRepository;

	@Autowired
	private MailService mailService; // Assuming you have a MailService for sending emails

	private Map<String, String> otpStorage = new HashMap<>(); // Store OTPs for email
	// Thêm phương thức để lưu người dùng mới

	public Users saveUser(Users user) {
		return userRepository.save(user);
	}

	// Thêm phương thức để xóa người dùng bằng accountID
	public void deleteUserById(String id) {
		userRepository.deleteById(id);
	}

	public String sendOtp(String email) {
		// Generate a 6-digit OTP
		String otp = String.format("%06d", new Random().nextInt(999999));

		// Store the OTP for later verification
		otpStorage.put(email, otp);

		// Send OTP via email (using a hypothetical MailService)
		String subject = "Your OTP Code";
		String message = "Your OTP code is: " + otp;

		mailService.sendMail(email, subject, message); // Implement mail sending in MailService

		return "OTP sent successfully";
	}

	public String verifyOtp(String email, String otp) {
		// Check if OTP matches the stored value
		String storedOtp = otpStorage.get(email);

		if (storedOtp != null && storedOtp.equals(otp)) {
			otpStorage.remove(email); // Remove OTP after successful verification
			return "OTP verified successfully";
		} else {
			return "Invalid OTP";
		}
	}

	 public Users registerUser(String email, String password, String fullName, String phoneNumber, String address) {
	        if (userRepository.existsByAccountID(email)) {
	            return null; // Email already exists
	        }

	        // Create a new user
	        Users user = new Users();
	        user.setAccountID(email); // Set email as accountID
	        user.setPassword(password);
	        user.setHovaten(fullName); // Set full name
	        user.setSo_dien_thoai(phoneNumber); // Set phone number

	        // Save the user
	        Users savedUser = userRepository.save(user);

	        // Assign default role to the user
	        Roles role = new Roles();
	        role.setTen_vai_tro("USER"); // Default role is "USER"
	        role.setUsers(savedUser); // Link to the new user
	        roleRepository.save(role);

	        // Save the user's address if provided
	        if (address != null && !address.isEmpty()) {
	            DiaChi diaChi = new DiaChi();
	            diaChi.setDia_chi(address);
	            diaChi.setUsers(savedUser); // Set the user for the address
	            diaChiRepository.save(diaChi);
	        }

	        return savedUser;
	    }

	public Optional<Users> getUserById(String id) { // Updated to accept String since accountID is a String
		return userRepository.findById(id);
	}

	public Optional<DiaChi> getUserAddress(String accountID) {
		Optional<Users> userOptional = userRepository.findById(accountID);
		return userOptional.flatMap(user -> diaChiRepository.findByUsers(user).stream().findFirst());
	}

	public void updateUser(Users user) {
		userRepository.save(user);
	}

	public Users login(String email, String password) {
		Optional<Users> user = userRepository.findByAccountIDAndPassword(email, password);
		return user.orElse(null);
	}

	// Add this method to UserService class
	public void updateUserAddress(String accountID, DiaChi newAddress) {
		Optional<Users> userOptional = userRepository.findById(accountID);
		if (!userOptional.isPresent()) {
			throw new RuntimeException("User not found"); // Handle the case where user is not found
		}

		Users user = userOptional.get();
		List<DiaChi> existingAddresses = diaChiRepository.findByUsers(user);

		if (!existingAddresses.isEmpty()) {
			DiaChi existingAddress = existingAddresses.get(0); // Assuming you want to update the first address
			existingAddress.setDia_chi(newAddress.getDia_chi()); // Update the address
			diaChiRepository.save(existingAddress);
		} else {
			// Optionally, if no existing address is found, you can create a new address
			newAddress.setUsers(user);
			diaChiRepository.save(newAddress);
		}
	}

	// Update the UserService class
	public void addOrUpdateUserAddress(String accountID, String address) {
		Optional<Users> userOptional = userRepository.findById(accountID);
		if (userOptional.isPresent()) {
			Users user = userOptional.get();

			// Check if there's an existing address
			List<DiaChi> existingAddresses = diaChiRepository.findByUsers(user);
			DiaChi diaChi;

			if (!existingAddresses.isEmpty()) {
				// Update the first existing address (or modify logic to handle multiple
				// addresses as needed)
				diaChi = existingAddresses.get(0); // You might want to specify which address to update
				diaChi.setDia_chi(address);
			} else {
				// Create a new DiaChi object if no existing address
				diaChi = new DiaChi();
				diaChi.setDia_chi(address);
				diaChi.setUsers(user); // Set the user
			}

			// Save the address to the repository
			diaChiRepository.save(diaChi);
			System.out.println("Address saved/updated successfully!");
		} else {
			System.out.println("User not found!");
		}
	}
}
