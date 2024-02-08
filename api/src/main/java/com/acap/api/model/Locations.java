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
@Table(name = "locations")
public class Locations {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @OneToMany(mappedBy = "location")
  private Set<Cintas> cintas;

  @OneToMany(mappedBy = "location")
  private Set<User> users;

  @OneToMany(mappedBy = "locationFrom")
  private Set<Shipments> shipmentsFrom;

  @OneToMany(mappedBy = "locationTo")
  private Set<Shipments> shipmentsTo;

  @Column(name = "location", nullable = false, unique = true, length = 100)
  private String location;

  @Column(name = "description", columnDefinition = "varchar(255) default ''")
  private String description;

  @Column(name = "status", columnDefinition = "boolean default true")
  private Boolean status;
}
