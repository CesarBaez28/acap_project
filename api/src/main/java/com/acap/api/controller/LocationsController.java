// Importaciones necesarias
package com.acap.api.controller;

import org.springframework.web.bind.annotation.RestController;
import com.acap.api.model.Locations;
import com.acap.api.service.LocationsService;
import com.acap.api.utils.ErrorMessage;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/*
 * Clase controlador que encarga de la gestión 
 * de las ubicaciones de las cintas
 */
@RestController
@RequestMapping(path = "location")
public class LocationsController {

  private final LocationsService locationsService;

  public LocationsController(LocationsService locationsService) {
    this.locationsService = locationsService;
  }

  // Endpoint para obtener todas las ubicaciones
  @GetMapping("/findAll")
  public ResponseEntity<Object> findAll() {
    try {
      // Llama al servicio para obtener todas las ubicaciones
      List<Locations> location = locationsService.findAll();
      // Devuelve la lista de ubicaciones con el código de estado HTTP 200 (OK)
      return ResponseEntity.status(HttpStatus.OK).body(location);
    } catch (Exception e) {
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP
      // 500 (Error interno del servidor)
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error finding locations");
    }
  }

  // Endpoint para guardar una nueva ubicación
  @PostMapping("/save")
  public ResponseEntity<Object> saveLocations(@RequestBody Locations locations) {
    try {
      // Llama al servicio para guardar la ubicación
      Locations locationData = locationsService.saveLocation(locations);
      // Devuelve la ubicación guardada con el código de estado HTTP 201 (Creado)
      return ResponseEntity.status(HttpStatus.CREATED).body(locationData);
    } catch (Exception e) {
      // En caso de error (ubicación repetida), devuelve un mensaje de error con el
      // código de estado HTTP 400 (Solicitud incorrecta)
      ErrorMessage error = new ErrorMessage("Location name repeated");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
  }
}
