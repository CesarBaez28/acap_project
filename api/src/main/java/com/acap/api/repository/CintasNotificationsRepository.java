package com.acap.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.acap.api.model.CintasNotifications;

@Repository
public interface CintasNotificationsRepository extends JpaRepository<CintasNotifications, Long>{

  @Query("SELECT cn FROM CintasNotifications cn " + 
         "JOIN cn.cinta c " +
         "WHERE c.location.id = :locationId")
  List<CintasNotifications> findByCintaLocation (@Param("locationId") Long locationId); 
}
