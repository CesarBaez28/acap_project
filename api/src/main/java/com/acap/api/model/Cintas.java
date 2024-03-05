package com.acap.api.model;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * Clase que representa la entidad "Cintas" en la base de datos.
 */
@Data
@Entity
@Table(name = "cintas", indexes = @Index(name = "label_index", columnList = "label"))
public class Cintas {

  /**
   * Identificador único de la cinta.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  /**
   * Conjunto de relaciones de la cinta con los envíos.
   */
  @OneToMany(mappedBy = "cintas")
  private Set<ShipmentsCintas> shipmentsCintas;

  /**
   * Conjunto de notificaciones relacionadas con la cinta.
   */
  @OneToMany(mappedBy = "cinta")
  private Set<CintasNotifications> cintasNotifications;

  /**
   * Ubicación de la cinta en el inventario.
   */
  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "locations_id", nullable = false)
  private Locations location;

  /**
   * Estado actual de la cinta.
   */
  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "status_id", nullable = false)
  private Status statusCinta;

  /**
   * Etiqueta única que identifica la cinta.
   */
  @NotBlank(message = "Ingrese el label de la cinta")
  @Column(name = "label", nullable = false, length = 50)
  private String label;

  /**
   * Descripción opcional de la cinta.
   */
  @Column(name = "description", nullable = false, columnDefinition = "varchar(255) default ''")
  private String description;

  /**
   * Fecha de creación de la cinta.
   */
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "creation_date", columnDefinition = "datetime default CURRENT_TIMESTAMP")
  private LocalDateTime creationDate;

  /**
   * Fecha de caducidad de la cinta.
   */
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "expiry_date", nullable = false)
  private LocalDateTime expiryDate;

  /**
   * Fecha de retención de la cinta.
   */
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "retention_date", nullable = false)
  private LocalDateTime rententionDate;

  /**
   * Estado actual de la cinta (activo o inactivo).
   */
  @Column(name = "status", columnDefinition = "boolean default true")
  private boolean status;
}