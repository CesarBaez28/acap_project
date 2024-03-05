package com.acap.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.acap.api.model.Shipments;
import com.acap.api.model.ShipmentsNotifications;

import jakarta.transaction.Transactional;

/**
 * Interfaz de repositorio para la entidad ShipmentsNotifications.
 * Extiende JpaRepository proporcionando operaciones CRUD estándar.
 */
@Repository
public interface ShipmentsNotificationsRepository extends JpaRepository<ShipmentsNotifications, Long> {

  /**
   * Elimina las notificaciones de envíos asociadas a un envío específico.
   *
   * @param shipments Envío del cual se desean eliminar las notificaciones.
   */
  @Modifying
  @Transactional
  @Query("DELETE FROM ShipmentsNotifications sn WHERE sn.shipment = :shipments")
  void deleteByShipments(@Param("shipments") Shipments shipments);

  /**
   * Obtiene una lista de notificaciones de envíos asociadas a una ubicación específica.
   *
   * @param locationId ID de la ubicación para la cual se desean obtener las notificaciones de envíos.
   * @return Lista de notificaciones de envíos asociadas a la ubicación.
   */
  @Query("SELECT sn FROM ShipmentsNotifications sn " +
         "JOIN sn.shipment s " +
         "WHERE s.locationTo.id = :locationId")
  List<ShipmentsNotifications> findByLocationToId(@Param("locationId") Long locationId);
}
