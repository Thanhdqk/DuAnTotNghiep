package com.BaiTapLab.RestController;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.BaiTapLab.DTO.ResponeDTO;
import com.BaiTapLab.Entity.Feedback;
import com.BaiTapLab.Entity.HanhDong;
import com.BaiTapLab.Entity.Respone;
import com.BaiTapLab.Entity.Users;
import com.BaiTapLab.Repository.FeedbackRepository;
import com.BaiTapLab.Repository.HanhDongRepository;
import com.BaiTapLab.Repository.ResponeRepository;
import com.BaiTapLab.Repository.UsersRepository;

@RestController
@RequestMapping("respone")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RescontrollerResponePhat {
	@Autowired
	FeedbackRepository feedbackRepository;
	@Autowired
	ResponeRepository responeRepository;

	@Autowired
	HanhDongRepository dongRepository;
	@Autowired
	UsersRepository usersRepository;

	@PostMapping("do")
	public void dorespone(@RequestBody Respone res, @RequestParam("accountId") String accountId,
			@RequestParam("feedbackID") Integer feedbackID) {
		Feedback feedback = feedbackRepository.findById(feedbackID).get();
		Users u = usersRepository.findById(accountId).get();

		res.setNgay_tao(LocalDate.now());
		res.setFeedback(feedback);
		res.setUsers(u);
		res.setLoai_yeu_cau(feedback.getLoai_yeu_cau());
		res.setNoi_dung(res.getNoi_dung());
		HanhDong hanhdong = new HanhDong();
		System.out.println(res);

		try {
			responeRepository.save(res);
			hanhdong.setRespone(res);
			hanhdong.setTen_hanh_dong("Đã phản hồi");
			hanhdong.setNgay_hanh_dong(LocalDate.now());
			hanhdong.setUsers(u);

			dongRepository.save(hanhdong);

			feedback.setTrang_thai("Đã phản hồi");
			feedbackRepository.save(feedback);

		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println(res);
	}

	@GetMapping("findall")
	public List<Respone> findall() {
		return responeRepository.findAll();
	}

	@GetMapping("findallfeedbackshavebeenresponed")
	public List<Respone> getallfeedbackbeenresponed() {
		return responeRepository.findAll();

	}

	@GetMapping("feedbackreason")
	public List<String> feedbackreason() {
		String[] reason = new String[] { "Sai sản phẩm", "Sai số lượng sản phẩm", "Sai giá sản phẩm",
				"Giao hàng sai sản phẩm", "Hoàn tiền chưa được chấp thuận" };

		return Arrays.asList(reason);
	}

	@GetMapping("FindAllWithDTO")
	public List<ResponeDTO> getbydto() {
		return dongRepository.findHanhDongRespone();
	}
}