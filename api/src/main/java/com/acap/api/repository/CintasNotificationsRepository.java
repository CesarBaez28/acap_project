package com.acap.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.acap.api.model.CintasNotifications;

/**
 * Interfaz de repositorio para las notificaciones de cintas.
 * Extiende JpaRepository proporcionando operaciones CRUD estándar.
 */
@Repository
public interface CintasNotificationsRepository extends JpaRepository<CintasNotifications, Long> {

  /**
   * Consulta personalizada para recuperar las notificaciones de cintas basadas en la ubicación de la cinta.
   *
   * @param locationId Identificador de la ubicación de la cinta.
   * @return Lista de notificaciones de cintas asociadas a la ubicación especificada.
   */
  @Query("SELECT cn FROM CintasNotifications cn " + 
         "JOIN cn.cinta c " +
         "WHERE c.location.id = :locationId")
  List<CintasNotifications> findByCintaLocation(@Param("locationId") Long locationId);
}

