package com.acap.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.acap.api.model.Evidence;

import jakarta.transaction.Transactional;

/**
 * Interfaz de repositorio para la entidad de evidencias.
 * Extiende JpaRepository proporcionando operaciones CRUD estándar.
 */
@Repository
public interface EvidenceRepository extends JpaRepository<Evidence, Long> {

  /**
   * Método personalizado para actualizar el nombre de una evidencia por su ID.
   * Utiliza una consulta JPQL para realizar la actualización.
   *
   * @param id      ID de la evidencia que se actualizará.
   * @param newName Nuevo nombre que se asignará a la evidencia.
   */
  @Transactional
  @Modifying
  @Query("UPDATE Evidence e SET e.name = :newName WHERE e.id = :id")
  void update(@Param("id") Long id, @Param("newName") String newName);
}

