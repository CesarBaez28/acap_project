package com.acap.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.acap.api.model.Cintas;
import com.acap.api.model.CintasNotifications;
import com.acap.api.repository.CintasNotificationsRepository;
import com.acap.api.repository.CintasRepository;

/**
 * Servicio para la gestión de notificaciones de cintas.
 * Proporciona métodos para guardar notificaciones y buscarlas por ubicación de cintas.
 */
@Service
public class CintasNotificationsService {

  private final CintasNotificationsRepository cintasNotificationsRepository;
  private final CintasRepository cintasRepository;

  /**
   * Constructor que inyecta las dependencias necesarias para el servicio.
   *
   * @param cintasNotificationsRepository Repositorio de notificaciones de cintas.
   * @param cintasRepository Repositorio de cintas.
   */
  public CintasNotificationsService(CintasNotificationsRepository cintasNotificationsRepository, CintasRepository cintasRepository) {
    this.cintasNotificationsRepository = cintasNotificationsRepository;
    this.cintasRepository = cintasRepository;
  }

  /**
   * Guarda una notificación de cintas.
   *
   * @param cintasNotifications La notificación de cintas a guardar.
   * @return La notificación de cintas guardada.
   */
  public CintasNotifications save(CintasNotifications cintasNotifications) {
    Optional<Cintas> cinta = cintasRepository.findById(cintasNotifications.getCinta().getId());

    if (cinta.isPresent()) {
      cintasNotifications.setCinta(cinta.get());
    }

    return cintasNotificationsRepository.save(cintasNotifications);
  }

  /**
   * Busca notificaciones de cintas por la ubicación de cintas.
   *
   * @param locationId Identificador de la ubicación de cintas.
   * @return Lista de notificaciones de cintas asociadas a la ubicación proporcionada.
   */
  public List<CintasNotifications> findByCintaLocation(Long locationId) {
    return cintasNotificationsRepository.findByCintaLocation(locationId);
  }
}

