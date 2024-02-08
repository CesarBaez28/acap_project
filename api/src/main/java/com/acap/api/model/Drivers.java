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
@Table(name = "drivers")
public class Drivers {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @OneToMany(mappedBy = "driver")
  private Set<Shipments> shipments;

  @Column(name = "name", nullable = false, columnDefinition = "varchar(255) default ''")
  private String name;

  @Column(name = "status", columnDefinition = "boolean default true")
  private Boolean status;
}
