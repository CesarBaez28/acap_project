package com.acap.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.acap.api.model.Privileges;
import com.acap.api.repository.PrivilegesRepository;

/**
 * Servicio que gestiona las operaciones relacionadas con los privilegios.
 */
@Service
public class PrivilegesService {

  // Repositorio para acceder a datos de privilegios.
  private final PrivilegesRepository privilegesRepository;

  /**
   * Constructor del servicio de privilegios.
   *
   * @param privilegesRepository Repositorio para acceder a datos de privilegios.
   */
  public PrivilegesService(PrivilegesRepository privilegesRepository) {
    this.privilegesRepository = privilegesRepository;
  }
  
  /**
   * Obtiene la lista de todos los privilegios disponibles.
   *
   * @return Lista de todos los privilegios.
   */
  public List<Privileges> findAll() {
    return privilegesRepository.findAll();
  }
}

