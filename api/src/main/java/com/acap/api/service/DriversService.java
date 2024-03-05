package com.acap.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.acap.api.model.Drivers;
import com.acap.api.repository.DriversRepository;

/**
 * Servicio para la gestión de conductores.
 * Proporciona métodos para obtener y gestionar información relacionada con conductores en el sistema.
 */
@Service
public class DriversService {

  private final DriversRepository driversRepository;

  /**
   * Constructor que inyecta el repositorio de conductores necesario para el servicio.
   *
   * @param driversRepository Repositorio de conductores.
   */
  public DriversService(DriversRepository driversRepository) {
    this.driversRepository = driversRepository;
  }

  /**
   * Obtiene todos los conductores almacenados en el sistema.
   *
   * @return Lista de conductores.
   */
  public List<Drivers> findAll() {
    return driversRepository.findAll();
  }

  /**
   * Guarda la información de un nuevo conductor o actualiza la información de un conductor existente.
   *
   * @param driver Objeto Drivers que representa al conductor a guardar o actualizar.
   * @return Objeto Drivers que representa al conductor guardado o actualizado.
   */
  @SuppressWarnings("null")
  public Drivers saveDriver(Drivers driver) {
    return driversRepository.save(driver);
  }
}

