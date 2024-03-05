package com.acap.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.acap.api.dto.EvidenceDTO;
import com.acap.api.model.Evidence;
import com.acap.api.model.Folders;
import com.acap.api.model.FoldersEvidence;
import com.acap.api.repository.EvidenceRepository;
import com.acap.api.repository.FoldersEvidenceRepository;
import com.acap.api.repository.FoldersRepository;

import java.util.ArrayList;

/**
 * Servicio para la gestión de relaciones entre carpetas y evidencias.
 * Proporciona métodos para recuperar, guardar y eliminar evidencias asociadas a carpetas en el sistema.
 */
@Service
public class FoldersEvidenceService {

  private final FoldersRepository foldersRepository;
  private final EvidenceRepository evidenceRepository;
  private final FoldersEvidenceRepository foldersEvidenceRepository;

  /**
   * Constructor que inyecta los repositorios necesarios para el servicio.
   *
   * @param foldersEvidenceRepository Repositorio de relaciones entre carpetas y evidencias.
   * @param foldersRepository         Repositorio de carpetas.
   * @param evidenceRepository        Repositorio de evidencias.
   */
  public FoldersEvidenceService(FoldersEvidenceRepository foldersEvidenceRepository,
                                FoldersRepository foldersRepository, EvidenceRepository evidenceRepository) {
    this.foldersEvidenceRepository = foldersEvidenceRepository;
    this.foldersRepository = foldersRepository;
    this.evidenceRepository = evidenceRepository;
  }

  /**
   * Recupera todas las relaciones entre una carpeta y sus evidencias asociadas.
   *
   * @param folders Carpeta para la cual se buscarán las relaciones.
   * @return Lista de relaciones entre la carpeta y sus evidencias asociadas.
   */
  public List<FoldersEvidence> findAllByFolder(Folders folders) {
    return foldersEvidenceRepository.findAllByFolders(folders);
  }

  /**
   * Guarda las relaciones entre una carpeta y sus evidencias asociadas en el sistema.
   *
   * @param data Objeto EvidenceDTO que contiene información sobre la carpeta y las evidencias.
   * @return Lista de relaciones entre la carpeta y las evidencias guardadas.
   */
  @SuppressWarnings("null")
  public Object saveFoldersEvidence(EvidenceDTO data) {
    Folders folder = foldersRepository.save(data.getFolders());

    // Valida si solo se suministra el nombre de la carpeta
    if (data.getEvidence() == null) {
      data.setFolders(folder);
      return data;
    }

    List<Evidence> evidence = new ArrayList<>();
    for (Evidence evidenceData : data.getEvidence()) {
      evidence.add(evidenceData);
    }

    List<Evidence> evidenceData = evidenceRepository.saveAll(evidence);

    List<FoldersEvidence> evidenceList = new ArrayList<>();
    for (Evidence evidenceFolder : evidenceData) {
      FoldersEvidence folderEvidence = new FoldersEvidence(folder, evidenceFolder);
      evidenceList.add(folderEvidence);
    }

    return foldersEvidenceRepository.saveAll(evidenceList);
  }

  /**
   * Elimina las evidencias asociadas a una carpeta en el sistema.
   *
   * @param evidenceDTO Objeto EvidenceDTO que contiene la carpeta y las evidencias a eliminar.
   * @return Lista de relaciones restantes entre la carpeta y las evidencias asociadas.
   */
  @SuppressWarnings("null")
  public List<FoldersEvidence> removeEvidence(EvidenceDTO evidenceDTO) {
    List<Evidence> evidence = evidenceDTO.getEvidence();

    List<FoldersEvidence> foldersEvidencesList = new ArrayList<>();
    for (Evidence evidenceData : evidence) {
      FoldersEvidence foldersEvidence = new FoldersEvidence(evidenceDTO.getFolders(), evidenceData);
      foldersEvidencesList.add(foldersEvidence);
    }

    foldersEvidenceRepository.deleteAll(foldersEvidencesList);
    evidenceRepository.deleteAll(evidence);

    return findAllByFolder(evidenceDTO.getFolders());
  }
}

