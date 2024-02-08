package com.acap.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.acap.api.model.Evidence;

import jakarta.transaction.Transactional;

@Repository
public interface EvidenceRepository extends JpaRepository<Evidence, Long> {
  @Transactional
  @Modifying
  @Query("UPDATE Evidence e SET e.name = :newName WHERE e.id = :id")
  void update(@Param("id") Long id, @Param("newName") String newName);
}
