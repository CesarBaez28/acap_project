package com.acap.api.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.acap.api.model.CintasReceived;

@Repository
public interface CintasReceivedRepository extends JpaRepository<CintasReceived, UUID> {

  List<CintasReceived> findByDateReceivedBetweenOrderByDateReceivedDesc(LocalDateTime startDate, LocalDateTime endDate);

  @Query("SELECT cr FROM CintasReceived cr " +
      "JOIN cr.shipment s " +
      "JOIN cr.status st " +
      "JOIN s.locationTo lt " +
      "WHERE st.id = :statusId AND lt.id = :locationToId " +
      "ORDER BY cr.dateReceived DESC")
  List<CintasReceived> findTop15ByStatusIdAndLocationToIdOrderByDateDesc(
      @Param("statusId") Long statusId,
      @Param("locationToId") Long locationToId,
      Pageable pageable);

  @Query("SELECT cr FROM CintasReceived cr " + 
      "JOIN cr.shipment s " + 
      "JOIN s.locationTo lt " + 
      "WHERE lt.id = :locationId AND cr.dateReceived BETWEEN :startDate AND :endDate")
  List<CintasReceived> findByLocationToAndBetweenDate(
    @Param("locationId") Long locationId,
    @Param("startDate") LocalDateTime startDate,
    @Param("endDate") LocalDateTime endDate);
}
