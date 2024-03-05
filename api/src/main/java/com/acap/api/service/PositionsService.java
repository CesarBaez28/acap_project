package com.acap.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.acap.api.model.Positions;
import com.acap.api.repository.PositionsRepository;

/**
 * Servicio que gestiona las operaciones relacionadas con las posiciones.
 */
@Service
public class PositionsService {

  // Repositorio para acceder a datos de posiciones.
  private final PositionsRepository positionsRepository;

  /**
   * Constructor del servicio de posiciones.
   *
   * @param positionsRepository Repositorio para acceder a datos de posiciones.
   */
  public PositionsService(PositionsRepository positionsRepository) {
    this.positionsRepository = positionsRepository;
  }

  /**
   * Obtiene la lista de todas las posiciones disponibles.
   *
   * @return Lista de todas las posiciones.
   */
  public List<Positions> findAll() {
    return positionsRepository.findAll();
  }

  /**
   * Guarda una nueva posición o actualiza una existente.
   *
   * @param position Posición que se va a guardar o actualizar.
   * @return Posición guardada o actualizada.
   */
  @SuppressWarnings("null")
  public Positions savePosition(Positions position) {
    return positionsRepository.save(position);
  }
}
