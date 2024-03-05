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

import com.acap.api.model.Cintas;
import com.acap.api.model.Locations;
import com.acap.api.model.Status;

/**
 * Interfaz de repositorio para las cintas.
 * Extiende JpaRepository proporcionando operaciones CRUD estándar.
 */
@Repository
public interface CintasRepository extends JpaRepository<Cintas, UUID> {

  /**
   * Recupera todas las cintas ordenadas por fecha de creación de forma descendente, según el estado y la paginación especificada.
   *
   * @param status   Estado de las cintas a recuperar.
   * @param pageable Configuración de paginación.
   * @return Lista de cintas ordenadas por fecha de creación de forma descendente.
   */
  List<Cintas> findAllByStatusOrderByCreationDateDesc(boolean status, Pageable pageable);

  /**
   * Recupera cintas por su etiqueta y estado.
   *
   * @param label Etiqueta de la cinta.
   * @return Lista de cintas que coinciden con la etiqueta y estado especificados.
   */
  @Query("SELECT c FROM Cintas c " + 
         "JOIN c.statusCinta s " + 
         "WHERE s.id != 3 AND c.label = :label")
  List<Cintas> findByLabelAndStatus(@Param("label") String label);

  /**
   * Recupera cintas dentro de un rango de fechas y con un estado específico.
   *
   * @param begin Fecha de inicio del rango.
   * @param end   Fecha de fin del rango.
   * @param status Estado de las cintas a recuperar.
   * @return Lista de cintas dentro del rango de fechas y con el estado especificado.
   */
  List<Cintas> findByCreationDateBetweenAndStatus(LocalDateTime begin, LocalDateTime end, boolean status);

  /**
   * Recupera cintas cuya fecha de vencimiento sea menor o igual a la fecha especificada, el estado sea verdadero y la ubicación coincida.
   *
   * @param expiryDate Fecha límite para la fecha de vencimiento.
   * @param locationId Identificador de la ubicación de las cintas.
   * @return Lista de cintas que cumplen con los criterios especificados.
   */
  @Query("SELECT c FROM Cintas c " + 
         "JOIN c.statusCinta s " + 
         "JOIN c.location l " + 
         "WHERE c.expiryDate <= :expiryDate AND c.rententionDate > :expiryDate AND c.status = true AND l.id = :locationId")
  List<Cintas> findByExpiryDateLessThanEqualAndStatusIsTrueAndLocation(
      @Param("expiryDate") LocalDateTime expiryDate, 
      @Param("locationId") Long locationId);

  /**
   * Recupera cintas cuya fecha de retención sea menor o igual a la fecha especificada, el estado sea verdadero y la ubicación coincida.
   *
   * @param localDate Fecha límite para la fecha de retención.
   * @param location  Ubicación de las cintas.
   * @return Lista de cintas que cumplen con los criterios especificados.
   */
  List<Cintas> findByRententionDateLessThanEqualAndStatusIsTrueAndLocation(LocalDateTime localDate, Locations location);

  /**
   * Busca cintas por un término de búsqueda en el estado, etiqueta o ubicación.
   *
   * @param search Término de búsqueda.
   * @return Lista de cintas que cumplen con el término de búsqueda.
   */
  @Query("SELECT c FROM Cintas c " +
          "JOIN c.statusCinta s " +
          "JOIN c.location l " +
          "WHERE s.state LIKE %:search% " +
          "OR c.label LIKE %:search% " +
          "OR l.location LIKE %:search%")
  List<Cintas> search(@Param("search") String search);

  /**
   * Busca cintas por un término de búsqueda en el estado, etiqueta o ubicación, y dentro de un rango de fechas.
   *
   * @param search Término de búsqueda.
   * @param begin  Fecha de inicio del rango.
   * @param end    Fecha de fin del rango.
   * @return Lista de cintas que cumplen con el término de búsqueda y el rango de fechas.
   */
  @Query("SELECT c FROM Cintas c " +
          "JOIN c.statusCinta s " +
          "JOIN c.location l " +
          "WHERE (s.state LIKE %:search% " +
          "OR c.label LIKE %:search% " +
          "OR l.location LIKE %:search%) " +
          "AND c.creationDate BETWEEN :begin AND :end")
  List<Cintas> searchBetweenDates(@Param("search") String search,
          @Param("begin") LocalDateTime begin,
          @Param("end") LocalDateTime end);

  /**
   * Actualiza el estado de una cinta.
   *
   * @param cintasId   Identificador de la cinta.
   * @param newStatus  Nuevo estado de la cinta.
   */
  @Transactional
  @Modifying
  @Query("UPDATE Cintas c SET c.statusCinta = :newStatus, c.status = false WHERE c.id = :cintasId")
  void update(@Param("cintasId") UUID cintasId, @Param("newStatus") Status newStatus);

  /**
   * Cambia la ubicación de una cinta.
   *
   * @param cintasId   Identificador de la cinta.
   * @param location   Nueva ubicación de la cinta.
   */
  @Transactional
  @Modifying
  @Query("UPDATE Cintas c SET c.location = :newLocation WHERE c.id = :cintasId")
  void changeLocation(@Param("cintasId") UUID cintasId, @Param("newLocation") Locations location);

  /**
   * Actualiza el estado de cintas cuya fecha de vencimiento ha expirado.
   *
   * @param currentDate Fecha actual.
   * @param locationId  Identificador de la ubicación de las cintas.
   * @param newState    Nuevo estado de las cintas.
   */
  @Transactional
  @Modifying
  @Query("UPDATE Cintas c SET c.statusCinta = :newState WHERE c.expiryDate <= :currentDate AND c.rententionDate > :currentDate AND c.status = true AND c.location.id = :locationId")
  void updateStatusForExpiredCintas(@Param("currentDate") LocalDateTime currentDate, @Param("locationId") Long locationId, @Param("newState") Status newState);

  /**
   * Actualiza el estado de cintas cuya fecha de retención ha expirado.
   *
   * @param currentDate Fecha actual.
   * @param locationId  Identificador de la ubicación de las cintas.
   * @param newState    Nuevo estado de las cintas.
   */
  @Transactional
  @Modifying
  @Query("UPDATE Cintas c SET c.statusCinta = :newState WHERE c.rententionDate <= :currentDate AND c.status = true AND c.location.id = :locationId")
  void updateStatusForRetainedCintas(@Param("currentDate") LocalDateTime currentDate, @Param("locationId") Long locationId, @Param("newState") Status newState);
}

