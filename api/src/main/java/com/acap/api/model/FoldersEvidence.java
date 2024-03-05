package com.acap.api.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Clase que representa la entidad "FoldersEvidence" en la base de datos.
 */
@Data
@NoArgsConstructor
@Entity
@Table(name = "evidence_of_the_folders")
public class FoldersEvidence {

  /**
   * Clave primaria compuesta para la relación muchos a muchos entre Folders y Evidence.
   */
  @EmbeddedId
  FoldersEvidenceKey id;

  /**
   * Referencia a la entidad Folders.
   */
  @ManyToOne
  @MapsId("folderId")
  @JoinColumn(name = "folder_id")
  private Folders folders;

  /**
   * Referencia a la entidad Evidence.
   */
  @ManyToOne 
  @MapsId("evidenceId")
  @JoinColumn(name = "evidence_id")
  private Evidence evidence;

  /**
   * Constructor que inicializa la clave primaria compuesta y establece las referencias a Folders y Evidence.
   * @param folders La carpeta asociada.
   * @param evidence La evidencia asociada.
   */
  public FoldersEvidence(Folders folders, Evidence evidence) {
    this.id = new FoldersEvidenceKey(folders.getId(), evidence.getId());
    this.folders = folders;
    this.evidence = evidence;
  }
}

