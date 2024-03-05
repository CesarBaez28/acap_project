package com.acap.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acap.api.model.Locations;

/**
 * Interfaz de repositorio para la entidad Locations.
 * Extiende JpaRepository proporcionando operaciones CRUD estándar.
 */
@Repository
public interface LocationRepository extends JpaRepository<Locations, Long> {
  
}

