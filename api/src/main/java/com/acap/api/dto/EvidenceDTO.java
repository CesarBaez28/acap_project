package com.acap.api.dto;

import java.util.List;

import com.acap.api.model.Evidence;
import com.acap.api.model.Folders;

import lombok.Data;

/*
 * Clase que representa un DTO (Data Transfer Object) para la gestión de evidencias y carpetas
 */
@Data
public class EvidenceDTO {

  // Objeto que representa la carpeta asociada a las evidencias
  private Folders folders;
  
  // Lista de objetos que representan las evidencias relacionadas con la carpeta
  private List<Evidence> evidence;
}
