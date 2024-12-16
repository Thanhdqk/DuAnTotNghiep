package com.BaiTapLab.RestController;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate; // Import LocalDate
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.BaiTapLab.Entity.Feedback;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.FeedbackRepository;
import com.BaiTapLab.Repository.UsersRepository;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackControllerQuang {

	@Autowired
	private FeedbackRepository feedbackRepository;

	@Autowired
	private UsersRepository usersRepository;

	@GetMapping("/findall")
	public ResponseEntity<List<Feedback>> getallfeedback() {
		List<Feedback> feedbackList = feedbackRepository.findallwithsentstatus("Đã gửi");
		if (feedbackList.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK).body(feedbackList);
		}
		return ResponseEntity.ok(feedbackList);
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<List<Feedback>> getFeedbackHistory(@PathVariable String userId) {
		List<Feedback> feedbackList = feedbackRepository.findByUsers_AccountID(userId);
		if (feedbackList.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		return ResponseEntity.ok(feedbackList);
	}

	@PostMapping("/upload")
	public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
		// Define the directory where images will be saved
		String uploadDir = "images/uploads/";
		File directory = new File(uploadDir);
		if (!directory.exists()) {
			directory.mkdirs(); // Create the directory if it does not exist
		}

		// Generate a unique filename to avoid collisions
		String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
		Path filePath = Paths.get(uploadDir, filename);

		try {
			// Save the file to the specified location
			file.transferTo(filePath);

			// Return only the filename in the response
			return ResponseEntity.ok(filename);

		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
		}
	}

	@PostMapping
	public ResponseEntity<String> saveFeedback(@RequestBody FeedbackRequest feedbackRequest) {
		Optional<Users> userOptional = usersRepository.findById(feedbackRequest.getUserId());
		if (!userOptional.isPresent()) {
			return ResponseEntity.badRequest().body("User not found");
		}

		Feedback feedback = new Feedback();
		feedback.setLoai_yeu_cau(feedbackRequest.getLoai_yeu_cau());
		feedback.setNoi_dung(feedbackRequest.getNoi_dung());
		feedback.setHinh_anh(feedbackRequest.getHinh_anh()); // Save just the filename
		feedback.setTrang_thai(feedbackRequest.getTrang_thai());

		// Set the creation date to now using LocalDate
		feedback.setNgay_tao(LocalDate.now()); // Set the creation date to now

		feedback.setUsers(userOptional.get());

		feedbackRepository.save(feedback);
		return ResponseEntity.ok("Feedback saved successfully");
	}

	// DTO to receive data from frontend
	public static class FeedbackRequest {
		private String loai_yeu_cau;
		private String noi_dung;
		private String hinh_anh;
		private String trang_thai;
		private String userId; // accountID from localStorage

		// Getters and setters
		public String getLoai_yeu_cau() {
			return loai_yeu_cau;
		}

		public void setLoai_yeu_cau(String loai_yeu_cau) {
			this.loai_yeu_cau = loai_yeu_cau;
		}

		public String getNoi_dung() {
			return noi_dung;
		}

		public void setNoi_dung(String noi_dung) {
			this.noi_dung = noi_dung;
		}

		public String getHinh_anh() {
			return hinh_anh;
		}

		public void setHinh_anh(String hinh_anh) {
			this.hinh_anh = hinh_anh;
		}

		public String getTrang_thai() {
			return trang_thai;
		}

		public void setTrang_thai(String trang_thai) {
			this.trang_thai = trang_thai;
		}

		public String getUserId() {
			return userId;
		}

		public void setUserId(String userId) {
			this.userId = userId;
		}
	}
}