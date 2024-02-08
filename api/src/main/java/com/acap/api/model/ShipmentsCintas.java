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
@Table(name = "shipments_cintas")
public class ShipmentsCintas {

  @EmbeddedId
  ShipmentsCintasKey id; 

  @ManyToOne
  @MapsId("cintaId")
  @JoinColumn(name = "cintas_id")
  private Cintas cintas;

  @ManyToOne
  @MapsId("shipmentId")
  @JoinColumn(name = "shipments_id")
  private Shipments shipments;

  public ShipmentsCintas (Cintas cintas, Shipments shipments) {
    this.id = new ShipmentsCintasKey(cintas.getId(), shipments.getId());
    this.cintas = cintas;
    this.shipments = shipments;
  }
}
