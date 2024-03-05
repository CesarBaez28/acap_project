package com.acap.api.dto;

import lombok.Data;

/*
 * Clase que representa un DTO (Data Transfer Object) para cambiar la contraseña
 */
@Data
public class ChangePasswordDTO {

  // Contraseña actual del usuario
  private String currentPassword;

  // Nueva contraseña que se desea establecer
  private String newPassword;
}
