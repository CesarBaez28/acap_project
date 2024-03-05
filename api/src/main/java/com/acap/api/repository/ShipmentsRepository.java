package com.acap.api.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.acap.api.model.Shipments;
import com.acap.api.model.Status;

/**
 * Interfaz de repositorio para la entidad Shipments.
 * Extiende JpaRepository proporcionando operaciones CRUD estándar.
 */
@Repository
public interface ShipmentsRepository extends JpaRepository<Shipments, UUID> {

  /**
   * Obtiene una lista de envíos cuyas fechas se encuentran en un rango específico, ordenadas por fecha de forma descendente.
   *
   * @param startDate Fecha de inicio del rango.
   * @param endDate   Fecha de fin del rango.
   * @return Lista de envíos dentro del rango, ordenados por fecha de forma descendente.
   */
  List<Shipments> findByDateBetweenOrderByDateDesc(LocalDateTime startDate, LocalDateTime endDate);

  /**
   * Obtiene una lista de los últimos 15 envíos realizados por un usuario, ordenados por fecha de forma descendente.
   *
   * @param userId    ID del usuario.
   * @param pageable  Interfaz para representar la paginación y la ordenación de resultados.
   * @return Lista de los últimos 15 envíos realizados por el usuario.
   */
  @Query("SELECT s FROM Shipments s " +
         "JOIN s.user u " +
         "WHERE u.id = :userId ORDER BY s.date DESC")
  List<Shipments> findTop15ByUserIdOrderByDesc(@Param("userId") UUID userId, Pageable pageable);

  /**
   * Obtiene una lista de envíos con un estado y ubicación de destino específicos, ordenados por fecha de forma descendente.
   *
   * @param statusId      ID del estado del envío.
   * @param locationToId  ID de la ubicación de destino.
   * @return Lista de envíos con el estado y ubicación de destino especificados.
   */
  @Query("SELECT s FROM Shipments s " +
         "JOIN s.status st " +
         "JOIN s.locationTo lt " +
         "WHERE st.id = :statusId AND lt.id = :locationToId " +
         "ORDER BY s.date DESC")
  List<Shipments> findByStatusIdAndLocationToIdOrderByDateDesc(
      @Param("statusId") Long statusId,
      @Param("locationToId") Long locationToId);

  /**
   * Obtiene una lista de envíos realizados por un usuario dentro de un rango de fechas específico.
   *
   * @param userId      ID del usuario.
   * @param startDate   Fecha de inicio del rango.
   * @param endDate     Fecha de fin del rango.
   * @return Lista de envíos realizados por el usuario dentro del rango de fechas.
   */
  @Query("SELECT s FROM Shipments s " +
         "JOIN s.user u " +
         "WHERE u.id = :userId AND s.date BETWEEN :startDate AND :endDate")
  List<Shipments> findByUserIdAndDateBetween(
      @Param("userId") UUID userId,
      @Param("startDate") LocalDateTime startDate,
      @Param("endDate") LocalDateTime endDate);

  /**
   * Actualiza el estado de un envío.
   *
   * @param newStatus   Nuevo estado del envío.
   * @param shipmentId  ID del envío que se actualizará.
   */
  @Transactional
  @Modifying
  @Query("UPDATE Shipments s SET s.status = :newStatus WHERE s.id = :shipmentId")
  void updateStatus(@Param("newStatus") Status newStatus, @Param("shipmentId") UUID shipmentId);
}
