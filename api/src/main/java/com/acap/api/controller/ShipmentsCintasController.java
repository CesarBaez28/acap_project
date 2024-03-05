// Importaciones necesarias
package com.acap.api.controller;
import org.springframework.web.bind.annotation.RestController;
import com.acap.api.Constants;
import com.acap.api.dto.ShipmentDTO;
import com.acap.api.model.ShipmentsCintas;
import com.acap.api.service.ShipmentsCintasService;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

/*
 * Clase controlador encargado de la gestión 
 * de las cintas enviadas en cada envío
 */
@RestController
@RequestMapping(path = "shipments")
public class ShipmentsCintasController {

  private final ShipmentsCintasService shipmentsCintasService;

  public ShipmentsCintasController (ShipmentsCintasService shipmentsCintasService) {
    this.shipmentsCintasService = shipmentsCintasService;
  }

  // Endpoint para obtener los últimos 15 envíos de cintas asociados a un usuario
  @GetMapping("/getTop15ByUser")
  public ResponseEntity<Object> getTop15ByUser(@RequestParam UUID userId) {
    try {
      // Llama al servicio para obtener los últimos 15 envíos de cintas por usuario
      List<ShipmentsCintas> shipmentsCintas = shipmentsCintasService.top15ShipmentsCintasByUser(userId);
      // Devuelve la lista de envíos de cintas con el código de estado HTTP 200 (OK)
      return ResponseEntity.status(HttpStatus.OK).body(shipmentsCintas);
    } catch (Exception e) {
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP 500 (Error interno del servidor)
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting cintas shipment");
    }
}

  // Endpoint para obtener todos los envíos de cintas asociados a un envío principal
  @GetMapping("/getAllByShipment")
  public ResponseEntity<Object> getAllByShipment(@RequestParam UUID id) {
    try {
      // Llama al servicio para obtener todos los envíos de cintas por un envío principal
      List<ShipmentsCintas> shipmentsCintas = shipmentsCintasService.findAllByShipments(id);
      // Devuelve la lista de envíos de cintas con el código de estado HTTP 200 (OK)
      return ResponseEntity.status(HttpStatus.OK).body(shipmentsCintas);
    } catch (Exception e) {
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP 500 (Error interno del servidor)
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting cintas shipment");
    }
  }
  
  // Endpoint para registrar un nuevo envío de cintas
  @PostMapping("/save")
  // Se requiere el rol específico para acceder a este endpoint
  @PreAuthorize("hasRole('"+ Constants.Roles.REGISTER_SHIPMENT +"')")
  public ResponseEntity<Object> saveShipment(@RequestBody ShipmentDTO data) {
    try {
      // Llama al servicio para registrar un nuevo envío de cintas
      List<ShipmentsCintas> shipmentCinta = shipmentsCintasService.saveShipmentsCintas(data);
      // Devuelve la lista de envíos de cintas creados con el código de estado HTTP 201 (Created)
      return ResponseEntity.status(HttpStatus.CREATED).body(shipmentCinta);   
    } catch (Exception e) {
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP 500 (Error interno del servidor)
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error registering cintas shipment: " + e.getMessage());
    }
  }
}
