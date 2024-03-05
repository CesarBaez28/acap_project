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
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

/**
 * Clase que representa la entidad "Shipments" en la base de datos.
 */
@Data
@Entity
@Table(name = "shipments")
public class Shipments {

  /**
   * Identificador único del envío.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  /**
   * Relación Muchos a Uno con la entidad "User".
   */
  @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  /**
   * Relación Muchos a Uno con la entidad "Status".
   */
  @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinColumn(name = "status_id", nullable = false)
  private Status status;

  /**
   * Relación Uno a Muchos con la entidad "ShipmentsCintas".
   */
  @OneToMany(mappedBy = "shipments")
  private Set<ShipmentsCintas> shipmentsCintas;

  /**
   * Relación Uno a Muchos con la entidad "CintasReceived".
   */
  @OneToMany(mappedBy = "shipment")
  private Set<CintasReceived> cintasReceived;

  /**
   * Relación Uno a Muchos con la entidad "ShipmentsNotifications".
   */
  @OneToMany(mappedBy = "shipment")
  private Set<ShipmentsNotifications> shipmentsNotifications;

  /**
   * Relación Muchos a Uno con la entidad "Drivers".
   */
  @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinColumn(name = "driver_id", nullable = false)
  private Drivers driver;

  /**
   * Relación Muchos a Uno con la entidad "Signatures".
   */
  @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinColumn(name = "signature_id", nullable = false)
  private Signatures signature;

  /**
   * Relación Muchos a Uno con la entidad "Locations" (ubicación de origen).
   */
  @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinColumn(name = "location_from_id", nullable = false)
  private Locations locationFrom;

  /**
   * Relación Muchos a Uno con la entidad "Locations" (ubicación de destino).
   */
  @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinColumn(name = "location_to_id", nullable = false)
  private Locations locationTo;

  /**
   * Fecha del envío.
   */
  @Column(name = "date")
  private LocalDateTime date;
}

