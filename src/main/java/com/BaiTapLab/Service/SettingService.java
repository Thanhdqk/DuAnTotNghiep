package com.BaiTapLab.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.BaiTapLab.Entity.Settings;
import com.BaiTapLab.Repository.SettingsRepository;

@Service
public class SettingService {
	@Autowired
	SettingsRepository settingsRepository;
	
	public Settings updateSettings(Settings updatedSettings) throws Exception {
        // Kiểm tra xem thương hiệu có tồn tại không
        if (!settingsRepository.existsById(updatedSettings.getSettingid())) {
            throw new Exception("Settings not found with ID: " + updatedSettings.getSettingid());
        }

        // Cập nhật voucher trong cơ sở dữ liệu
        return settingsRepository.save(updatedSettings);
    }
	
	public Settings findBySettingsID(String settingid) {
	    return settingsRepository.findById(settingid)
	            .orElseThrow();
	}
}
