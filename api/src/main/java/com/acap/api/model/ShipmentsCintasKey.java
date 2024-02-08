package com.acap.api.model;

import java.io.Serializable;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data @AllArgsConstructor @NoArgsConstructor
public class ShipmentsCintasKey implements Serializable {

  @Column(name = "cinta_id")
  private UUID cintaId;

  @Column(name = "shipment_id")
  private UUID shipmentId;
}
