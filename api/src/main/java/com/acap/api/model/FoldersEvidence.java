package com.acap.api.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor
@Entity
@Table(name = "evidence_of_the_folders")
public class FoldersEvidence {

  @EmbeddedId
  FoldersEvidenceKey id;

  @ManyToOne
  @MapsId("folderId")
  @JoinColumn(name = "folder_id")
  private Folders folders;

  @ManyToOne 
  @MapsId("evidenceId")
  @JoinColumn(name = "evidence_id")
  private Evidence evidence;

  public FoldersEvidence (Folders folders, Evidence evidence) {
    this.id = new FoldersEvidenceKey(folders.getId(), evidence.getId());
    this.folders = folders;
    this.evidence = evidence;
  }
}
