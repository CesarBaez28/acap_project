package com.acap.api.dto;

import lombok.Data;

/*
 * Clase que representa un DTO (Data Transfer Object) para la carga de firmas
 */
@Data
public class SignatureUploadDTO {

  // Nombre del directorio donde se almacenará la firma
  private String directoryName;
  
  // Imagen de la firma codificada en formato base64
  private String base64Image;
}
