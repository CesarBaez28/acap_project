package com.acap.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acap.api.model.Positions;
import com.acap.api.model.PositionsPrivileges;
import com.acap.api.model.PositionsPrivilegesKey;

/**
 * Interfaz de repositorio para la entidad PositionsPrivileges.
 * Extiende JpaRepository proporcionando operaciones CRUD estándar.
 */
@Repository
public interface PositionsPrivilegesRepository extends JpaRepository<PositionsPrivileges, PositionsPrivilegesKey> {

  /**
   * Recupera todas las asignaciones de privilegios para una posición dada.
   *
   * @param positions La posición para la que se desean recuperar las asignaciones de privilegios.
   * @return Lista de asignaciones de privilegios para la posición dada.
   */
  List<PositionsPrivileges> findAllByPositions(Positions positions);
}
