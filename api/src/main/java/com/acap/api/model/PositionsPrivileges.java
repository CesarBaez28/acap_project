package com.acap.api.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor
@Entity
@Table(name = "positions_privileges")
public class PositionsPrivileges {
   
  @EmbeddedId
  PositionsPrivilegesKey id;

  @ManyToOne
  @MapsId("positionId")
  @JoinColumn(name = "position_id")
  private Positions positions;

  @ManyToOne
  @MapsId("privilegeId")
  @JoinColumn(name = "privilege_id")
  private Privileges privileges;

  public PositionsPrivileges (Positions positions, Privileges privileges) {
    this.id = new PositionsPrivilegesKey(positions.getId(), privileges.getId());
    this.positions = positions;
    this.privileges = privileges;
  }
}
