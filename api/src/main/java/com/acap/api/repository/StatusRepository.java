package com.acap.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acap.api.model.Status;

/**
 * Interfaz de repositorio para la entidad Status.
 * Extiende JpaRepository proporcionando operaciones CRUD estándar.
 */
@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {

}

