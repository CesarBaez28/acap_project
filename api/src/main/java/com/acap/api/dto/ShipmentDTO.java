package com.acap.api.dto;

import java.util.List;

import com.acap.api.model.Cintas;
import com.acap.api.model.Shipments;

import lombok.Data;

/*
 * Clase que representa un DTO (Data Transfer Object) para la gestión de envíos y cintas asociadas
 */
@Data
public class ShipmentDTO {

  // Objeto que representa el envío asociado al DTO
  private Shipments shipment;

  // Lista de objetos que representan las cintas asociadas al envío
  private List<Cintas> cintas;
}
