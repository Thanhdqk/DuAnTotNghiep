package com.BaiTapLab.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.BaiTapLab.Entity.Shipper;
import com.BaiTapLab.Entity.Users;

public interface ShipperRepository extends JpaRepository<Shipper, String>{
	Optional<Shipper> findByShipperIDAndPassword(String shipperID, String password);
	Shipper findByShipperID(String shipperID);
}
