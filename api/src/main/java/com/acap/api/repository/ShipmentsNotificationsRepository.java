package com.acap.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.acap.api.model.Shipments;
import com.acap.api.model.ShipmentsNotifications;

import jakarta.transaction.Transactional;

@Repository
public interface ShipmentsNotificationsRepository extends JpaRepository<ShipmentsNotifications, Long>{
  
  @Modifying
  @Transactional
  @Query("DELETE FROM ShipmentsNotifications sn WHERE sn.shipment = :shipments")
  void deleteByShipments(@Param("shipments") Shipments shipments);

  @Query("SELECT sn FROM ShipmentsNotifications sn " + 
         "JOIN sn.shipment s " + 
         "WHERE s.locationTo.id = :locationId")
  List<ShipmentsNotifications> findByLocationToId(@Param("locationId") Long locationId);
  
}
