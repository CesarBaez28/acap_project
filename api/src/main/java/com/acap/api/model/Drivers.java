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
 * Clase que representa la entidad "Drivers" en la base de datos.
 */
@Data
@Entity
@Table(name = "drivers")
public class Drivers {

  /**
   * Identificador único del conductor.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  /**
   * Conjunto de envíos asociados al conductor.
   */
  @OneToMany(mappedBy = "driver")
  private Set<Shipments> shipments;

  /**
   * Nombre del conductor.
   */
  @Column(name = "name", nullable = false, columnDefinition = "varchar(255) default ''")
  private String name;

  /**
   * Estado del conductor (activo o inactivo).
   */
  @Column(name = "status", columnDefinition = "boolean default true")
  private Boolean status;
}

