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

@Data
@Entity
@Table(name = "shipments_notifications")
public class ShipmentsNotifications {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @ManyToOne(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
  @JoinColumn(name = "shipment_id", nullable = false)
  private Shipments shipment;

  @Column(name = "message", columnDefinition = "varchar(100) default ''")
  private String message;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "date", columnDefinition = "datetime default CURRENT_TIMESTAMP")
  private LocalDateTime date;
}
