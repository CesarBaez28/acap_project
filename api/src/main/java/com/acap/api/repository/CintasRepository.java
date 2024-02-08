package com.acap.api.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

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
    List<Cintas> findAllByStatusOrderByCreationDateAsc(boolean status);

    @Query("SELECT c FROM Cintas c " + 
           "JOIN c.statusCinta s " + 
           "WHERE s.id != 3 AND c.label = :label")
    List<Cintas> findByLabelAndStatus(@Param("label") String label);

    List<Cintas> findByCreationDateBetweenAndStatus(LocalDateTime begin, LocalDateTime end, boolean status);

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
}
