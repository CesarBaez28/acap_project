package com.acap.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acap.api.model.Signatures;

/**
 * Interfaz de repositorio para la entidad Signatures.
 * Extiende JpaRepository proporcionando operaciones CRUD estándar.
 */
@Repository
public interface SignaturesRepository extends JpaRepository<Signatures, Long> {

}