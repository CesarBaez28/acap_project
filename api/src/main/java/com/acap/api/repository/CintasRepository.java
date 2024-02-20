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

import com.acap.api.model.Cintas;
import com.acap.api.model.Locations;
import com.acap.api.model.Status;

@Repository
public interface CintasRepository extends JpaRepository<Cintas, UUID> {
    List<Cintas> findAllByStatusOrderByCreationDateDesc(boolean status, Pageable pageable);

    @Query("SELECT c FROM Cintas c " + 
           "JOIN c.statusCinta s " + 
           "WHERE s.id != 3 AND c.label = :label")
    List<Cintas> findByLabelAndStatus(@Param("label") String label);

    List<Cintas> findByCreationDateBetweenAndStatus(LocalDateTime begin, LocalDateTime end, boolean status);

    
    @Query("SELECT c FROM Cintas c " + 
           "JOIN c.statusCinta s " + 
           "JOIN c.location l " + 
           "WHERE c.expiryDate <= :expiryDate AND c.rententionDate > :expiryDate AND c.status = true AND l.id = :locationId")
    List<Cintas> findByExpiryDateLessThanEqualAndStatusIsTrueAndLocation(
        @Param("expiryDate") LocalDateTime expiryDate, 
        @Param("locationId") Long locationId);

    List<Cintas> findByRententionDateLessThanEqualAndStatusIsTrueAndLocation(LocalDateTime localDate, Locations location);

    @Query("SELECT c FROM Cintas c " +
            "JOIN c.statusCinta s " +
            "JOIN c.location l " +
            "WHERE s.state LIKE %:search% " +
            "OR c.label LIKE %:search% " +
            "OR l.location LIKE %:search%")
    List<Cintas> search(@Param("search") String search);

    @Query("SELECT c FROM Cintas c " +
            "JOIN c.statusCinta s " +
            "JOIN c.location l " +
            "WHERE (s.state LIKE %:search% " +
            "OR c.label LIKE %:search% " +
            "OR l.location LIKE %:search%) " +
            "AND c.creationDate BETWEEN :begin AND :end")
    List<Cintas> searchBetweenDates(@Param("search") String search,
            @Param("begin") LocalDateTime begin,
            @Param("end") LocalDateTime end);

    @Transactional
    @Modifying
    @Query("UPDATE Cintas c SET c.statusCinta = :newStatus, c.status = false WHERE c.id = :cintasId")
    void update(@Param("cintasId") UUID cintasId, @Param("newStatus") Status newStatus);

    @Transactional
    @Modifying
    @Query("UPDATE Cintas c SET c.location = :newLocation WHERE c.id = :cintasId")
    void changeLocation(@Param("cintasId") UUID cintasId, @Param("newLocation") Locations location);

    @Transactional
    @Modifying
    @Query("UPDATE Cintas c SET c.statusCinta = :newState WHERE c.expiryDate <= :currentDate AND c.rententionDate > :currentDate AND c.status = true AND c.location.id = :locationId")
    void updateStatusForExpiredCintas(@Param("currentDate") LocalDateTime currentDate, @Param("locationId") Long locationId, @Param("newState") Status newState);

    @Transactional
    @Modifying
    @Query("UPDATE Cintas c SET c.statusCinta = :newState WHERE c.rententionDate <= :currentDate AND c.status = true AND c.location.id = :locationId")
    void updateStatusForRetainedCintas(@Param("currentDate") LocalDateTime currentDate, @Param("locationId") Long locationId, @Param("newState") Status newState);
}
