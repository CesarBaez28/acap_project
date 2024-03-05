package com.acap.api.controller;
import org.springframework.web.bind.annotation.RestController;
import com.acap.api.Constants;
import com.acap.api.model.Shipments;
import com.acap.api.service.ShipmentsService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/*
 * Clase controlador encargado
 * de la gestión de los envíos de cintas
 * entre sucursales
 */
@RestController
@RequestMapping(path = "shipments")
@PreAuthorize("hasAnyRole('"+ Constants.Roles.VIEW_SHIPMENTS +"', '"+ Constants.Roles.RECEPTION +"', '"+ Constants.Roles.VIEW_HISTORY_SHIPMENTS +"')")
public class ShipmentsController {

  private final ShipmentsService shipmentsService;

  public ShipmentsController(ShipmentsService shipmentsService) {
    this.shipmentsService = shipmentsService;
  }

  // Endpoint para obtener los últimos 15 envíos de cintas asociados a un usuario
  @GetMapping("/fintTop15ByUser")
  public ResponseEntity<Object> fintTop15ByUser(@RequestParam UUID userId) {
    try {
      // Llama al servicio para obtener los últimos 15 envíos por usuario
      List<Shipments> shipments = shipmentsService.findTop15ByUserId(userId);
      // Devuelve la lista de envíos con el código de estado HTTP 200 (OK)
      return ResponseEntity.status(HttpStatus.OK).body(shipments);
    } catch (Exception e) {
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP 500 (Error interno del servidor)
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error finding shipments from the data base");
    }
  }

  // Endpoint para obtener envíos de cintas asociados a un usuario en un rango de fechas
  @GetMapping("/findByUserAndBetweenDates/{userId}/{begin}/{end}")
  public ResponseEntity<Object> findByUserBetweenDates(
      @PathVariable UUID userId,
      @PathVariable LocalDateTime begin,
      @PathVariable LocalDateTime end) {

    try {
      // Llama al servicio para obtener envíos por usuario y entre fechas
      List<Shipments> shipments = shipmentsService.findByUserBetweenDates(userId, begin, end);
      // Devuelve la lista de envíos con el código de estado HTTP 200 (OK)
      return ResponseEntity.status(HttpStatus.OK).body(shipments);
    } catch (Exception e) {
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP 500 (Error interno del servidor)
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error finding shipments from the database");
    }
  }

  // Endpoint para obtener envíos de cintas por estado y ubicación
  @GetMapping("/findByStatusAndLocation/{statusId}/{locationId}")
  public ResponseEntity<Object> findByUserBetweenDates(
      @PathVariable Long statusId,
      @PathVariable Long locationId) {
    try {
      // Llama al servicio para obtener envíos por estado y ubicación
      List<Shipments> shipments = shipmentsService.findByStatusIdAndLocationToIdOrderByDateDesc(statusId, locationId);
      // Devuelve la lista de envíos con el código de estado HTTP 200 (OK)
      return ResponseEntity.status(HttpStatus.OK).body(shipments);
    } catch (Exception e) {
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP 500 (Error interno del servidor)
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error finding shipments from the database");
    }
  }

  // Endpoint para obtener envíos de cintas en un rango de fechas
  @GetMapping("/findByDateBetween/{startDate}/{endDate}")
  public ResponseEntity<Object> findByDateBetween(@PathVariable LocalDateTime startDate, @PathVariable LocalDateTime endDate) {
    try {
      // Llama al servicio para obtener envíos por rango de fechas
      List<Shipments> shipments = shipmentsService.findByDateBetween(startDate, endDate);     
      // Devuelve la lista de envíos con el código de estado HTTP 200 (OK)
      return ResponseEntity.status(HttpStatus.OK).body(shipments);
    } catch (Exception e) {
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP 500 (Error interno del servidor)
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error finding shipments from the databse");
    }
  }

  // Endpoint para eliminar un envío de cinta por ID
  @DeleteMapping("/deleteById/{id}")
  public ResponseEntity<Object> deleteById(@PathVariable UUID id) {
    try {
      // Llama al servicio para eliminar un envío por ID
      shipmentsService.deleteShipment(id);
      // Devuelve un mensaje de éxito con el código de estado HTTP 200 (OK)
      return ResponseEntity.status(HttpStatus.OK).body("Shipment deleted successfully");
    } catch (Exception e) {
      // En caso de error, devuelve un mensaje de error con el código de estado HTTP 500 (Error interno del servidor)
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting shipment");
    }
  }
}
