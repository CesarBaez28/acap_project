package com.acap.api.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Clase que representa la clave primaria compuesta para la entidad "PositionsPrivileges" en la base de datos.
 */
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PositionsPrivilegesKey implements Serializable {

  /**
   * Identificador del cargo en la relación.
   */
  @Column(name = "position_id")
  private Long positionId;

  /**
   * Identificador del privilegio en la relación.
   */
  @Column(name = "privilege_id")
  private Long privilegeId;
}

