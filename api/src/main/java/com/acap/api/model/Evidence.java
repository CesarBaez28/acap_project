package com.acap.api.model;

import java.time.LocalDateTime;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Data
@Entity
@Table(name = "evidence")
public class Evidence {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToMany(mappedBy = "evidence")
  private Set<FoldersEvidence> evidenceFk;

  @Column(name = "path", columnDefinition = "varchar (255) default ''")
  private String path;

  @Column(name = "name", columnDefinition = "varchar (255) default ''")
  private String name;
  
  @Column(name = "size", columnDefinition = "varchar (100) default ''", length = 100)
  private String size;

  @Column(name = "extension", columnDefinition = "varchar (50) default ''", length = 50)
  private String extension;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "evidence_date", columnDefinition = "datetime default CURRENT_TIMESTAMP")
  private LocalDateTime evidenceDate;
}