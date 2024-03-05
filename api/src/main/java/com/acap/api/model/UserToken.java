package com.acap.api.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Clase que representa un token de usuario en la base de datos.
 */
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user_token")
public class UserToken {

  /**
   * Identificador único del token.
   */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  /**
   * Valor del token, único y no nulo.
   */
  @Column(name = "token", nullable = false, unique = true, length = 200)
  private String token;

  /**
   * Estado de revocación del token, con un valor predeterminado de no revocado.
   */
  @Column(name = "revoked", columnDefinition = "boolean default false")
  private Boolean revoked;

  /**
   * Usuario asociado al token.
   */
  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;
}

