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

/**
 * Clase que representa la entidad "Evidence" en la base de datos.
 */
@Data
@Entity
@Table(name = "evidence")
public class Evidence {

  /**
   * Identificador único de la evidencia.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  /**
   * Conjunto de relaciones con carpetas que contienen esta evidencia.
   */
  @OneToMany(mappedBy = "evidence")
  private Set<FoldersEvidence> evidenceFk;

  /**
   * Ruta de la evidencia en el sistema de archivos.
   */
  @Column(name = "path", columnDefinition = "varchar (255) default ''")
  private String path;

  /**
   * Nombre de la evidencia.
   */
  @Column(name = "name", columnDefinition = "varchar (255) default ''")
  private String name;

  /**
   * Tamaño de la evidencia.
   */
  @Column(name = "size", columnDefinition = "varchar (100) default ''", length = 100)
  private String size;

  /**
   * Extensión del archivo de la evidencia.
   */
  @Column(name = "extension", columnDefinition = "varchar (50) default ''", length = 50)
  private String extension;

  /**
   * Fecha de creación o registro de la evidencia.
   */
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "evidence_date", columnDefinition = "datetime default CURRENT_TIMESTAMP")
  private LocalDateTime evidenceDate;
}
