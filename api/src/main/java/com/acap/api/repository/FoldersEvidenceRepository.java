package com.acap.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acap.api.model.Folders;
import com.acap.api.model.FoldersEvidence;
import com.acap.api.model.FoldersEvidenceKey;

/**
 * Interfaz de repositorio para la entidad FoldersEvidence.
 * Extiende JpaRepository proporcionando operaciones CRUD estándar.
 */
@Repository
public interface FoldersEvidenceRepository extends JpaRepository<FoldersEvidence, FoldersEvidenceKey> {

  /**
   * Método personalizado para buscar todas las evidencias asociadas a una carpeta.
   *
   * @param folders Carpeta para la cual se buscarán las evidencias.
   * @return Lista de FoldersEvidence asociadas a la carpeta proporcionada.
   */
  List<FoldersEvidence> findAllByFolders(Folders folders);
}

