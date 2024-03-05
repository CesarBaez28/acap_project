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
 * Clase que representa la entidad "Privileges" en la base de datos.
 */
@Data
@Entity
@Table(name = "privileges")
public class Privileges {

  /**
   * Identificador único de privilegio.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  /**
   * Relación Uno a Muchos con la entidad "PositionsPrivileges".
   */
  @OneToMany(mappedBy = "privileges")
  private Set<PositionsPrivileges> privilegeFk;

  /**
   * Nombre del privilegio.
   */
  @Column(name = "privilege", nullable = false, unique = true, length = 100)
  private String privilege;

  /**
   * Descripción del privilegio.
   */
  @Column(name = "description", columnDefinition = "varchar(255) default ''")
  private String description;

  /**
   * Estado del privilegio (activo o inactivo).
   */
  @Column(name = "status", columnDefinition = "boolean default true")
  private boolean status;
}

