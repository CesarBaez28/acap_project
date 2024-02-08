package com.acap.api.model;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "folders")
public class Folders {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @OneToMany(mappedBy = "folders")
  private Set<FoldersEvidence> folder;

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "description", columnDefinition = "varchar(255) default ''")
  private String description;

  @Column(name = "status", columnDefinition = "boolean default true")
  private boolean status;
}
