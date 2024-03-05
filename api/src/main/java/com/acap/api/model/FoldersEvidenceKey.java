package com.acap.api.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Clase que representa la clave primaria compuesta para la entidad "FoldersEvidence" en la base de datos.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class FoldersEvidenceKey implements Serializable {

  /**
   * Identificador de la carpeta.
   */
  @Column(name = "folder_id")
  private Long folderId;

  /**
   * Identificador de la evidencia.
   */
  @Column(name = "evidence_id")
  private Long evidenceId;
}
