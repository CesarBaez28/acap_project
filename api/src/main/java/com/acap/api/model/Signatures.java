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
 * Clase que representa las firmas en la base de datos.
 */
@Data
@Entity
@Table(name = "signatures")
public class Signatures {

  /**
   * Identificador único de la firma.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  /**
   * Conjunto de envíos asociados a esta firma.
   */
  @OneToMany(mappedBy = "signature")
  private Set<Shipments> shipments;

  /**
   * Ruta de almacenamiento de la firma.
   */
  @Column(name = "path", nullable = false)
  private String path;
}
