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
 * Clase que representa los estados en la base de datos.
 */
@Data
@Entity
@Table(name = "status")
public class Status {

  /**
   * Identificador único del estado.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  /**
   * Conjunto de cintas asociadas a este estado.
   */
  @OneToMany(mappedBy = "statusCinta")
  private Set<Cintas> cintas;

  /**
   * Conjunto de envíos asociados a este estado.
   */
  @OneToMany(mappedBy = "status")
  private Set<Shipments> shipmentsStatus;

  /**
   * Conjunto de recepciones de cintas asociadas a este estado.
   */
  @OneToMany(mappedBy = "status")
  private Set<CintasReceived> cintasReceivedStatus;

  /**
   * Nombre del estado, único y no nulo.
   */
  @Column(name = "state", length = 100, nullable = false, unique = true)
  private String state;

  /**
   * Descripción del estado, con un valor predeterminado de cadena vacía.
   */
  @Column(name = "description", columnDefinition = "varchar(255) default ''")
  private String description;
}

