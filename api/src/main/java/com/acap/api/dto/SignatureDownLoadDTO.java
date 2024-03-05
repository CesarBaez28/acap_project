package com.acap.api.dto;

import lombok.Data;

/*
 * Clase que representa un DTO (Data Transfer Object) para la descarga de firmas
 */
@Data
public class SignatureDownLoadDTO {

  // Ruta de la firma a descargar
  private String path;
}
