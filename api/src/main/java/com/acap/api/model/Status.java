package com.acap.api.model;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "status")
public class Status {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @OneToMany(mappedBy = "statusCinta")
  private Set<Cintas> cintas;

  @OneToMany(mappedBy = "status")
  private Set<Shipments> shipmentsStatus;

  @OneToMany(mappedBy = "status")
  private Set<CintasReceived> cintasReceivedStatus;

  @Column(name = "state", length = 100, nullable = false, unique = true)
  private String state;

  @Column(name = "description", columnDefinition = "varchar(255) default ''")
  private String description;
}
