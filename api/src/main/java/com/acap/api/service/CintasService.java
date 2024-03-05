package com.acap.api.service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.acap.api.Constants;
import com.acap.api.model.Cintas;
import com.acap.api.model.Locations;
import com.acap.api.model.Status;
import com.acap.api.repository.CintasRepository;
import com.acap.api.repository.LocationRepository;
import com.acap.api.repository.StatusRepository;

/**
 * Servicio para la gestión de cintas.
 * Proporciona métodos para obtener, buscar, y gestionar cintas en el sistema.
 */
@Service
public class CintasService {

  private final CintasRepository cintasRepository;
  private final LocationRepository locationsRepository;
  private final StatusRepository statusRepository;

  /**
   * Constructor que inyecta las dependencias necesarias para el servicio.
   *
   * @param cintasRepository Repositorio de cintas.
   * @param locationsRepository Repositorio de ubicaciones.
   * @param statusRepository Repositorio de estados.
   */
  public CintasService (CintasRepository cintasRepository, LocationRepository locationsRepository, StatusRepository statusRepository) {
    this.cintasRepository = cintasRepository;
    this.locationsRepository = locationsRepository;
    this.statusRepository = statusRepository;
  }

  /**
   * Obtiene las 15 cintas más recientes ordenadas por fecha de creación de forma descendente.
   *
   * @param status Estado de las cintas a recuperar.
   * @return Lista de las 15 cintas más recientes.
   */
  public List<Cintas> getCintas(boolean status) { 
    Pageable pageable = PageRequest.of(0, 15);
    return cintasRepository.findAllByStatusOrderByCreationDateDesc(status, pageable);
  }

  /**
   * Busca cintas por una cadena de búsqueda.
   *
   * @param search Cadena de búsqueda.
   * @return Lista de cintas que coinciden con la búsqueda.
   */
  public List<Cintas> search(String search) {
    return cintasRepository.search(search);
  }

  /**
   * Busca cintas por una cadena de búsqueda y entre dos fechas.
   *
   * @param search Cadena de búsqueda.
   * @param begin Fecha de inicio.
   * @param end Fecha de fin.
   * @return Lista de cintas que coinciden con la búsqueda y están en el rango de fechas.
   */
  public List<Cintas> searchBetweenDates(String search, String begin, String end) {
    LocalDateTime initialDate = LocalDateTime.parse(begin);
    LocalDateTime finalDate = LocalDateTime.parse(end);
    return cintasRepository.searchBetweenDates(search, initialDate, finalDate);
  }

  /**
   * Obtiene todas las cintas en un rango de fechas y con un estado específico.
   *
   * @param begin Fecha de inicio.
   * @param end Fecha de fin.
   * @param status Estado de las cintas a recuperar.
   * @return Lista de cintas en el rango de fechas y con el estado proporcionado.
   */
  public List<Cintas> getCintasBetweenDates(String begin, String end, boolean status) {
    LocalDateTime initialDate = LocalDateTime.parse(begin);
    LocalDateTime finalDate = LocalDateTime.parse(end);
    return cintasRepository.findByCreationDateBetweenAndStatus(initialDate, finalDate, status);
  }

  /**
   * Obtiene cintas por etiqueta y estado.
   *
   * @param label Etiqueta de las cintas a recuperar.
   * @return Lista de cintas con la etiqueta proporcionada y en el estado especificado.
   */
  public List<Cintas> getCintaByLabel(String label) {
    return cintasRepository.findByLabelAndStatus(label);
  }

  /**
   * Guarda o actualiza una cinta, asignando la ubicación y estado correspondientes.
   *
   * @param cintas La cinta a guardar o actualizar.
   * @return La cinta guardada o actualizada.
   */
  @SuppressWarnings("null")
  public Cintas saveCinta(Cintas cintas) {
    Optional<Locations> locationData = locationsRepository.findById(cintas.getLocation().getId());
    Optional<Status> statusData = statusRepository.findById(cintas.getStatusCinta().getId()); 

    if (locationData.isPresent()) { cintas.setLocation(locationData.get()); }
    if (statusData.isPresent()) { cintas.setStatusCinta(statusData.get()); }

    return cintasRepository.save(cintas);
  }  

  /**
   * Elimina una cinta cambiando su estado a falso.
   *
   * @param id Identificador de la cinta a eliminar.
   * @param status Estado al que se cambiará la cinta.
   */
  @SuppressWarnings("null")
  public void deleteCinta(UUID id, Status status) {
    Optional<Status> statusData = statusRepository.findById(status.getId());
    if (statusData.isPresent()) { status = statusData.get(); }
    cintasRepository.update(id, status);
  }

  /**
   * Cambia la ubicación de una lista de cintas.
   *
   * @param ids Lista de identificadores de cintas a las que se cambiará la ubicación.
   * @param location Ubicación a la que se cambiará la cinta.
   */
  @SuppressWarnings("null")
  public void changeLocation(List<UUID> ids, Locations location) {
    Optional<Locations> locationData = locationsRepository.findById(location.getId());
    if (locationData.isPresent()) {  location = locationData.get(); }

    for (UUID uuid : ids) {
      cintasRepository.changeLocation(uuid, location);  
    }
  }

  /**
   * Actualiza el estado de las cintas a caducadas.
   *
   * @param currentDate Fecha actual.
   * @param locationId Identificador de la ubicación de las cintas.
   * @return Lista de cintas caducadas.
   */
  @SuppressWarnings("null")
  public List<Cintas> updateStatusCintasExpired(LocalDateTime currentDate, Long locationId) {
    Optional<Status> status = statusRepository.findById(Constants.EXPIRED_STATUS_ID);

    if (!status.isPresent()) { return Collections.emptyList(); }

    cintasRepository.updateStatusForExpiredCintas(currentDate, locationId, status.get());

    return getExpiredCintas(currentDate, locationId);
  }

  /**
   * Actualiza el estado de las cintas a retenidas.
   *
   * @param currentDate Fecha actual.
   * @param locationId Identificador de la ubicación de las cintas.
   * @return Lista de cintas retenidas.
   */
  @SuppressWarnings("null")
  public List<Cintas> updateStatusCitasRetained(LocalDateTime currentDate, Long locationId) {
    Optional<Status> status = statusRepository.findById(Constants.RETAINED_STATUS_ID);

    if (!status.isPresent()) { return Collections.emptyList(); }

    cintasRepository.updateStatusForRetainedCintas(currentDate, locationId, status.get());

    return getRetainedCintas(currentDate, locationId);
  }

  /**
   * Obtiene las cintas caducadas.
   *
   * @param currentDate Fecha actual.
   * @param locationId Identificador de la ubicación de las cintas.
   * @return Lista de cintas caducadas.
   */
  public List<Cintas> getExpiredCintas(LocalDateTime currenDate, Long locationId) {
    return cintasRepository.findByExpiryDateLessThanEqualAndStatusIsTrueAndLocation(currenDate, locationId);
  }

  /**
   * Obtiene las cintas retenidas.
   *
   * @param currentDate Fecha actual.
   * @param locationId Identificador de la ubicación de las cintas.
   * @return Lista de cintas retenidas.
   */
  @SuppressWarnings("null")
  public List<Cintas> getRetainedCintas(LocalDateTime currentDate, Long locationId) {
    Optional<Locations> location = locationsRepository.findById(locationId);

    if (!location.isPresent()) { return Collections.emptyList(); }

    return cintasRepository.findByRententionDateLessThanEqualAndStatusIsTrueAndLocation(currentDate, location.get());
  }
}