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
@Table(name = "privileges")
public class Privileges {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToMany(mappedBy = "privileges")
  private Set<PositionsPrivileges> privilegeFk;

  @Column(name = "privilege", nullable = false, unique = true, length = 100)
  private String privilege;

  @Column(name = "description", columnDefinition = "varchar(255) default ''")
  private String description;

  @Column(name = "status", columnDefinition = "boolean default true")
  private boolean status;
}
