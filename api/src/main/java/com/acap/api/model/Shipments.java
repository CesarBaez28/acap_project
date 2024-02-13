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

@Data
@Entity
@Table(name = "shipments")
public class Shipments {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinColumn(name = "status_id", nullable = false)
  private Status status;

  @OneToMany(mappedBy = "shipments")
  private Set<ShipmentsCintas> shipmentsCintas;

  @OneToMany(mappedBy = "shipment")
  private Set<CintasReceived> cintasReceived;

  @OneToMany(mappedBy = "shipment")
  private Set<ShipmentsNotifications> shipmentsNotifications;

  @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinColumn(name = "driver_id", nullable = false)
  private Drivers driver;

  @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinColumn(name = "signature_id", nullable = false)
  private Signatures signature;

  @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinColumn(name = "location_from_id", nullable = false)
  private Locations locationFrom;

  @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinColumn(name = "location_to_id", nullable = false)
  private Locations locationTo;

  @Column(name = "date")
  private LocalDateTime date;
}
