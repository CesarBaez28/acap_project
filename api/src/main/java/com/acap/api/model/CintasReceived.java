package com.acap.api.model;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

/**
 * Clase que representa la entidad "CintasReceived" en la base de datos.
 */
@Data
@Entity
@Table(name = "cintas_received")
public class CintasReceived {

  /**
   * Identificador único de la cinta recibida.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  /**
   * Estado asociado a la cinta recibida.
   */
  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "status_id", nullable = false)
  private Status status;

  /**
   * Envío asociado a la cinta recibida.
   */
  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "shipments_id", nullable = false)
  private Shipments shipment;

  /**
   * Usuario que recibió la cinta.
   */
  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "user_received_id", nullable = false)
  private User userReceived;

  /**
   * Fecha en la que la cinta fue recibida.
   */
  @Column(name = "date_received")
  private LocalDateTime dateReceived;
}
