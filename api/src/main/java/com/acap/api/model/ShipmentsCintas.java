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
 * Clase que representa la entidad "ShipmentsCintas" en la base de datos.
 */
@Data
@NoArgsConstructor
@Entity
@Table(name = "shipments_cintas")
public class ShipmentsCintas {

  /**
   * Clave primaria compuesta por la combinación de las claves primarias de las entidades relacionadas.
   */
  @EmbeddedId
  ShipmentsCintasKey id; 

  /**
   * Relación Muchos a Uno con la entidad "Cintas".
   */
  @ManyToOne
  @MapsId("cintaId")
  @JoinColumn(name = "cintas_id")
  private Cintas cintas;

  /**
   * Relación Muchos a Uno con la entidad "Shipments".
   */
  @ManyToOne
  @MapsId("shipmentId")
  @JoinColumn(name = "shipments_id")
  private Shipments shipments;

  /**
   * Constructor que asigna las claves primarias y las entidades relacionadas.
   */
  public ShipmentsCintas (Cintas cintas, Shipments shipments) {
    this.id = new ShipmentsCintasKey(cintas.getId(), shipments.getId());
    this.cintas = cintas;
    this.shipments = shipments;
  }
}

