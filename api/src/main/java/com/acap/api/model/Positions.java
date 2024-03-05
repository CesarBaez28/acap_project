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
 * Clase que representa la entidad "Positions" en la base de datos, que almacena información sobre cargos o posiciones.
 */
@Data
@Entity
@Table(name = "positions")
public class Positions {

  /**
   * Identificador único del cargo o posición.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  /**
   * Conjunto de privilegios asociados a este cargo o posición.
   */
  @OneToMany(mappedBy = "positions")
  private Set<PositionsPrivileges> privileges;

  /**
   * Conjunto de usuarios que ocupan este cargo o posición.
   */
  @OneToMany(mappedBy = "position")
  private Set<User> users;

  /**
   * Nombre del cargo o posición.
   */
  @Column(name = "position", nullable = false, unique = true, length = 100)
  private String position;

  /**
   * Descripción del cargo o posición.
   */
  @Column(name = "description", columnDefinition = "varchar(255) default ''")
  private String description;

  /**
   * Estado del cargo o posición (activo o inactivo).
   */
  @Column(name = "status", columnDefinition = "boolean default true")
  private boolean status;
}

