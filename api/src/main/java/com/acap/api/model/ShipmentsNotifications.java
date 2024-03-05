package com.acap.api.model;

import java.time.LocalDateTime;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

/**
 * Clase que representa las notificaciones de envíos en la base de datos.
 */
@Data
@Entity
@Table(name = "shipments_notifications")
public class ShipmentsNotifications {

  /**
   * Identificador único de la notificación de envío.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  /**
   * Envío al cual está asociada la notificación.
   */
  @ManyToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
  @JoinColumn(name = "shipment_id", nullable = false)
  private Shipments shipment;

  /**
   * Mensaje de la notificación.
   */
  @Column(name = "message", columnDefinition = "varchar(100) default ''")
  private String message;

  /**
   * Fecha y hora de la notificación.
   */
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "date", columnDefinition = "datetime default CURRENT_TIMESTAMP")
  private LocalDateTime date;
}

