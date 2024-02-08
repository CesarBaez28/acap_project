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

@Data
@Entity
@Table(name = "cintas_received")
public class CintasReceived {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "status_id", nullable = false)
  private Status status;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "shipments_id", nullable = false)
  private Shipments shipment;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "user_received_id", nullable = false)
  private User userReceived;

  @Column(name = "date_received")
  private LocalDateTime dateReceived;
}
