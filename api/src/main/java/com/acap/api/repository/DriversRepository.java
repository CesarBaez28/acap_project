package com.acap.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acap.api.model.Drivers;

/**
 * Interfaz de repositorio para los conductores.
 * Extiende JpaRepository proporcionando operaciones CRUD estándar.
 */
@Repository
public interface DriversRepository extends JpaRepository<Drivers, Long> {
  
  // Métodos CRUD proporcionados por JpaRepository
}

