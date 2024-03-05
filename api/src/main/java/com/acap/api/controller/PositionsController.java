// Importaciones necesarias
package com.acap.api.controller;
import org.springframework.web.bind.annotation.RestController;
import com.acap.api.model.Positions;
import com.acap.api.service.PositionsService;
import com.acap.api.utils.ErrorMessage;
import java.util.List;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/*
 * Clase controlador que encarga de la gestión 
 * de la posición de cada usuario dentro de la aplicación 
 * (administador, empleado, auditor...)
 */
@RestController
@RequestMapping(path = "positions")
public class PositionsController {
  
  private final PositionsService positionsService;

  public PositionsController(PositionsService positionsService) {
    this.positionsService = positionsService;
  }

  // Endpoint para obtener todas las posiciones
  @GetMapping("/findAll")
  public ResponseEntity<Object> findAll() {
    try {
      // Llama al servicio para obtener todas las posiciones
      List<Positions> positions = positionsService.findAll();
      // Devuelve la lista de posiciones con el código de estado HTTP 200 (OK)
      return ResponseEntity.status(HttpStatus.OK).body(positions);
    } catch (Exception e) {
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP 500 (Error interno del servidor)
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error finding positions");
    }
  }

  // Endpoint para guardar una nueva posición
  @PostMapping("/save")
  public ResponseEntity<Object> savePositions(@RequestBody Positions positions) {
    try {
      // Llama al servicio para guardar la posición
      Positions positionData = positionsService.savePosition(positions);
      // Devuelve la posición guardada con el código de estado HTTP 201 (Creado)
      return ResponseEntity.status(HttpStatus.CREATED).body(positionData);
    } catch (Exception e) {
      // En caso de error (nombre de posición repetido), devuelve un mensaje de error con el código de estado HTTP 400 (Solicitud incorrecta)
      ErrorMessage error = new ErrorMessage("Position name repeated");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
  }
}
