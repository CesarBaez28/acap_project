package com.acap.api.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Clase que representa la entidad "PositionsPrivileges" en la base de datos, que almacena información sobre los privilegios asociados a cargos o posiciones.
 */
@Data
@NoArgsConstructor
@Entity
@Table(name = "positions_privileges")
public class PositionsPrivileges {
   
  /**
   * Clave compuesta que identifica única y conjuntamente una relación entre un cargo y un privilegio.
   */
  @EmbeddedId
  PositionsPrivilegesKey id;

  /**
   * Cargo asociado a esta relación.
   */
  @ManyToOne
  @MapsId("positionId")
  @JoinColumn(name = "position_id")
  private Positions positions;

  /**
   * Privilegio asociado a esta relación.
   */
  @ManyToOne
  @MapsId("privilegeId")
  @JoinColumn(name = "privilege_id")
  private Privileges privileges;

  /**
   * Constructor que permite crear una nueva instancia de PositionsPrivileges.
   * @param positions El cargo asociado.
   * @param privileges El privilegio asociado.
   */
  public PositionsPrivileges (Positions positions, Privileges privileges) {
    this.id = new PositionsPrivilegesKey(positions.getId(), privileges.getId());
    this.positions = positions;
    this.privileges = privileges;
  }
}

