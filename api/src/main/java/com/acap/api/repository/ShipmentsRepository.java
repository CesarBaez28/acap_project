package com.acap.api.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.acap.api.model.Shipments;
import com.acap.api.model.Status;

@Repository
public interface ShipmentsRepository extends JpaRepository<Shipments, UUID> {

  List<Shipments> findByDateBetweenOrderByDateDesc(LocalDateTime startDate, LocalDateTime endDate);

  @Query("SELECT s FROM Shipments s " +
      "JOIN s.user u " +
      "WHERE u.id = :userId ORDER BY s.date DESC")
  List<Shipments> findTop15ByUserIdOrderByDesc(@Param("userId") UUID userId, Pageable pageable);

  @Query("SELECT s FROM Shipments s " +
      "JOIN s.status st " +
      "JOIN s.locationTo lt " +
      "WHERE st.id = :statusId AND lt.id = :locationToId " +
      "ORDER BY s.date DESC")
  List<Shipments> findByStatusIdAndLocationToIdOrderByDateDesc(
      @Param("statusId") Long statusId,
      @Param("locationToId") Long locationToId);

  @Query("SELECT s FROM Shipments s " +
      "JOIN s.user u " +
      "WHERE u.id = :userId AND s.date BETWEEN :startDate AND :endDate")
  List<Shipments> findByUserIdAndDateBetween(
      @Param("userId") UUID userId,
      @Param("startDate") LocalDateTime startDate,
      @Param("endDate") LocalDateTime endDate);

  @Transactional
  @Modifying
  @Query("UPDATE Shipments s SET s.status = :newStatus WHERE s.id = :shipmentId")
  void updateStatus(@Param("newStatus") Status newStatus, @Param("shipmentId") UUID shipmentId);
}
