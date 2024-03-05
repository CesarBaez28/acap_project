package com.acap.api.model;

import java.io.Serializable;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Clase que representa la clave primaria compuesta para la entidad "ShipmentsCintas" en la base de datos.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class ShipmentsCintasKey implements Serializable {

  /**
   * Identificador único de la entidad "Cintas".
   */
  @Column(name = "cinta_id")
  private UUID cintaId;

  /**
   * Identificador único de la entidad "Shipments".
   */
  @Column(name = "shipment_id")
  private UUID shipmentId;
}
