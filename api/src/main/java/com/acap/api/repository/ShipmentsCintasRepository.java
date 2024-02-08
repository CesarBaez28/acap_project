package com.acap.api.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.acap.api.model.Shipments;
import com.acap.api.model.ShipmentsCintas;
import com.acap.api.model.ShipmentsCintasKey;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
public interface ShipmentsCintasRepository extends JpaRepository<ShipmentsCintas, ShipmentsCintasKey> {
  List<ShipmentsCintas> findAllByShipments(Shipments shipments);

  @Modifying
  @Transactional
  @Query("DELETE FROM ShipmentsCintas sc WHERE sc.shipments = :shipments")
  void deleteByShipments(@Param("shipments") Shipments shipments);

  @Query("SELECT sc FROM ShipmentsCintas sc " +
      "JOIN sc.shipments s " +
      "WHERE s.user.id = :userId " +
      "ORDER BY sc.id DESC")
  List<ShipmentsCintas> findTop15ByUserIdOrderByDesc(@Param("userId") UUID userId, Pageable pageable);

}
