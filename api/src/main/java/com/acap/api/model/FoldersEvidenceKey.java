package com.acap.api.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data @AllArgsConstructor @NoArgsConstructor
public class FoldersEvidenceKey implements Serializable {

  @Column(name = "folder_id")
  private Long folderId;

  @Column(name = "evidence_id")
  private Long evidenceId;
}
