package com.acap.api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.acap.api.dto.PrivilegesDTO;
import com.acap.api.model.Positions;
import com.acap.api.model.PositionsPrivileges;
import com.acap.api.model.Privileges;
import com.acap.api.repository.PositionsPrivilegesRepository;

/**
 * Servicio que gestiona la asignación y eliminación de privilegios para una posición específica.
 */
@Service
public class PositionsPrivilegesService {

  // Repositorio para acceder a datos de relaciones entre posiciones y privilegios.
  private final PositionsPrivilegesRepository positionsPrivilegesRepository;

  /**
   * Constructor del servicio de asignación de privilegios a posiciones.
   *
   * @param positionsPrivilegesRepository Repositorio para acceder a datos de relaciones entre posiciones y privilegios.
   */
  public PositionsPrivilegesService(PositionsPrivilegesRepository positionsPrivilegesRepository) {
    this.positionsPrivilegesRepository = positionsPrivilegesRepository;
  }

  /**
   * Obtiene la lista de relaciones entre una posición y sus privilegios asignados.
   *
   * @param position Posición para la cual se desea obtener los privilegios asignados.
   * @return Lista de relaciones entre la posición y los privilegios asignados.
   */
  public List<PositionsPrivileges> findByPosition(Positions position) {
    return positionsPrivilegesRepository.findAllByPositions(position);
  }

  /**
   * Asigna una lista de privilegios a una posición específica.
   *
   * @param privilegesDTO DTO que contiene la posición y la lista de privilegios a asignar.
   * @return Lista de relaciones entre la posición y los privilegios asignados.
   */
  public List<PositionsPrivileges> assignPrivileges(PrivilegesDTO privilegesDTO) {
    List<Privileges> privileges = privilegesDTO.getPrivileges();

    List<PositionsPrivileges> positionsPrivilegesList = new ArrayList<>();
    for (Privileges data : privileges) {
      PositionsPrivileges positionsPrivileges = new PositionsPrivileges(privilegesDTO.getPosition(), data);
      positionsPrivilegesList.add(positionsPrivileges);
    }

    // Guarda y devuelve la lista de relaciones entre la posición y los privilegios asignados.
    return positionsPrivilegesRepository.saveAll(positionsPrivilegesList);
  }

  /**
   * Elimina una lista de privilegios de una posición específica.
   *
   * @param privilegesDTO DTO que contiene la posición y la lista de privilegios a eliminar.
   * @return Lista de relaciones entre la posición y los privilegios restantes después de la eliminación.
   */
  public List<PositionsPrivileges> removePrivileges(PrivilegesDTO privilegesDTO) {
    List<Privileges> privileges = privilegesDTO.getPrivileges();

    List<PositionsPrivileges> positionsPrivilegesList = new ArrayList<>();
    for (Privileges data : privileges) {
      PositionsPrivileges positionsPrivileges = new PositionsPrivileges(privilegesDTO.getPosition(), data);
      positionsPrivilegesList.add(positionsPrivileges);
    }

    // Elimina las relaciones entre la posición y los privilegios especificados.
    positionsPrivilegesRepository.deleteAll(positionsPrivilegesList);

    // Devuelve la lista actualizada de relaciones entre la posición y los privilegios restantes.
    return positionsPrivilegesRepository.findAllByPositions(privilegesDTO.getPosition());
  }
}

