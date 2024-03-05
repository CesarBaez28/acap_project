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

/**
 * Clase que representa la entidad "Folders" en la base de datos.
 */
@Data
@Entity
@Table(name = "folders")
public class Folders {

  /**
   * Identificador único de la carpeta.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  /**
   * Conjunto de relaciones con evidencias que pertenecen a esta carpeta.
   */
  @OneToMany(mappedBy = "folders")
  private Set<FoldersEvidence> folder;

  /**
   * Nombre de la carpeta.
   */
  @Column(name = "name", nullable = false)
  private String name;

  /**
   * Descripción de la carpeta.
   */
  @Column(name = "description", columnDefinition = "varchar(255) default ''")
  private String description;

  /**
   * Estado de la carpeta (activo/inactivo).
   */
  @Column(name = "status", columnDefinition = "boolean default true")
  private boolean status;
}
