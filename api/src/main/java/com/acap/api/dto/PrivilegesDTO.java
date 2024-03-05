package com.acap.api.dto;

import java.util.List;

import com.acap.api.model.Positions;
import com.acap.api.model.Privileges;

import lombok.Data;

/*
 * Clase que representa un DTO (Data Transfer Object) para la gestión de privilegios asociados a posiciones 
 */
@Data
public class PrivilegesDTO {

  // Objeto que representa la posición asociada a los privilegios
  private Positions position;

  // Lista de objetos que representan los privilegios asociados a la posición
  private List<Privileges> privileges;
}
