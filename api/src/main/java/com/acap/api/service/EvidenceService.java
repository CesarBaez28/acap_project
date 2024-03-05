package com.acap.api.service;

import org.springframework.stereotype.Service;

import com.acap.api.model.Evidence;
import com.acap.api.repository.EvidenceRepository;

/**
 * Servicio para la gestión de evidencias.
 * Proporciona métodos para guardar y actualizar información relacionada con evidencias de las cintas.
 */
@Service
public class EvidenceService {

  private final EvidenceRepository evidenceRepository;

  /**
   * Constructor que inyecta el repositorio de evidencias necesario para el servicio.
   *
   * @param evidenceRepository Repositorio de evidencias.
   */
  public EvidenceService(EvidenceRepository evidenceRepository) {
    this.evidenceRepository = evidenceRepository;
  }

  /**
   * Guarda la información de una nueva evidencia o actualiza la información de una evidencia existente.
   *
   * @param evidence Objeto Evidence que representa la evidencia a guardar o actualizar.
   * @return Objeto Evidence que representa la evidencia guardada o actualizada.
   */
  @SuppressWarnings("null")
  public Evidence saveEvidence(Evidence evidence) {
    return evidenceRepository.save(evidence);
  }

  /**
   * Cambia el nombre de una evidencia existente.
   *
   * @param id      Identificador único de la evidencia.
   * @param newName Nuevo nombre que se asignará a la evidencia.
   */
  public void renameEvidence(Long id, String newName) {
    evidenceRepository.update(id, newName);
  }
}

