package com.BaiTapLab.Service;

import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Entity.Roles;
import com.BaiTapLab.Entity.DiaChi;
import com.BaiTapLab.Repository.UserRepository;
import com.BaiTapLab.Repository.RoleRepository;
import com.BaiTapLab.Repository.DiaChiRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

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

	public void updateUser(Users user) {
		userRepository.save(user);
	}

	public Users login(String email, String password) {
		Optional<Users> user = userRepository.findByAccountIDAndPassword(email, password);
		return user.orElse(null);
	}

	public List<DiaChi> getUserAddresses(String accountID) {
		Optional<Users> userOptional = userRepository.findById(accountID);
		if (userOptional.isPresent()) {
			return diaChiRepository.findByUsers(userOptional.get());
		} else {
			throw new RuntimeException("User not found.");
		}
	}

	// Lấy địa chỉ bằng ID
	public Optional<DiaChi> getAddressById(int addressId) {
		return diaChiRepository.findById(addressId);
	}

	// Lưu hoặc cập nhật địa chỉ
	public void saveAddress(DiaChi address) {
		diaChiRepository.save(address);
	}

	// Thêm hoặc cập nhật địa chỉ
	public void addOrUpdateUserAddress(String accountID, DiaChi newAddress) {
		Optional<Users> userOptional = userRepository.findById(accountID);
		if (userOptional.isPresent()) {
			Users user = userOptional.get();
			newAddress.setUsers(user);
			diaChiRepository.save(newAddress);
		} else {
			throw new RuntimeException("User not found.");
		}
	}

	// Lấy thông tin người dùng
	public Optional<Users> getUserById(String id) {
		return userRepository.findById(id);
	}

}
