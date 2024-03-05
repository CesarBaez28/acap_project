package com.acap.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.acap.api.model.Locations;
import com.acap.api.repository.LocationRepository;

/**
 * Servicio para la gestión de ubicaciones en el sistema.
 * Proporciona métodos para recuperar y almacenar ubicaciones en la base de datos.
 */
@Service
public class LocationsService {

  private final LocationRepository locationRepository;

  /**
   * Constructor que inyecta el repositorio necesario para el servicio.
   *
   * @param locationRepository Repositorio de ubicaciones.
   */
  public LocationsService(LocationRepository locationRepository) {
    this.locationRepository = locationRepository;
  }

  /**
   * Recupera todas las ubicaciones almacenadas en el sistema.
   *
   * @return Lista de todas las ubicaciones en el sistema.
   */
  public List<Locations> findAll() {
    return locationRepository.findAll();
  }

  /**
   * Guarda una ubicación en el sistema.
   *
   * @param locations Ubicación que se va a guardar.
   * @return Ubicación guardada en la base de datos.
   */
  @SuppressWarnings("null")
  public Locations saveLocation(Locations locations) {
    return locationRepository.save(locations);
  }
}

