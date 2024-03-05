package com.acap.api.model;

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
 * Clase que representa la entidad "CintasNotifications" en la base de datos.
 */
@Data
@Entity
@Table(name = "cintas_notifications")
public class CintasNotifications {

  /**
   * Identificador único de la notificación relacionada con la cinta.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  /**
   * Mensaje de la notificación.
   */
  @Column(name = "message", nullable = false, length = 100)
  private String message;

  /**
   * Cinta asociada a la notificación.
   */
  @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinColumn(name = "cintas_notifications_id", nullable = false)
  private Cintas cinta;
}
