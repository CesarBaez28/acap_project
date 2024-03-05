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
 * Clase que representa la entidad "Locations" en la base de datos, que almacena información sobre ubicaciones.
 */
@Data
@Entity
@Table(name = "locations")
public class Locations {

  /**
   * Identificador único de la ubicación.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  /**
   * Conjunto de cintas asociadas a esta ubicación.
   */
  @OneToMany(mappedBy = "location")
  private Set<Cintas> cintas;

  /**
   * Conjunto de usuarios asociados a esta ubicación.
   */
  @OneToMany(mappedBy = "location")
  private Set<User> users;

  /**
   * Conjunto de envíos con esta ubicación como origen.
   */
  @OneToMany(mappedBy = "locationFrom")
  private Set<Shipments> shipmentsFrom;

  /**
   * Conjunto de envíos con esta ubicación como destino.
   */
  @OneToMany(mappedBy = "locationTo")
  private Set<Shipments> shipmentsTo;

  /**
   * Nombre de la ubicación.
   */
  @Column(name = "location", nullable = false, unique = true, length = 100)
  private String location;

  /**
   * Descripción de la ubicación.
   */
  @Column(name = "description", columnDefinition = "varchar(255) default ''")
  private String description;

  /**
   * Estado de la ubicación (activo o inactivo).
   */
  @Column(name = "status", columnDefinition = "boolean default true")
  private Boolean status;
}

