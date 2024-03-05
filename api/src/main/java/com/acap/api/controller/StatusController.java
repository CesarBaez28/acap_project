package com.acap.api.controller;
import org.springframework.web.bind.annotation.RestController;
import com.acap.api.model.Status;
import com.acap.api.service.StatusService;
import com.acap.api.utils.ErrorMessage;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

/*
 * Clase controlador que proporciona 
 * los endpoints para los estados dentro 
 * de la aplicación (Vigente, caducado, eliminado, pendiente...)
 */
@RestController
@RequestMapping(path = "status")
public class StatusController {
  
  private final StatusService statusService;

  public StatusController(StatusService statusService) {
    this.statusService = statusService;
  }

  // Endpoint para obtener todos los estados
  @GetMapping("/findAll")
  public ResponseEntity<Object> findAll() {
    try {
      // Llama al servicio para obtener todos los estados
      List<Status> status = statusService.findAll();
      // Devuelve la lista de estados con el código de estado HTTP 200 (OK)
      return ResponseEntity.status(HttpStatus.OK).body(status);
    } catch (Exception e) {
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP 500 (Error interno del servidor)
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error finding status");
    }
  }

  // Endpoint para guardar un nuevo estado
  @PostMapping("/save")
  public ResponseEntity<Object> saveStatus(@RequestBody Status status) {
    try {
      // Llama al servicio para guardar el estado
      Status statusData = statusService.saveStatus(status);
      // Devuelve el estado creado con el código de estado HTTP 201 (Created)
      return ResponseEntity.status(HttpStatus.CREATED).body(statusData);
    } catch (Exception e) {
      // En caso de error (por ejemplo, nombre de estado repetido), devuelve un mensaje de error con el código de estado HTTP 400 (Bad Request)
      ErrorMessage error = new ErrorMessage("Status name repeated");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
  }
}
