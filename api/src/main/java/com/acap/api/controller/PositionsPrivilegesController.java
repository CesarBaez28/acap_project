package com.acap.api.controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.acap.api.Constants;
import com.acap.api.dto.PrivilegesDTO;
import com.acap.api.model.Positions;
import com.acap.api.model.PositionsPrivileges;
import com.acap.api.service.PositionsPrivilegesService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/*
 * Clase controlador encargado de la 
 * relación entre los privilegios de cada posición
 */
@RestController
@RequestMapping(path = "privileges")
public class PositionsPrivilegesController {

  private final PositionsPrivilegesService positionsPrivilegesService;

  public PositionsPrivilegesController (PositionsPrivilegesService positionsPrivilegesService) {
    this.positionsPrivilegesService = positionsPrivilegesService;
  }

  // Endpoint para eliminar privilegios asignados a posiciones
  @PostMapping("/remove")
  // Se requiere el privilegio 'ASSING_PRIVILEGES' para acceder a este endpoint
  @PreAuthorize("hasRole('"+ Constants.Roles.ASSING_PRIVILEGES +"')")
  public ResponseEntity<Object> removePrivileges (@RequestBody PrivilegesDTO data) {
    try {
      // Llama al servicio para eliminar privilegios
      List<PositionsPrivileges> positionsPrivileges = positionsPrivilegesService.removePrivileges(data);
      // Devuelve la lista actualizada de privilegios con el código de estado HTTP 200 (OK)
      return ResponseEntity.status(HttpStatus.OK).body(positionsPrivileges);
    } catch (Exception e) {
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP 500 (Error interno del servidor)
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing privileges");
    }
  }
  
  // Endpoint para obtener privilegios asignados a una posición
  @PostMapping("/get")
  public ResponseEntity<Object> findByPosition (@RequestBody Positions position) {  
    try {
      // Llama al servicio para obtener privilegios por posición
      List<PositionsPrivileges> positionsPrivileges =  positionsPrivilegesService.findByPosition(position);
      // Devuelve la lista de privilegios con el código de estado HTTP 200 (OK)
      return ResponseEntity.status(HttpStatus.OK).body(positionsPrivileges);
    } catch (Exception e) {
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP 500 (Error interno del servidor)
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error finding privileges");
    }
  }
  
  // Endpoint para asignar privilegios a posiciones
  @PostMapping
  // Se requiere el privilegio 'ASSING_PRIVILEGES' para acceder a este endpoint
  @PreAuthorize("hasRole('"+ Constants.Roles.ASSING_PRIVILEGES +"')")
  public ResponseEntity<Object> assingPrivileges (@RequestBody PrivilegesDTO data) {  
    try {
      // Llama al servicio para asignar privilegios
      List<PositionsPrivileges> positionsPrivileges = positionsPrivilegesService.assignPrivileges(data);
      // Devuelve la lista actualizada de privilegios con el código de estado HTTP 200 (OK)
      return ResponseEntity.status(HttpStatus.OK).body(positionsPrivileges);
    } catch (Exception e) {
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP 500 (Error interno del servidor)
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error assigning privileges");
    }
  }
}
