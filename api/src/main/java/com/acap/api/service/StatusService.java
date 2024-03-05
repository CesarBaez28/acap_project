package com.acap.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.acap.api.model.Status;
import com.acap.api.repository.StatusRepository;

/**
 * Servicio que gestiona los estados (Status).
 */
@Service
public class StatusService {

  // Repositorio necesario para acceder a datos de estados.
  private final StatusRepository statusRepository;

  /**
   * Constructor del servicio de estados.
   *
   * @param statusRepository Repositorio para acceder a datos de estados.
   */
  public StatusService(StatusRepository statusRepository) {
    this.statusRepository = statusRepository;
  }

  /**
   * Obtiene todos los estados disponibles.
   *
   * @return Lista de todos los estados.
   */
  public List<Status> findAll() {
    return statusRepository.findAll();
  }

  /**
   * Guarda un estado en el repositorio.
   *
   * @param status Estado a ser guardado.
   * @return Estado guardado en el repositorio.
   */
  @SuppressWarnings("null")
  public Status saveStatus(Status status) {
    return statusRepository.save(status);
  }
}

