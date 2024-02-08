package com.acap.api.model;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor @NoArgsConstructor
@Data
public class PositionsPrivilegesKey implements Serializable {

  @Column(name = "position_id")
  private Long positionId;

  @Column(name = "privilege_id")
  private Long privilegeId;
}
