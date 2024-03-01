package com.acap.api.model;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

import com.acap.api.utils.ValidationGroups.LoginUser;
import com.acap.api.utils.ValidationGroups.UserEdit;
import com.acap.api.utils.ValidationGroups.UserRegister;

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
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @OneToMany(mappedBy = "user")
  private Set<Shipments> userRegisters;

  @OneToMany(mappedBy = "userReceived")
  private Set<CintasReceived> userReceived;

  @OneToMany(mappedBy = "user")
  private Set<UserToken> userToken;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "position_id", nullable = false)
  private Positions position;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "location_id", nullable = false)
  private Locations location;

  @NotBlank(message = "Ingrese su nombre de usuario", groups = {UserRegister.class, UserEdit.class})
  @Column(name = "username", nullable=false, length=100, unique = true)
  private String username;

  @NotBlank(message = "Ingrese su número de empleado", groups = {LoginUser.class, UserRegister.class, UserEdit.class})
  @Column(name = "employee_number", nullable = false, unique = true, length = 20)
  private String employeeNumber;

  @Email(message = "El email no es válido", groups = {UserRegister.class, UserEdit.class})
  @NotBlank(message = "Ingrese el email", groups = {UserRegister.class, UserEdit.class})
  @Column(name = "email", nullable = false, length = 100, unique = true)
  private String email; 

  @Pattern(
    regexp = "^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\\-__+.]){1,}).{8,}$", 
    message = "La contraseña no cumple con los requisitos",
    groups = {LoginUser.class, UserRegister.class}
  )
  @NotBlank(message = "Ingrese la contraseña", groups = {LoginUser.class, UserRegister.class})
  @Column(nullable = false)
  private String password;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "creation_date", columnDefinition = "datetime default CURRENT_TIMESTAMP")
  private LocalDateTime creationDate;

  @Column(name = "status", columnDefinition = "boolean default true")
  private Boolean status;
}