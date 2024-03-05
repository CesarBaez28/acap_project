package com.acap.api.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.acap.api.model.Shipments;
import com.acap.api.model.ShipmentsCintas;
import com.acap.api.model.ShipmentsCintasKey;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Interfaz de repositorio para la entidad ShipmentsCintas.
 * Extiende JpaRepository proporcionando operaciones CRUD estándar.
 */
@Repository
public interface ShipmentsCintasRepository extends JpaRepository<ShipmentsCintas, ShipmentsCintasKey> {

  /**
   * Obtiene una lista de ShipmentsCintas asociadas a un envío específico.
   *
   * @param shipments Envío del cual se desea obtener las ShipmentsCintas.
   * @return Lista de ShipmentsCintas asociadas al envío.
   */
  List<ShipmentsCintas> findAllByShipments(Shipments shipments);

  /**
   * Elimina las ShipmentsCintas asociadas a un envío específico.
   *
   * @param shipments Envío del cual se desean eliminar las ShipmentsCintas.
   */
  @Modifying
  @Transactional
  @Query("DELETE FROM ShipmentsCintas sc WHERE sc.shipments = :shipments")
  void deleteByShipments(@Param("shipments") Shipments shipments);

  /**
   * Obtiene una lista de las últimas 15 ShipmentsCintas asociadas a un usuario, ordenadas por ID descendente.
   *
   * @param userId    ID del usuario del cual se desean obtener las ShipmentsCintas.
   * @param pageable  Configuración para la paginación.
   * @return Lista de las últimas 15 ShipmentsCintas asociadas al usuario.
   */
  @Query("SELECT sc FROM ShipmentsCintas sc " +
      "JOIN sc.shipments s " +
      "WHERE s.user.id = :userId " +
      "ORDER BY sc.id DESC")
  List<ShipmentsCintas> findTop15ByUserIdOrderByDesc(@Param("userId") UUID userId, Pageable pageable);
}

