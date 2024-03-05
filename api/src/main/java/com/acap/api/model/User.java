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

/**
 * Clase que representa a los usuarios en la base de datos.
 */
@Data
@Entity
@Table(name = "users")
public class User {

  /**
   * Identificador único del usuario.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  /**
   * Conjunto de envíos asociados a este usuario como registrante.
   */
  @OneToMany(mappedBy = "user")
  private Set<Shipments> userRegisters;

  /**
   * Conjunto de recepciones de cintas asociadas a este usuario como receptor.
   */
  @OneToMany(mappedBy = "userReceived")
  private Set<CintasReceived> userReceived;

  /**
   * Conjunto de tokens asociados a este usuario.
   */
  @OneToMany(mappedBy = "user")
  private Set<UserToken> userToken;

  /**
   * Posición del usuario en la organización.
   */
  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "position_id", nullable = false)
  private Positions position;

  /**
   * Ubicación del usuario en la organización.
   */
  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "location_id", nullable = false)
  private Locations location;

  /**
   * Nombre de usuario único y no nulo.
   */
  @NotBlank(message = "Ingrese su nombre de usuario", groups = {UserRegister.class, UserEdit.class})
  @Column(name = "username", nullable=false, length=100, unique = true)
  private String username;

  /**
   * Número de empleado único y no nulo.
   */
  @NotBlank(message = "Ingrese su número de empleado", groups = {LoginUser.class, UserRegister.class, UserEdit.class})
  @Column(name = "employee_number", nullable = false, unique = true, length = 20)
  private String employeeNumber;

  /**
   * Dirección de correo electrónico única y no nula.
   */
  @Email(message = "El email no es válido", groups = {UserRegister.class, UserEdit.class})
  @NotBlank(message = "Ingrese el email", groups = {UserRegister.class, UserEdit.class})
  @Column(name = "email", nullable = false, length = 100, unique = true)
  private String email; 

  /**
   * Contraseña que cumple con requisitos de seguridad.
   */
  @Pattern(
    regexp = "^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\\-__+.]){1,}).{8,}$", 
    message = "La contraseña no cumple con los requisitos",
    groups = {LoginUser.class, UserRegister.class}
  )
  @NotBlank(message = "Ingrese la contraseña", groups = {LoginUser.class, UserRegister.class})
  @Column(nullable = false)
  private String password;

  /**
   * Fecha de creación del usuario.
   */
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "creation_date", columnDefinition = "datetime default CURRENT_TIMESTAMP")
  private LocalDateTime creationDate;

  /**
   * Estado del usuario (activo/inactivo) con un valor predeterminado de activo.
   */
  @Column(name = "status", columnDefinition = "boolean default true")
  private Boolean status;
}
