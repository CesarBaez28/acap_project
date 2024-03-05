package com.acap.api.dto;
import java.util.List;
import java.util.UUID;
import com.acap.api.model.Locations;
import lombok.Data;

/*
 * Clase que representa un DTO (Data Transfer Object) para cambiar ubicaciones 
*/
@Data
public class ChangeLocationsDTO {

  // Lista de identificadores UUID para las ubicaciones
  private List<UUID> ids;
  
  // Objeto de ubicación que se utilizará para realizar cambios
  private Locations location;
}
