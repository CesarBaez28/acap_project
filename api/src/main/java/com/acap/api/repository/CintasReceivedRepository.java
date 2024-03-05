package com.acap.api.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.acap.api.model.CintasReceived;

/**
 * Interfaz de repositorio para las cintas recibidas.
 * Extiende JpaRepository proporcionando operaciones CRUD estándar.
 */
@Repository
public interface CintasReceivedRepository extends JpaRepository<CintasReceived, UUID> {

  /**
   * Recupera las cintas recibidas dentro de un rango de fechas, ordenadas por fecha de recepción de forma descendente.
   *
   * @param startDate Fecha de inicio del rango.
   * @param endDate   Fecha de fin del rango.
   * @return Lista de cintas recibidas dentro del rango especificado.
   */
  List<CintasReceived> findByDateReceivedBetweenOrderByDateReceivedDesc(LocalDateTime startDate, LocalDateTime endDate);

  /**
   * Recupera las últimas 15 cintas recibidas de acuerdo al estado y la ubicación de destino, ordenadas por fecha de recepción de forma descendente.
   *
   * @param statusId      Identificador del estado de la cinta recibida.
   * @param locationToId  Identificador de la ubicación de destino de la cinta.
   * @param pageable      Configuración de paginación para limitar los resultados.
   * @return Lista de las últimas 15 cintas recibidas que coinciden con los criterios especificados.
   */
  @Query("SELECT cr FROM CintasReceived cr " +
      "JOIN cr.shipment s " +
      "JOIN cr.status st " +
      "JOIN s.locationTo lt " +
      "WHERE st.id = :statusId AND lt.id = :locationToId " +
      "ORDER BY cr.dateReceived DESC")
  List<CintasReceived> findTop15ByStatusIdAndLocationToIdOrderByDateDesc(
      @Param("statusId") Long statusId,
      @Param("locationToId") Long locationToId,
      Pageable pageable);

  /**
   * Recupera las cintas recibidas en una ubicación específica dentro de un rango de fechas.
   *
   * @param locationId Identificador de la ubicación de destino de la cinta.
   * @param startDate  Fecha de inicio del rango.
   * @param endDate    Fecha de fin del rango.
   * @return Lista de cintas recibidas dentro del rango especificado y en la ubicación indicada.
   */
  @Query("SELECT cr FROM CintasReceived cr " + 
      "JOIN cr.shipment s " + 
      "JOIN s.locationTo lt " + 
      "WHERE lt.id = :locationId AND cr.dateReceived BETWEEN :startDate AND :endDate")
  List<CintasReceived> findByLocationToAndBetweenDate(
    @Param("locationId") Long locationId,
    @Param("startDate") LocalDateTime startDate,
    @Param("endDate") LocalDateTime endDate);
}
