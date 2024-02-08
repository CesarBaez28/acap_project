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
@Table(name = "positions")
public class Positions {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @OneToMany(mappedBy = "positions")
  private Set<PositionsPrivileges> privileges;

  @OneToMany(mappedBy = "position")
  private Set<User> users;

  @Column(name = "position", nullable = false, unique = true, length = 100)
  private String position;

  @Column(name = "description", columnDefinition = "varchar(255) default ''")
  private String description;

  @Column(name = "status", columnDefinition = "boolean default true")
  private boolean status;
}
