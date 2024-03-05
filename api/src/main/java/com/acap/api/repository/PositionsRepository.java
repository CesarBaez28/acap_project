package com.acap.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acap.api.model.Positions;

/**
 * Interfaz de repositorio para la entidad Positions.
 * Extiende JpaRepository proporcionando operaciones CRUD estándar.
 */
@Repository
public interface PositionsRepository extends JpaRepository<Positions, Long> {

}

